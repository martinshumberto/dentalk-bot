'use strict';
import moment from 'moment';
import { struct } from 'pb-util';
import send from './send';
import utils from '../utils';
import config from '../config/variables';
import dialogflowAPI from '../services/dialogflow.service';
import facebookAPI from '../services/facebook.service';
import calendarAPI from '../services/calendar.service';
import smsAPI from '../services/sms.service';

import Calendar from '../models/CalendarEvent';
import Leads from '../models/Lead';

/**
 * Process message type card
 * @param {Object} messages
 * @param {Number} sender
 */
const handleCardMessages = (messages, sender) => {
    let elements = [];
    for (var m = 0; m < messages.length; m += 1) {
        let message = messages[m];

        let buttons = [];
        for (var b = 0; b < message.card.buttons.length; b += 1) {
            let isLink = message.card.buttons[b].postback.substring(0, 4) === 'http';
            let button;
            if (isLink) {
                button = {
                    type: 'web_url',
                    title: message.card.buttons[b].text,
                    url: message.card.buttons[b].postback
                };
            } else {
                button = {
                    type: 'postback',
                    title: message.card.buttons[b].text,
                    payload: message.card.buttons[b].postback
                };
            }
            buttons.push(button);
        }

        let element = {
            title: message.card.title,
            image_url: message.card.imageUri,
            subtitle: message.card.subtitle,
            buttons: buttons
        };
        elements.push(element);
    }
    send.sendGenericMessage(sender, elements);
};

/**
 * Process messages
 * @param {Object} messages
 * @param {Number} sender
 */
const handleMessages = (messages, sender) => {
    let timeoutInterval = 10;
    let previousType;
    let cardTypes = [];
    let timeout = 0;
    for (var i = 0; i < messages.length; i += 1) {
        if (
            previousType == 'card' &&
      (messages[i].message != 'card' || i == messages.length - 1)
        ) {
            timeout = (i - 1) * timeoutInterval;
            setTimeout(handleCardMessages.bind(null, cardTypes, sender), timeout);
            cardTypes = [];
            timeout = i * timeoutInterval;
            setTimeout(handleMessage.bind(null, messages[i], sender), timeout);
        } else if (messages[i].message == 'card' && i == messages.length - 1) {
            cardTypes.push(messages[i]);
            timeout = (i - 1) * timeoutInterval;
            setTimeout(handleCardMessages.bind(null, cardTypes, sender), timeout);
            cardTypes = [];
        } else if (messages[i].message == 'card') {
            cardTypes.push(messages[i]);
        } else {
            timeout = i * timeoutInterval;
            setTimeout(handleMessage.bind(null, messages[i], sender), timeout);
        }
        previousType = messages[i].message;
    }
};


/**
 * Process single message
 * @param {Object} message
 * @param {Number} sender
 */


const handleMsgObj = {
    'text': (message, sender) => {
        message.text.text.forEach(async (text) => {
            if (text !== '') {
                await send.sendTextMessage(sender, text);
            }
        });
    },
    'quickReplies': async (message, sender) => {
        let replies = [];
        message.quickReplies.quickReplies.forEach(text => {
            let reply = {
                content_type: 'text',
                title: text,
                payload: text
            };
            replies.push(reply);
        });
        await send.sendQuickReply(sender, message.quickReplies.title, replies);
    },
    'image': async (message, sender) => {
        await send.sendImageMessage(sender, message.image.imageUri);
    },
    'payload': async (message, sender) => {
        const payload = struct.decode(message.payload);
        let verifyPerson = null;
    
        if (payload.facebook.payload) {
            verifyPerson = payload.facebook.person_true;
        }
    
        let messageData = {
            recipient: {
                id: sender
            },
            message: payload.facebook,
            verifyPerson
        };
        await facebookAPI.sendCall(messageData, 0);
    }
};

const handleMessage = (message, sender) => {
    handleMsgObj[message.message](message, sender);
};

/**
 * Process quick reply message
 * @param {*} senderID
 * @param {*} quickReply
 * @param {*} messageId
 */
const handleQuickReply = (senderID, quickReply, messageId) => {
    var quickReplyPayload = quickReply.payload;
    console.log(
        '⚡️ [BOT CONSILIO] Quick reply for message %s with payload %s',
        messageId,
        quickReplyPayload
    );

    dialogflowAPI.sendTextToDialogFlow(senderID, quickReplyPayload);
};

/**
 * Process attachments
 * @param {*} messageAttachments
 * @param {Number} senderID
 */
const handleMessageAttachments = async (messageAttachments, senderID) => {
    await send.sendTextMessage(senderID, 'Recebi o anexo. Muito obrigado.');
};

/**
 * Process Dialogflow response
 * @param {Number} sender
 * @param {Object} response
 */
const handleDialogFlowResponse = (sender, response) => {
    let responseText = response.fulfillmentMessages.fulfillmentText;

    let messages = response.fulfillmentMessages;
    let action = response.action;
    let contexts = response.outputContexts;
    let parameters = response.parameters;

    var delay = 0;

    if (utils.isDefined(action)) {
        send.sendTypingOn(sender);
        setTimeout(function() {
            send.sendTypingOff(sender);
            handleDialogFlowAction(sender, action, messages, contexts, parameters);
        }, delay);
    } else if (
        utils.isDefined(messages) &&
    ((messages.length == 1 && messages[0].type != 0) || messages.length > 1)
    ) {
        send.sendTypingOn(sender);
        setTimeout(function() {
            send.sendTypingOff(sender);
            handleMessages(messages, sender);
        }, delay);
    } else if (responseText == '' && !utils.isDefined(action)) {
        return false;
    } else if (utils.isDefined(responseText)) {
        send.sendTypingOn(sender);
        setTimeout(function() {
            send.sendTypingOff(sender);
            send.sendTextMessage(sender, responseText);
        }, delay);
    }
};

/**
 * Process Dialogflow actions
 * @param {*} sender
 * @param {*} action
 * @param {*} messages
 * @param {*} contexts
 * @param {*} parameters
 */
const handleDFAObj = {
    'input.welcome': async (sender, messages, contexts, parameters) => {
        await send.sendTypingOn(sender);
        const user = utils.usersMap.get(sender);
        utils.setSessionandUser(sender);
        const userDB = await Leads.findOne({ where: { sender_id: sender } });

        if (userDB && userDB.phone && userDB.email) {
            await send.sendTextMessage(sender, `Oi ${user.first_name}! 👋`);
            let replies = [
                {
                    'content_type': 'text',
                    'title': 'Agendar avaliação',
                    'payload': 'Agendar avaliação'
                },
                {
                    'content_type': 'text',
                    'title': 'Verificar avaliação',
                    'payload': 'Verificar avaliação'
                },
                {
                    'content_type': 'text',
                    'title': 'Cancelar avaliação',
                    'payload': 'Cancelar avaliação'
                },
                {
                    'content_type': 'text',
                    'title': 'Conhecer a clínica',
                    'payload': 'Conhecer a clínica'
                },
                {
                    'content_type': 'text',
                    'title': 'Tratamentos',
                    'payload': 'Tratamentos'
                }
            ];
            const text = 'Que bom te ver por aqui novamente. No que posso te ajudar hoje?';
            await send.sendQuickReply(sender, text, replies);

        } else {

            const [phone, email] = [parameters.fields.phone.stringValue, parameters.fields.email.stringValue];
            let missingSlots = [];
            if (!phone) { missingSlots.push('telefone'); }
            if (!email) { missingSlots.push('e-mail'); }

            if (missingSlots.length === 1){
                if (!phone && email) {

                    let replies = [
                        {
                            'content_type': 'user_phone_number',
                            'title': 'user_phone_number',
                            'payload': 'user_phone_number'
                        }
                    ];
                    const text = 'Me confirme seu número de telefone:';
                    await send.sendQuickReply(sender, text, replies);

                } else if (!email && phone) {

                    let replies = [
                        {
                            'content_type': 'user_email',
                            'title': 'user_email',
                            'payload': 'user_email'
                        }
                    ];
                    const text = 'Ok! Antes de começarmos me confirme também seu e-mail:';
                    await send.sendQuickReply(sender, text, replies);

                }
            } 
            else if (missingSlots.length === 2) {
                
                await send.sendTextMessage(sender, `Oi ${user.first_name}! 👋`);
                await send.sendTextMessage(sender, 'Sou a Lary, a atendente virtual 🤖 da Clínica Dentalk!');
                await send.sendTextMessage(sender, 'Aqui acreditamos que sorrisos renovados transformam vidas!');
                let replies = [
                    {
                        'content_type': 'user_phone_number',
                        'title': 'user_phone_number',
                        'payload': 'user_phone_number'
                    }
                ];
                const text = 'Me confirme seu número de telefone:';
                await send.sendQuickReply(sender, text, replies);

            } else {
                if (phone && email) {
                    await Leads.update({ phone: phone, email: email }, {
                        where: { sender_id: sender },
                        returning: true,
                        plain: true
                    }).catch((err) => {
                        console.log('❌ [BOT CONSILIO] MYSQL: ', err);
                    });
                }
                let replies = [
                    {
                        'content_type': 'text',
                        'title': 'Agendar avaliação',
                        'payload': 'Agendar avaliação'
                    },
                    {
                        'content_type': 'text',
                        'title': 'Verificar avaliação',
                        'payload': 'Verificar avaliação'
                    },
                    {
                        'content_type': 'text',
                        'title': 'Cancelar avaliação',
                        'payload': 'Cancelar avaliação'
                    },
                    {
                        'content_type': 'text',
                        'title': 'Conhecer a clínica',
                        'payload': 'Conhecer a clínica'
                    },
                    {
                        'content_type': 'text',
                        'title': 'Tratamentos',
                        'payload': 'Tratamentos'
                    }
                ];
                const text = 'Vamos começar o seu atendimento, selecione um dos botões abaixo. 👇';
                send.sendQuickReply(sender, text, replies);
            }
        }
    
    },
    'input.schedule': async (sender, messages, contexts, parameters) => {
        await send.sendTypingOn(sender);
        const userDB = await Leads.findOne({ where: { sender_id: sender } });
        const event = await Calendar.findOne({ where: { sender_id: sender, deletedAt: null, status: 'confirmed' } });

        if (event && event.status == 'confirmed') {
            const text1 = `Você já tem uma avaliação marcada 📆 ${moment(event.start).locale('pt-br').format('LLLL')}.`;
            await send.sendTextMessage(sender, text1);

            let text2 = 'Deseja reagendar? 👇';
            let replies = [
                {
                    'content_type': 'text',
                    'title': 'Reagendar agora',
                    'payload': 'Reagendar agora'
                }
            ];
            await send.sendQuickReply(sender, text2, replies);

        } else {

            const [date, time] = [parameters.fields.date.stringValue, parameters.fields.time.stringValue];
            let missingSlots = [];
            if (!date) { missingSlots.push('data'); }
            if (!time) { missingSlots.push('horário'); }

            if (missingSlots.length === 1){
                const dateTimeStart = new Date(Date.parse(date.split('T')[0] + 'T' + date.split('T')[1].split('-')[0] + '-03:00'));

                calendarAPI.slotsFromEvents(dateTimeStart).then(async (resTime) => {
                    let replies = [];
                    resTime.forEach(function(time) {
                        const hour = moment(time).format('HH:mm A');
                        replies.push({
                            'content_type': 'text',
                            'title': hour,
                            'payload': hour
                        });
                    });
                    let text = 'Agora, selecione o melhor horário dentre os disponíveis para a sua avaliação:';
                    await send.sendQuickReply(sender, text, replies);
                });

            } 
            else if (missingSlots.length === 2){
                const today = moment().format();
                const dateTimeStart = new Date(Date.parse(today.split('T')[0] + 'T' + today.split('T')[1].split('-')[0] + '-03:00'));
                const dateTimeEnd = new Date(moment(dateTimeStart).add(7, 'days'));

                calendarAPI.daysFromSlots(dateTimeStart, dateTimeEnd).then(async (resTime) => {
                    let days = [];
                    let daysRefine = [];
                    resTime.forEach(function(time) {
                        moment.locale('pt-BR');
                        const day = moment(time.startDate).format('DD');
                        const month = moment(time.startDate).format('MM');
                        const weekDay = moment(time.startDate).format('dddd');

                        days.push({
                            day: day,
                            month: month,
                            weekDay: weekDay
                        });
                        daysRefine = days.filter(function (a) {
                            return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
                        }, Object.create(null));
                    });
                    let replies = [];
                    daysRefine.forEach(function(day) {
                        replies.push({
                            'content_type': 'text',
                            'title': `${day.weekDay.substring(0,3)} - ${day.day}/${day.month}`,
                            'payload': `${day.weekDay.substring(0,3)} - ${day.day}/${day.month}`
                        });
                    });
                    let text = 'Que dia fica bom para você fazer sua avaliação?';
                    await send.sendQuickReply(sender, text, replies);
                });
            } else {
                handleMessages(messages, sender);
                if (parameters.fields.date.stringValue && parameters.fields.time.stringValue) {
                    const date = parameters.fields.date.stringValue;
                    const time = parameters.fields.time.stringValue;
                    const dateTimeStart = new Date(Date.parse(date.split('T')[0] + 'T' + time.split('T')[1].split('-')[0] + '-03:00'));
                    const dateTimeEnd = new Date(new Date(dateTimeStart).setHours(dateTimeStart.getHours() + 1));
                    const appointmentTimeString = moment(dateTimeStart).locale('pt-br').format('LLLL');
             
                    calendarAPI.createCalendarEvent(dateTimeStart, dateTimeEnd, userDB).then(async (res) => {

                        const event = res.data;
                        const eventID = await utils.getEventID(event);

                        Calendar.create({
                            event_id: eventID,
                            sender_id: sender,
                            status: event.status,
                            link: event.htmlLink,
                            summary: event.summary,
                            description: event.description,
                            start: moment(event.start.dateTime).format('YYYY-MM-DD HH:mm:ss'),
                            end: moment(event.end.dateTime).format('YYYY-MM-DD HH:mm:ss')
                        }).catch(err => {
                            console.log('❌ [BOT CONSILIO] MYSQL: ', err);
                        });
                    
                        const text = `Tudo certo ${userDB.first_name}! Agendei aqui para você. 📝 \nTe aguardamos aqui 📆 ${appointmentTimeString}.`;
                        await send.sendTextMessage(sender, text);
                    
                        let buttons = [
                            {
                                type:'web_url',
                                url:'http://bit.ly/humbertoconsilio',
                                title:'Chamar no WhatsApp'
                            },
                            {
                                type:'phone_number',
                                title:'Ligar agora',
                                payload:'+5562983465454',
                            },
                            {
                                type:'postback',
                                title:'Falar com humano',
                                payload:'Falar com humano'
                            }
                        ];
                        await send.sendButtonMessage(sender, 'Caso tenha ficado alguma dúvida, fique à vontade de conversar com a gente!', buttons);

                    }).catch(async (erro) => {
                        console.log('ERRO', erro);
                        const text = `Opps o horário ${appointmentTimeString}, não está disponível. Vamos tentar outro?`;
                        await send.sendTextMessage(sender, text);
                    }); 
                }
            }
        }
    },
    'input.schedule.verify': async (sender) => {
        await send.sendTypingOn(sender);
        const event = await Calendar.findOne({ where: { sender_id: sender, deletedAt: null, status: 'confirmed' } });
        
        if (event && event.status == 'confirmed') {
                     
            const text = `Encontrei! Sou rápida, não é mesmo? 😏 \nExiste um agendamento para 📆 ${moment(event.start).locale('pt-br').format('LLLL')}.`;
            await send.sendTextMessage(sender, text);
    
            let text2 = 'Deseja reagendar ou cancelar? 👇';
            let replies = [
                {
                    'content_type': 'text',
                    'title': 'Reagendar agora',
                    'payload': 'Reagendar agora'
                },
                {
                    'content_type': 'text',
                    'title': 'Cancelar agora',
                    'payload': 'Cancelar agora'
                }
            ];
            await send.sendQuickReply(sender, text2, replies);
  
        } else {
            const text = 'Infelizmente não encontrei o seu agendamento. 😰';
            await send.sendTextMessage(sender, text);

            let text2 = 'Mas, calma. Você pode agendar a sua avaliação agora! 😄 \n\nSelecione para agendar. 👇';
            let replies = [
                {
                    'content_type': 'text',
                    'title': 'Agendar agora',
                    'payload': 'Agendar agora'
                }
            ];
            await send.sendQuickReply(sender, text2, replies);
        }
    },
    'input.schedule.update': async (sender) => {
        await send.sendTypingOn(sender);
        const event = await Calendar.findOne({ where: { sender_id: sender, deletedAt: null, status: 'confirmed' } });

        if (event && event.status == 'confirmed') {
            
            const text = `Ótimo! Estava marcado dia 📆 ${moment(event.start).locale('pt-br').format('LLLL')}.`;
            send.sendTextMessage(sender, text);

            let text2 = 'Posso continuar o reagedamento? 👇';
            let replies = [
                {
                    'content_type': 'text',
                    'title': 'Sim',
                    'payload': 'Sim'
                },
                {
                    'content_type': 'text',
                    'title': 'Não',
                    'payload': 'Não'
                }
            ];
            await send.sendQuickReply(sender, text2, replies);
        } else {
            const text = 'Infelizmente não encontrei o seu agendamento. 😰';
            send.sendTextMessage(sender, text);

            let text2 = 'Mas, calma. Você pode agendar a sua avaliação agora! 😄 \n\nSelecione para agendar. 👇';
            let replies = [
                {
                    'content_type': 'text',
                    'title': 'Agendar agora',
                    'payload': 'Agendar agora'
                }
            ];
            await send.sendQuickReply(sender, text2, replies);

        }

    },
    'input.schedule.update-yes': async (sender, messages, contexts, parameters) => {
        await send.sendTypingOn(sender);
        const userDB = await Leads.findOne({ where: { sender_id: sender } });
        const event = await Calendar.findOne({ where: { sender_id: sender, deletedAt: null, status: 'confirmed' } });
        
        const [date, time] = [parameters.fields.date.stringValue, parameters.fields.time.stringValue];

        let missingSlots = [];
        if (!date) { missingSlots.push('data'); }
        if (!time) { missingSlots.push('horário'); }

        if (missingSlots.length === 1) {
            const dateTimeStart = new Date(Date.parse(date.split('T')[0] + 'T' + date.split('T')[1].split('-')[0] + '-03:00'));

            calendarAPI.slotsFromEvents(dateTimeStart).then(async (resTime) => {
                let replies = [];
                resTime.forEach(function (time) {
                    const hour = moment(time).format('HH:mm');
                    replies.push({
                        'content_type': 'text',
                        'title': hour,
                        'payload': hour
                    });
                });
                let text = 'Ótimo dia, qual o melhor horário para esse novo agendamento?';
                await send.sendQuickReply(sender, text, replies);
            });

        }
        else if (missingSlots.length === 2) {
            const today = moment().format();
            const dateTimeStart = new Date(Date.parse(today.split('T')[0] + 'T' + today.split('T')[1].split('-')[0] + '-03:00'));
            const dateTimeEnd = new Date(moment(dateTimeStart).add(7, 'days'));

            calendarAPI.daysFromSlots(dateTimeStart, dateTimeEnd).then(async (resTime) => {
                let days = [];
                let daysRefine = [];
                resTime.forEach(function (time) {
                    moment.locale('pt-BR');
                    const day = moment(time.startDate).format('DD');
                    const month = moment(time.startDate).format('MM');
                    const weekDay = moment(time.startDate).format('dddd');

                    days.push({
                        day: day,
                        month: month,
                        weekDay: weekDay
                    });
                    daysRefine = days.filter(function (a) {
                        return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
                    }, Object.create(null));
                });
                let replies = [];
                daysRefine.forEach(function (day) {
                    replies.push({
                        'content_type': 'text',
                        'title': `${day.weekDay.substring(0, 3)} - ${day.day}/${day.month}`,
                        'payload': `${day.weekDay.substring(0, 3)} - ${day.day}/${day.month}`
                    });
                });
                let text = 'Entendi. 😊 \nPara qual dia gostaria de alterar sua consulta?';
                await send.sendQuickReply(sender, text, replies);
            });
        } else {
            handleMessages(messages, sender);
            if (parameters.fields.date.stringValue && parameters.fields.time.stringValue) {
                const date = parameters.fields.date.stringValue;
                const time = parameters.fields.time.stringValue;
                const dateTimeStart = new Date(Date.parse(date.split('T')[0] + 'T' + time.split('T')[1].split('-')[0] + '-03:00'));
                const dateTimeEnd = new Date(new Date(dateTimeStart).setHours(dateTimeStart.getHours() + 1));
                const appointmentTimeString = moment(dateTimeStart).locale('pt-br').format('LLLL');
        
                calendarAPI.updateCalendarEvent(dateTimeStart, dateTimeEnd, event.event_id).then(async (res) => {

                    const event = res.data;

                    await Calendar.update({
                        start: moment(event.start.dateTime).format('YYYY-MM-DD HH:mm:ss'),
                        end: moment(event.end.dateTime).format('YYYY-MM-DD HH:mm:ss')
                    }, {
                        where: { sender_id: sender },
                        returning: true,
                        plain: true
                    }).catch((err) => {
                        console.log('❌ [BOT CONSILIO] MYSQL: ', err);
                    });

                    const text = `${userDB.first_name}, reagendei aqui! ✌ \nTe aguardamos aqui 📆 ${appointmentTimeString}.`;
                    await send.sendTextMessage(sender, text);
                    
                    let buttons = [
                        {
                            type: 'web_url',
                            url: 'http://bit.ly/humbertoconsilio',
                            title: 'Chamar no WhatsApp'
                        },
                        {
                            type: 'phone_number',
                            title: 'Ligar agora',
                            payload: '+5562983465454',
                        },
                        {
                            type: 'postback',
                            title: 'Falar com humano',
                            payload: 'Falar com humano'
                        }
                    ];
    
                    await send.sendButtonMessage(sender, 'Caso tenha ficado alguma dúvida, fique à vontade de conversar com a gente!', buttons);
               
                }).catch(async (erro) => {
                    console.log('ERRO', erro);
                    const text = `Opps o horário ${appointmentTimeString}, não está disponível. Vamos tentar outro?`;
                    await send.sendTextMessage(sender, text);
                });
            }
        }
    },
    'input.schedule.cancel': async (sender) => {
        await send.sendTypingOn(sender);
        const event = await Calendar.findOne({ where: { sender_id: sender, deletedAt: null, status: 'confirmed' } });

        if (event && event.status == 'confirmed') {
            
            const text = 'Que pena! 😢 \nA avaliação é o primeiro passo para a transformação do seu sorriso ou dar aquele up! na autoestima.';
            await send.sendTextMessage(sender, text);

            let text2 = 'Deseja mesmo cancelar a sua avaliação? Lembre-se que você pode reagendar. 👇';
            let replies = [
                {
                    'content_type': 'text',
                    'title': 'Sim',
                    'payload': 'Sim'
                },
                {
                    'content_type': 'text',
                    'title': 'Reagendar avaliação',
                    'payload': 'Reagendar avaliação'
                }
            ];
            await send.sendQuickReply(sender, text2, replies);
            
        } else {
            const text = 'Não encontrei o seu agendamento 🤔';
            await send.sendTextMessage(sender, text);
            
            let text2 = 'Caso você queira ver sobre outro assunto. \n\nÉ só selecionar o botão 👇';
            let replies = [
                {
                    'content_type': 'text',
                    'title': 'Agendar avaliação',
                    'payload': 'Agendar avaliação'
                },
                {
                    'content_type': 'text',
                    'title': 'Tratamentos',
                    'payload': 'Tratamentos'
                },
                {
                    'content_type': 'text',
                    'title': 'Horário de funcionamento',
                    'payload': 'Horário de funcionamento'
                }
            ];
            await send.sendQuickReply(sender, text2, replies);
            
        }
    },
    'input.schedule.cancel-yes': async (sender) => {
        await send.sendTypingOn(sender);
        const userDB = await Leads.findOne({ where: { sender_id: sender } });
        const event = await Calendar.findOne({ where: { sender_id: sender, deletedAt: null, status: 'confirmed' } });

        await calendarAPI.deleteCalendarEvent(event.event_id).then(async () => {

            await Calendar.update({ status: 'canceled' }, {
                where: { event_id: event.event_id },
                returning: true,
                plain: true
            });
            await Calendar.destroy({ where: { event_id: event.event_id }});

            const text = `${userDB.first_name}, tudo pronto! \nCancelei sua avaliação.`;
            await send.sendTextMessage(sender, text);
            
            const text2 = 'Caso você queira ver sobre outro assunto. \n\nÉ só selecionar o botão 👇';
            const replies = [
                {
                    'content_type': 'text',
                    'title': 'Agendar avaliação',
                    'payload': 'Agendar avaliação'
                },
                {
                    'content_type': 'text',
                    'title': 'Tratamentos',
                    'payload': 'Tratamentos'
                },
                {
                    'content_type': 'text',
                    'title': 'Horário de funcionamento',
                    'payload': 'Horário de funcionamento'
                }
            ];
            await send.sendQuickReply(sender, text2, replies);
           
        }).catch(async (erro) => {
            console.log('ERRO', erro);
            const text = 'Ops, não consegui acessar a agenda agora, tente novamente mais tarde. 😓 ';
            await send.sendTextMessage(sender, text);
        }); 
    },
    'input.institutional': async (sender) => {
        await send.sendTypingOn(sender);
        const event = await Calendar.findOne({ where: { sender_id: sender, deletedAt: null, status: 'confirmed' } });

        const text = 'Ficamos felizes de você querer nos conhecer melhor! 💗 \n\nVamos aqui conta um pouco sobre a nossa clínica. Nossa Clínica foi fundada nos mais sólidos princípios éticos e profissionais. Possuímos uma equipe de profissionais especializada e pronta para oferecer o que há de mais avançado em tratamentos odontológicos e estética facial.';
        await send.sendTextMessage(sender, text);

        if (event && event.status == 'confirmed') {

            const text = 'É meio complicado demonstrarmos tudo o que somos capazes por aqui.\nMas, a sua consulta de avaliação já está chegando e logo você nos conhecerá melhor. 😍 \n\nCaso tenha ficado alguma dúvida, fique à vontade de conversar com a gente no WhatsApp!';
            await send.sendTextMessage(sender, text);

            let buttons = [
                {
                    type:'web_url',
                    url:'http://bit.ly/humbertoconsilio',
                    title:'Chamar no WhatsApp'
                }
            ];

            await send.sendButtonMessage(sender, 'Caso tenha ficado alguma dúvida, fique à vontade de conversar com a gente!', buttons);
            
        } else {
            const text = 'É complicado demonstrarmos tudo o que somos capazes por aqui.';
            await send.sendTextMessage(sender, text);
            
            const text2 = 'Agende uma avaliação, será um prazer te receber 😍';
            const replies = [
                {
                    'content_type': 'text',
                    'title': 'Agendar agora',
                    'payload': 'Agendar agora'
                }
            ];
            await send.sendQuickReply(sender, text2, replies);
            
        }
    },
    'input.treatments': async (sender) => {
        await send.sendTypingOn(sender);
        const text = 'Entendi! Veja alguns tratamentos/procedimentos que realizamos aqui na clínica e saiba mais sobre cada um deles. É só escolher 😉';
        await send.sendTextMessage(sender, text);
       
        let elements = [
            {
                title:'Invisalign',
                image_url:'https://afetoodontologia.com.br/wp-content/uploads/2019/10/shutterstock-1006765645.png',
                subtitle:'O Invisalign são “alinhadores invisíveis”. Alternativa para quem não quer usar os aparelhos tradicionais',
                default_action: {
                    type: 'web_url',
                    url: 'https://consilio.com.br/',
                },
                buttons: [{
                    type: 'postback',
                    title: 'Agendar consulta',
                    payload: 'SCHEDULE_APPOINTMENT',
                }]      
            },
            {
                title:'Harmonização facial',
                image_url:'https://afetoodontologia.com.br/wp-content/uploads/2019/10/harmoniza%C3%A7%C3%A3o-site-768x536.png',
                subtitle:'Novo conceito da estética facial e rejunevescimento que integra a naturalidade à beleza da face',
                default_action: {
                    type: 'web_url',
                    url: 'https://consilio.com.br/',
                },
                buttons: [{
                    type: 'postback',
                    title: 'Agendar consulta',
                    payload: 'SCHEDULE_APPOINTMENT',
                }]      
            },
            {
                title:'Ortodontia',
                image_url:'https://afetoodontologia.com.br/wp-content/uploads/2019/09/ortodontia.jpg',
                subtitle:'Dentes alinhados não ajudam apenas o seu sorriso, mas também a saúde do seu organismo',
                default_action: {
                    type: 'web_url',
                    url: 'https://consilio.com.br/',
                },
                buttons: [{
                    type: 'postback',
                    title: 'Agendar consulta',
                    payload: 'SCHEDULE_APPOINTMENT',
                }]      
            },
            {
                title:'Implantes Dentários',
                image_url:'https://afetoodontologia.com.br/wp-content/uploads/2020/04/implantes-dentarios-afeto.jpg',
                subtitle:'O tratamento por meio do Implante trata-se de um pino inserido no maxilar ou mandíbula através de uma cirurgia. ',
                default_action: {
                    type: 'web_url',
                    url: 'https://consilio.com.br/',
                },
                buttons: [{
                    type: 'postback',
                    title: 'Agendar consulta',
                    payload: 'SCHEDULE_APPOINTMENT',
                }]      
            },
            {
                title:'Lentes de Contato',
                image_url:'https://afetoodontologia.com.br/wp-content/uploads/2020/03/image.png',
                subtitle:'As Lentes de Contato Dentais são trabalhos estéticos que encobrem a frente do dente.',
                default_action: {
                    type: 'web_url',
                    url: 'https://consilio.com.br/',
                },
                buttons: [{
                    type: 'postback',
                    title: 'Agendar consulta',
                    payload: 'SCHEDULE_APPOINTMENT',
                }]      
            }
        ];
        await send.sendGenericMessage(sender, elements);
        
    },
    'input.values': async (sender) => {
        await send.sendTypingOn(sender);
        
        const text = 'Para te passarmos um valor, precisamos primeiramente fazer uma avaliação sem compromisso. O valor costuma ser diferente de paciente para paciente.';
        send.sendTextMessage(sender, text);
        
        const text2 = 'Mas, fique tranquilo! Você pode agendar a sua avaliação agora. Clique abaixo. 😬';
        const replies = [
            {
                'content_type': 'text',
                'title': 'Agendar agora',
                'payload': 'Agendar agora'
            }
        ];
        await send.sendQuickReply(sender, text2, replies);

    },
    'input.contact': async (sender) => {
        await send.sendTypingOn(sender);

        const text = 'Para falar conosco durante o horário comercial. \n\n(62) 3940-4050 ☎\n(62) 99521-3531 📲';
        send.sendTextMessage(sender, text);

        let buttons = [
            {
                type:'web_url',
                url:'http://bit.ly/humbertoconsilio',
                title:'Chamar no WhatsApp'
            },
            {
                type:'phone_number',
                title:'Ligar agora',
                payload:'+5562983465454',
            }
        ];
        await send.sendButtonMessage(sender, 'Ou basta escolher abaixo que te transfiro.', buttons);

    },
    'input.how_it_works': async (sender) => {
        await send.sendTypingOn(sender);
        const text = `Aqui na ${config.NAME_COMPANY} acreditamos que para entender todas as suas necessidades e oferecer o tratamento mais adequando, é necessário te conhecermos primeiramente! \nPor isso, você pode agendar uma avaliação sem compromisso. Após essa avaliação, falaremos sobre valores e as melhores formas de conduzir o seu tratamento.`;
        await send.sendTextMessage(sender, text);

        let buttons = [
            {
                type:'postback',
                payload:'SCHEDULE_APPOINTMENT',
                title:'Ok, agendar agora'
            },
            {
                type:'web_url',
                url:'http://bit.ly/humbertoconsilio',
                title:'Ok, chamar no WhatsApp'
            }
        ];
        await send.sendButtonMessage(sender, 'O que acha de continuarmos?', buttons);
    },
    'input.payment_methods': async (sender) => {
        await send.sendTypingOn(sender);

        const text = 'Aceitamos todas as bandeiras de cartões de crédito, dinheiro, cheque e boleto. Venha fazer uma avaliação e descobrir as possibilidades que podemos oferecer para você! 😉';
        await send.sendTextMessage(sender, text);

    },
    'input.address': async (sender) => {
        await send.sendTypingOn(sender);
        const text = 'Funcionamos de Segunda a Sexta das 08h as 18h.\nNa rua Av. do Comércio, Nº 25 - Sala 502 - Vila Maria José.';
        await send.sendTextMessage(sender, text);

        let buttons = [
            {
                type:'web_url',
                url:'http://bit.ly/humbertoconsilio',
                title:'Chamar no WhatsApp'
            },
            {
                type:'web_url',
                url:'https://goo.gl/maps/yuL1CR8LwRFA3nWJ8',
                title:'Localização (Mapa)'
            },
            {
                type:'phone_number',
                title:'Ligar agora',
                payload:'+5562983465454',
            }
        ];
        await send.sendButtonMessage(sender, 'Tenho mais algumas opções para você:', buttons);

    },
    'input.about': async (sender) => {
        await send.sendTypingOn(sender);

        const text = 'Desculpe por não me apresentar! 😬';
        await send.sendTextMessage(sender, text);

        const text2 = `Eu sou a Lary, atendente virtual da ${config.NAME_COMPANY}. 🤖`;
        await send.sendTextMessage(sender, text2);
    },
    'input.corona': async (sender) => {
        await send.sendTypingOn(sender);
        const text = 'Espero que esteja tudo bem!';
        send.sendTextMessage(sender, text);

        let buttons = [
            {
                type: 'postback',
                title: 'Cancelar consulta',
                payload: 'CANCEL_APPOINTMENT',
            },
            {
                type:'web_url',
                url:'https://coronavirus.saude.gov.br/',
                title:'Informações COVID-19'
            },
        ];
        await send.sendButtonMessage(sender, 'Tenho algumas sugestões sobre esse assunto.', buttons);
    },
    'input.plans': async (sender) => {
        await send.sendTypingOn(sender);
        const text = 'Infelizmente não possuímos convênios, mas acreditamos que podemos apresentar as melhores soluções para você!';
        await send.sendTextMessage(sender, text);

        let text2 = 'Agende sua avaliação sem compromisso! 😉';
        let replies = [
            {
                'content_type': 'text',
                'title': 'Agendar agora',
                'payload': 'Agendar agora'
            }
        ];
        await send.sendQuickReply(sender, text2, replies);

    },
    'input.recommendations': async (sender) => {
        await send.sendTypingOn(sender);

        const text = 'Nossa! De imediato já desejo uma boa recuperação 🙏.\nVeja as recomendações que temos disponíveis aqui.\nClick no card da recomendação que você está precisando 👇';
        await send.sendTextMessage(sender, text);

        let elements = [
            {
                title:'Lentes de contato',
                image_url:'https://afetoodontologia.com.br/wp-content/uploads/elementor/thumbs/afeto-odontologia-lente-de-contato-opux763t0jnd31c6mnev3e4vwbgjayqwwwunthhte6.jpg',
                subtitle:'As lentes de contato dental se tornaram as queridinhas das famosas e famosos que transformam os seus sorrisos através deste método.',
                default_action: {
                    type: 'web_url',
                    url: 'https://consilio.com.br/',
                },
                buttons: [{
                    type: 'postback',
                    title: 'Agendar consulta',
                    payload: 'SCHEDULE_APPOINTMENT',
                }]      
            },
            {
                title:'Bruxismo',
                image_url:'https://afetoodontologia.com.br/wp-content/uploads/elementor/thumbs/topo-oop900sny7228bbfgnuad6ta0d0uaerpe3v5tbnmps.png',
                subtitle:'Na correria do dia a dia quando chegamos em casa o que mais queremos é relaxar e dormir.',
                default_action: {
                    type: 'web_url',
                    url: 'https://consilio.com.br/',
                },
                buttons: [{
                    type: 'postback',
                    title: 'Agendar consulta',
                    payload: 'SCHEDULE_APPOINTMENT',
                }]      
            },
            {
                title:'Siso',
                image_url:'https://afetoodontologia.com.br/wp-content/uploads/elementor/thumbs/cirurgia-siso-onojy8ieoywu8k2ji5ddwg6wle355k04160892ty24.png',
                subtitle:'Os cuidados pós-operatórios são muito importantes, pois eles garantem uma boa recuperação e cicatrização.',
                default_action: {
                    type: 'web_url',
                    url: 'https://consilio.com.br/',
                },
                buttons: [{
                    type: 'postback',
                    title: 'Agendar consulta',
                    payload: 'SCHEDULE_APPOINTMENT',
                }]      
            },
            {
                title:'Clareamento',
                image_url:'https://afetoodontologia.com.br/wp-content/uploads/elementor/thumbs/recomenda%C3%A7%C3%A3o-pos-clareamento-dent%C3%A1rio-ooqmhelg4xmx83rbfoassnvqqst800qkb4wi1mdqkg.png',
                subtitle:'Após realizar um clareamento dentário os dentes estão mais sensíveis e suscetíveis a manchas.',
                default_action: {
                    type: 'web_url',
                    url: 'https://consilio.com.br/',
                },
                buttons: [{
                    type: 'postback',
                    title: 'Agendar consulta',
                    payload: 'SCHEDULE_APPOINTMENT',
                }]      
            },
            {
                title:'Aparelho ortodôntico',
                image_url:'https://afetoodontologia.com.br/wp-content/uploads/elementor/thumbs/Ortodontia_1-onojhdao1ztlwgkjzuwe5pf4uh81131idokk8bu9po.png',
                subtitle:'Quem faz um tratamento ortodôntico almeja ter os dentes alinhados e aquele sorriso dos sonhos.',
                default_action: {
                    type: 'web_url',
                    url: 'https://consilio.com.br/',
                },
                buttons: [{
                    type: 'postback',
                    title: 'Agendar consulta',
                    payload: 'SCHEDULE_APPOINTMENT',
                }]      
            }
        ];
        await send.sendGenericMessage(sender, elements);
    },
    'talk.human': async (sender) => {
        await send.sendTypingOn(sender);
        const userDB = await Leads.findOne({ where: { sender_id: sender } });
        facebookAPI.sendPassThread(sender);
        smsAPI.textMessageService.send(sender, 'Verifique sua caixa de entrada do Messenger, estão chamando por você.', ['5562983465454'], data => console.log('SMS API CALL: ', data));

        const text = `Tudo bem ${userDB.first_name}. 👌 \nEstou te transferindo para um dos nossos atendentes humanos. Aguarde que logo ele irá aparecer...`;
        await send.sendTextMessage(sender, text);
    },
    'input.unknown': async (sender, messages) => {
        await send.sendTypingOn(sender);
        handleMessages(messages, sender);

        let text = 'Opps, talvez eu não tenha aprendido o suficiente. 😔 \n\nPodemos tentar de novo, ou se preferir falar com um dos nossos humanos disponíveis. 💜';
        let replies = [
            {
                'content_type': 'text',
                'title': 'Falar com humano',
                'payload': 'Falar com humano'
            }
        ];
        await send.sendQuickReply(sender, text, replies);
    },
    'default': async (sender, messages) => {
        await send.sendTypingOn(sender);
        handleMessages(messages, sender);
    }
};
const handleDialogFlowAction = (sender, action, messages, contexts, parameters) => {
    return (handleDFAObj[action] ? handleDFAObj[action] : handleDFAObj['default'])(sender, messages, contexts, parameters);
};

/**
 * Just logging message echoes to console
 * @param {Number} messageId
 * @param {Number} appId
 * @param {Object} metadata
 */
const handleEcho = (messageId, appId, metadata) => {
    console.log(
        '❌ [BOT CONSILIO] Received echo for message %s and app %d with metadata %s',
        messageId,
        appId,
        metadata
    );
};

/**
 * Received message
 * @param {*} event
 */
const receivedMessage = event => {
    var senderID = event.sender.id;
    var recipientID = event.recipient.id;
    var timeOfMessage = event.timestamp;
    var message = event.message;

    utils.setSessionandUser(senderID);

    console.log(
        '⚡️ [BOT CONSILIO] Received message for user %d and page %d at %d with message:',
        senderID,
        recipientID,
        timeOfMessage
    );

    var isEcho = message.is_echo;
    var messageId = message.mid;
    var appId = message.FB_APP_ID;
    var metadata = message.metadata;

    // You may get a text or attachment but not both
    var messageText = message.text;
    var messageAttachments = message.attachments;
    var quickReply = message.quick_reply;

    if (isEcho) {
        handleEcho(messageId, appId, metadata);
        return;
    } else if (quickReply) {
        handleQuickReply(senderID, quickReply, messageId);
        return;
    }

    if (messageText) {
        dialogflowAPI.sendTextToDialogFlow(senderID, messageText);
    } else if (messageAttachments) {
        handleMessageAttachments(messageAttachments, senderID);
    }
};

/**
 * Received post back
 * @param {*} event
 */

const receivedPbObj = {
    'get_started': (senderID, payload) => {
        dialogflowAPI.sendTextToDialogFlow(senderID, payload);
    },
    'VIEW_SITE': async (senderID, payload) => {
        await send.sendTextMessage(senderID, payload);
    },
    'SCHEDULE_APPOINTMENT': (senderID) => {
        dialogflowAPI.sendEventToDialogFlow(senderID, 'schedule');
    },
    'CANCEL_APPOINTMENT': (senderID) => {
        dialogflowAPI.sendEventToDialogFlow(senderID, 'schedule_cancel');
    },
    'DEFAULT': async (senderID, payload) => {
        await send.sendTextMessage(senderID, payload);
    }
};
const receivedPostback = event => {
    var senderID = event.sender.id;
    var recipientID = event.recipient.id;
    var timeOfPostback = event.timestamp;

    var payload = event.postback.payload;

    utils.setSessionandUser(senderID);

    console.log(
        '⚡️ [BOT CONSILIO] Received postback for user %d and page %d with payload \'%s\' ' +
      'at %d',
        senderID,
        recipientID,
        payload,
        timeOfPostback
    );

    return (receivedPbObj[payload] || receivedPbObj['DEFAULT'])(senderID, payload);
};

/**
 * Received notification message read
 * @param {*} event
 */
const receivedMessageRead = event => {
    // var senderID = event.sender.id;
    // var recipientID = event.recipient.id;

    var watermark = event.read.watermark;
    var sequenceNumber = event.read.seq;

    console.log(
        '⚡️ [BOT CONSILIO] Received message read event for watermark %d and sequence ' +
      'number %d',
        watermark,
        sequenceNumber
    );
};

/**
 * Received notification authentication
 * @param {*} event
 */
const receivedAuthentication = event => {
    var senderID = event.sender.id;
    var recipientID = event.recipient.id;
    var timeOfAuth = event.timestamp;

    var passThroughParam = event.optin.ref;

    console.log(
        '⚡️ [BOT CONSILIO] Received authentication for user %d and page %d with pass ' +
      'through param \'%s\' at %d',
        senderID,
        recipientID,
        passThroughParam,
        timeOfAuth
    );
    send.sendTextMessage(senderID, 'Autenticação realizada com sucesso!');
};

/**
 * Received account link
 * @param {*} event
 */
const receivedAccountLink = event => {
    var senderID = event.sender.id;
    // var recipientID = event.recipient.id;

    var status = event.account_linking.status;
    var authCode = event.account_linking.authorization_code;

    console.log(
        '⚡️ [BOT CONSILIO] Received account link event with for user %d with status %s ' +
      'and auth code %s ',
        senderID,
        status,
        authCode
    );
};

/**
 * Received devivery confirmation
 * @param {*} event
 */
const receivedDeliveryConfirmation = event => {
    // var senderID = event.sender.id;
    // var recipientID = event.recipient.id;
    var delivery = event.delivery;
    var messageIDs = delivery.mids;
    var watermark = delivery.watermark;
    // var sequenceNumber = delivery.seq;

    if (messageIDs) {
        messageIDs.forEach(function(messageID) {
            console.log(
                '⚡️ [BOT CONSILIO] Received delivery confirmation for message ID: %s',
                messageID
            );
        });
    }
    console.log(
        '⚡️ [BOT CONSILIO] All message before %d were delivered.',
        watermark
    );
};

export default {
    handleCardMessages,
    handleMessages,
    handleMessage,
    handleQuickReply,
    handleMessageAttachments,
    handleDialogFlowResponse,
    handleDialogFlowAction,
    handleEcho,
    receivedMessage,
    receivedPostback,
    receivedMessageRead,
    receivedAuthentication,
    receivedAccountLink,
    receivedDeliveryConfirmation
};
