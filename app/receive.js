'use strict';
import moment from 'moment';
import { struct } from 'pb-util';
import send from './send';
import utils from '../utils';
import mysql from '../config/mysql';
import dialogflowAPI from '../services/dialogflow.service';
import facebookAPI from '../services/facebook.service';
import calendarAPI from '../services/calendar.service';
import calendarModel from '../models/calendar.model';
import userModel from '../models/user.model';

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
    let timeoutInterval = 1100;
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
        message.text.text.forEach(text => {
            if (text !== '') {
                send.sendTextMessage(sender, text);
            }
        });
    },
    'quickReplies': (message, sender) => {
        let replies = [];
        message.quickReplies.quickReplies.forEach(text => {
            let reply = {
                content_type: 'text',
                title: text,
                payload: text
            };
            replies.push(reply);
        });
        return send.sendQuickReply(sender, message.quickReplies.title, replies);
    },
    'image': (message, sender) => {
        send.sendImageMessage(sender, message.image.imageUri);
    },
    'payload': (message, sender) => {
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
        facebookAPI.sendCall(messageData, 0);
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
const handleMessageAttachments = (messageAttachments, senderID) => {
    send.sendTextMessage(senderID, 'Recebi o anexo. Muito obrigado.');
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

    var delay = 1000;

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
        const user = utils.usersMap.get(sender);
        const userDB = await mysql.execQuery(`SELECT * FROM leads WHERE senderID= '${sender}'`).catch(err => {
            console.log('❌ ERRO: ', err);
        });

        const welcome = () => {
            return new Promise(function(resolve) {
                send.sendTypingOn(sender);
                setTimeout(function() {
                    resolve(send.sendTextMessage(sender, `Oi ${user.first_name}! 👋`));
                }, 1000);
            });
        };
        const about = () => {
            return new Promise(function(resolve) {
                send.sendTypingOn(sender);
                setTimeout(function() {
                    resolve(send.sendTextMessage(sender, 'Sou a Lary, a atendente virtual 🤖 da Clínica Dentalk!'));
                }, 1000);
            });
        };
        const copy = () => {
            return new Promise(function(resolve) {
                send.sendTypingOn(sender);
                setTimeout(function() {
                    resolve(send.sendTextMessage(sender, 'Aqui acreditamos que sorrisos renovados transformam vidas!'));
                }, 1000);
            });
        };
        const getPhone = () => {
            return new Promise(function(resolve) {
                send.sendTypingOn(sender);
                setTimeout(function() {
                    let replies = [
                        {
                            'content_type': 'user_phone_number',
                            'title': 'user_phone_number',
                            'payload': 'user_phone_number'
                        }
                    ];
                    const text = 'Me confirme seu número de telefone:';
                    resolve(send.sendQuickReply(sender, text, replies));
                }, 1000);
            });
        };
        const getEmail = () => {
            return new Promise(function(resolve) {
                send.sendTypingOn(sender);
                setTimeout(function() {
                    let replies = [
                        {
                            'content_type': 'user_email',
                            'title': 'user_email',
                            'payload': 'user_email'
                        }
                    ];
                    const text = 'Ok! Antes de começarmos me confirme também seu e-mail:';
                    resolve(send.sendQuickReply(sender, text, replies));
                }, 1000);
            });
        };
        const onboarding = (first) => {
            return new Promise(function(resolve) {
                send.sendTypingOn(sender);
                setTimeout(function() {
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
                    if(first) {
                        const text = 'Vamos começar o seu atendimento, selecione um dos botões abaixo. 👇';
                        resolve(send.sendQuickReply(sender, text, replies));
                    } else {
                        const text = 'Que bom te ver por aqui novamente. No que posso te ajudar hoje?';
                        resolve(send.sendQuickReply(sender, text, replies));
                    }
                }, 1000);
            });
        };

        const restart = () => {
            return new Promise(function(resolve) {
                send.sendTypingOn(sender);
                setTimeout(function() {
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
                    
                    const text = 'Quer falar sobre outro assunto? 🤓 \nTenho algumas sugestões aqui para você:';
                    resolve(send.sendQuickReply(sender, text, replies));
                    
                }, 1000);
            });
        };

        const phoneDB = userDB.phone;
        const emailDB = userDB.phone;

        if (phoneDB !== null && emailDB !== null) {

            welcome().then(() => {
                return setTimeout(function() {
                    send.sendTypingOn(sender);
                    onboarding();
                }, 1000);
            });

        } else {

            const [phone, email] = [parameters.fields.phone.stringValue, parameters.fields.email.stringValue];
            let missingSlots = [];
            if (!phone) { missingSlots.push('telefone'); }
            if (!email) { missingSlots.push('e-mail'); }

            if (missingSlots.length === 1){
                if (!phone && email) {
                    return getPhone();
                } else if (!email && phone) {
                    return getEmail();
                }
            } 
            else if (missingSlots.length === 2){
                welcome().then(() => {
                    return about();
                }).then(() => {
                    return copy();
                }).then(() => {
                    return getPhone();
                });
            } else {
                if (phone && email) {
                    mysql.execQuery(`UPDATE leads SET phone = '${phone}' WHERE senderID = '${sender}'`)
                        .catch(err => {
                            console.log('❌ ERRO: ', err);
                        });
                    mysql.execQuery(`UPDATE leads SET email = '${email}' WHERE senderID = '${sender}'`)
                        .catch(err => {
                            console.log('❌ ERRO: ', err);
                        });
                }
                return setTimeout(function() {
                    send.sendTypingOn(sender);
                    onboarding(true);
                }, 1000);
            }
        }
    
    },
    'input.schedule': async (sender, messages, contexts, parameters) => {
        const userDB = await userModel.getUserDB(sender);
        const event = await calendarModel.getEvent(sender);

        send.sendTypingOn(sender);

        if (event.length > 0 || event.status == 'confirmed') {

            const text = `Você já tem uma avaliação marcada 📆 ${moment(event.start).locale('pt-br').format('LLLL')}.`;
            send.sendTextMessage(sender, text);

            setTimeout(function() {
                let text = 'Deseja reagendar? 👇';
                let replies = [
                    {
                        'content_type': 'text',
                        'title': 'Reagendar agora',
                        'payload': 'Reagendar agora'
                    }
                ];
                send.sendQuickReply(sender, text, replies);
            }, 1000);

        } else {

            const [date, time] = [parameters.fields.date.stringValue, parameters.fields.time.stringValue];

            let missingSlots = [];
            if (!date) { missingSlots.push('data'); }
            if (!time) { missingSlots.push('horário'); }

            if (missingSlots.length === 1){
                const dateTimeStart = new Date(Date.parse(date.split('T')[0] + 'T' + date.split('T')[1].split('-')[0] + '-03:00'));

                calendarAPI.slotsFromEvents(dateTimeStart).then((resTime) => {
                    let replies = [];
                    resTime.forEach(function(time) {
                        const hour = moment(time).format('HH:mm');
                        replies.push({
                            'content_type': 'text',
                            'title': hour,
                            'payload': hour
                        });
                    });
                    let text = 'Agora, selecione o melhor horário dentre os disponíveis para a sua avaliação:';
                    send.sendQuickReply(sender, text, replies);
                });

            } 
            else if (missingSlots.length === 2){
                const today = moment().format();
                const dateTimeStart = new Date(Date.parse(today.split('T')[0] + 'T' + today.split('T')[1].split('-')[0] + '-03:00'));
                const dateTimeEnd = new Date(moment(dateTimeStart).add(7, 'days'));

                calendarAPI.daysFromSlots(dateTimeStart, dateTimeEnd).then((resTime) => {
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
                    send.sendQuickReply(sender, text, replies);
                });
            } else {
                handleMessages(messages, sender);
                send.sendTypingOn(sender);
                if (parameters.fields.date.stringValue && parameters.fields.time.stringValue) {
                    const date = parameters.fields.date.stringValue;
                    const time = parameters.fields.time.stringValue;
                    const dateTimeStart = new Date(Date.parse(date.split('T')[0] + 'T' + time.split('T')[1].split('-')[0] + '-03:00'));
                    const dateTimeEnd = new Date(new Date(dateTimeStart).setHours(dateTimeStart.getHours() + 1));
                    const appointmentTimeString = moment(dateTimeStart).locale('pt-br').format('LLLL');
             
                    calendarAPI.createCalendarEvent(dateTimeStart, dateTimeEnd, userDB).then(async (res) => {

                        const event = res.data;
                        const eventID = await utils.getEventID(event);

                        mysql.execQuery(`INSERT INTO calendar_events (eventID, senderID, status, link, summary, description, start, end) VALUES ('${eventID}', '${sender}', '${event.status}', '${event.htmlLink}', '${event.summary}', '${event.description}', '${moment(event.start.dateTime).format('YYYY-MM-DD HH:mm:ss')}', '${moment(event.end.dateTime).format('YYYY-MM-DD HH:mm:ss')}')`).catch(err => {
                            console.log('❌ ERRO: ', err);
                        });
                    
                        send.sendTypingOn(sender);
                        setTimeout(function() {
                            const text = `Tudo certo ${userDB.first_name}! Agendei aqui para você. 📝 \nTe aguardamos aqui 📆 ${appointmentTimeString}.`;
                            send.sendTextMessage(sender, text);
                        }, 1000);
                        setTimeout(function() {
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
        
                            send.sendButtonMessage(sender, 'Caso tenha ficado alguma dúvida, fique à vontade de conversar com a gente!', buttons);
                        }, 4000);
                    }).catch((erro) => {
                        console.log('ERRO', erro);
                        const text = `Opps o horário ${appointmentTimeString}, não está disponível. Vamos tentar outro?`;
                        send.sendTextMessage(sender, text);
                    }); 
                }
            }
        }
    },
    'input.schedule.verify': async (sender) => {
        send.sendTypingOn(sender);
        const event = await calendarModel.getEvent(sender);
        
        if (event.length > 0 || event.status == 'confirmed') {
                     
            const text = `Encontrei! Sou rápida, não é mesmo? 😏 \nExiste um agendamento para 📆 ${moment(event.start).locale('pt-br').format('LLLL')}.`;
            send.sendTextMessage(sender, text);
    
            setTimeout(function() {
                let text = 'Deseja reagendar ou cancelar? 👇';
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
                send.sendQuickReply(sender, text, replies);
            }, 1000);
        } else {
            const text = 'Infelizmente não encontrei o seu agendamento. 😰';
            send.sendTextMessage(sender, text);

            setTimeout(function() {
                let text = 'Mas, calma. Você pode agendar a sua avaliação agora! 😄 \n\nSelecione para agendar. 👇';
                let replies = [
                    {
                        'content_type': 'text',
                        'title': 'Agendar agora',
                        'payload': 'Agendar agora'
                    }
                ];
                send.sendQuickReply(sender, text, replies);
            }, 1000);   
        }
    },
    'input.schedule.update': async (sender) => {
        send.sendTypingOn(sender);
        const event = await calendarModel.getEvent(sender);

        if (event.length > 0 || event.status == 'confirmed') {
            
            const text = `Ótimo! Estava marcado dia 📆 ${moment(event.start).locale('pt-br').format('LLLL')}.`;
            send.sendTextMessage(sender, text);

            setTimeout(function() {
                let text = 'Posso continuar o reagedamento? 👇';
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
                send.sendQuickReply(sender, text, replies);
            }, 1000);
        } else {
            const text = 'Infelizmente não encontrei o seu agendamento. 😰';
            send.sendTextMessage(sender, text);

            setTimeout(function() {
                let text = 'Mas, calma. Você pode agendar a sua avaliação agora! 😄 \n\nSelecione para agendar. 👇';
                let replies = [
                    {
                        'content_type': 'text',
                        'title': 'Agendar agora',
                        'payload': 'Agendar agora'
                    }
                ];
                send.sendQuickReply(sender, text, replies);
            }, 1000);
        }

    },
    'input.schedule.update-yes': async (sender, messages, contexts, parameters) => {
        const userDB = await userModel.getUserDB(sender);
        const event = await calendarModel.getEvent(sender);
        
        send.sendTypingOn(sender);
        handleMessages(messages, sender);
        if (parameters.fields.date.stringValue && parameters.fields.time.stringValue) {
            const date = parameters.fields.date.stringValue;
            const time = parameters.fields.time.stringValue;
            const dateTimeStart = new Date(Date.parse(date.split('T')[0] + 'T' + time.split('T')[1].split('-')[0] + '-03:00'));
            const dateTimeEnd = new Date(new Date(dateTimeStart).setHours(dateTimeStart.getHours() + 1));
            const appointmentTimeString = moment(dateTimeStart).locale('pt-br').format('LLLL');
        
            calendarAPI.updateCalendarEvent(dateTimeStart, dateTimeEnd, event.eventID).then((res) => {

                const event = res.data;
                mysql.execQuery(`UPDATE calendar_events SET start = '${moment(event.start.dateTime).format('YYYY-MM-DD HH:mm:ss')}', end = '${moment(event.end.dateTime).format('YYYY-MM-DD HH:mm:ss')}' WHERE senderID='${sender}'`).catch(err => {
                    console.log('❌ ERRO: ', err);
                });

                setTimeout(function() {
                    const text = `${userDB.first_name}, reagendei aqui! ✌ \nTe aguardamos aqui 📆 ${appointmentTimeString}.`;
                    send.sendTextMessage(sender, text);
                }, 1000);
                setTimeout(function() {
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
    
                    send.sendButtonMessage(sender, 'Caso tenha ficado alguma dúvida, fique à vontade de conversar com a gente!', buttons);
                }, 4000);
               
            }).catch((erro) => {
                console.log('ERRO', erro);
                const text = `Opps o horário ${appointmentTimeString}, não está disponível. Vamos tentar outro?`;
                send.sendTextMessage(sender, text);
            }); 
        }
    },
    'input.schedule.cancel': async (sender) => {
        send.sendTypingOn(sender);

        const event = await calendarModel.getEvent(sender);

        if (event.length > 0 || event.status == 'confirmed') {
            
            const text = 'Que pena! 😢 \nA avaliação é o primeiro passo para a transformação do seu sorriso ou dar aquele up! na autoestima.';
            send.sendTextMessage(sender, text);

            setTimeout(function() {
                let text = 'Deseja mesmo cancelar a sua avaliação? Lembre-se que você pode reagendar. 👇';
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
                send.sendQuickReply(sender, text, replies);
            }, 1000);
        } else {
            const text = 'Não encontrei o seu agendamento 🤔';
            send.sendTextMessage(sender, text);
            
            setTimeout(function() {
                let text = 'Caso você queira ver sobre outro assunto. \n\nÉ só selecionar o botão 👇';
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
                send.sendQuickReply(sender, text, replies);
            }, 1000);
        }
    },
    'input.schedule.cancel-yes': async (sender) => {
        send.sendTypingOn(sender);
        const userDB = await userModel.getUserDB(sender);
        const event = await calendarModel.getEvent(sender);
        console.log(event);
        await calendarAPI.deleteCalendarEvent(event.eventID).then(async () => {
            send.sendTypingOn(sender);
            await calendarModel.cancelEvent(sender);

            setTimeout(function() {
                const text = `${userDB.first_name}, tudo pronto! \nCancelei sua avaliação.`;
                send.sendTextMessage(sender, text);
            }, 1000);
            
            setTimeout(function() {
                let text = 'Caso você queira ver sobre outro assunto. \n\nÉ só selecionar o botão 👇';
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
                send.sendQuickReply(sender, text, replies);
            }, 1000);
           
        }).catch((erro) => {
            console.log('ERRO', erro);
            const text = 'Ops, não consegui acessar a agenda agora, tente novamente mais tarde. 😓 ';
            send.sendTextMessage(sender, text);
        }); 
    },
    'input.institutional': async (sender) => {
        send.sendTypingOn(sender);
        setTimeout(function() {
            const text = 'Ficamos felizes de você querer nos conhecer melhor! 💗 \n\nVamos aqui conta um pouco sobre a nossa clínica. Nossa Clínica foi fundada nos mais sólidos princípios éticos e profissionais. Possuímos uma equipe de profissionais especializada e pronta para oferecer o que há de mais avançado em tratamentos odontológicos e estética facial.';
            send.sendTextMessage(sender, text);
        }, 1000);
        
        const event = await calendarModel.getEvent(sender);

        if (event.length > 0 || event.status == 'confirmed') {
            setTimeout(function() {
                const text = 'É meio complicado demonstrarmos tudo o que somos capazes por aqui.\nMas, a sua consulta de avaliação já está chegando e logo você nos conhecerá melhor. 😍 \n\nCaso tenha ficado alguma dúvida, fique à vontade de conversar com a gente no WhatsApp!';
                send.sendTextMessage(sender, text);
            }, 1000);
            setTimeout(function() {
                let buttons = [
                    {
                        type:'web_url',
                        url:'http://bit.ly/humbertoconsilio',
                        title:'Chamar no WhatsApp'
                    }
                ];

                send.sendButtonMessage(sender, 'Caso tenha ficado alguma dúvida, fique à vontade de conversar com a gente!', buttons);
            }, 1000);
        } else {
            send.sendTypingOn(sender);
            setTimeout(function() {
                const text = 'É complicado demonstrarmos tudo o que somos capazes por aqui.';
                send.sendTextMessage(sender, text);
            }, 1000);
            setTimeout(function() {
                let text = 'Agende uma avaliação, será um prazer te receber 😍';
                let replies = [
                    {
                        'content_type': 'text',
                        'title': 'Agendar agora',
                        'payload': 'Agendar agora'
                    }
                ];
                send.sendQuickReply(sender, text, replies);
            }, 1000);
        }
    },
    'input.treatments': (sender) => {
        send.sendTypingOn(sender);
        setTimeout(function() {
            const text = 'Entendi! Veja alguns tratamentos/procedimentos que realizamos aqui na clínica e saiba mais sobre cada um deles. É só escolher 😉';
            send.sendTextMessage(sender, text);
        }, 1000);
        setTimeout(function() {
            let elements = [
                {
                    title:'Invisalign',
                    image_url:'https://afetoodontologia.com.br/wp-content/uploads/2019/10/shutterstock-1006765645.png',
                    subtitle:'Alternativa para quem não quer usar os aparelhos tradicionais',
                    default_action: {
                        type: 'web_url',
                        url: 'https://afetoodontologia.com.br/invisalign/',
                    },
                    buttons: [{
                        type: 'postback',
                        title: 'Agendar consulta',
                        payload: 'Agendar consulta',
                    }]      
                },
                {
                    title:'Harmonização facial',
                    image_url:'https://afetoodontologia.com.br/wp-content/uploads/2019/10/harmoniza%C3%A7%C3%A3o-site-768x536.png',
                    subtitle:'Novo conceito da estética facial e rejunevescimento',
                    default_action: {
                        type: 'web_url',
                        url: 'https://afetoodontologia.com.br/harmonizacao-facial/',
                    },
                    buttons: [{
                        type: 'postback',
                        title: 'Agendar consulta',
                        payload: 'Agendar consulta',
                    }]      
                },
            ];
            send.sendGenericMessage(sender, elements);
        }, 1000);
    },
    'talk.human': (sender) => {
        send.sendTypingOn(sender);
        facebookAPI.sendPassThread(sender);
    },
    'input.unknown': (sender, messages) => {
        send.sendTypingOn(sender);
        handleMessages(messages, sender);
        setTimeout(function() {
            let text = 'Opps, talvez eu não tenha aprendido o suficiente. 😔 \n\nPodemos tentar de novo, ou se preferir falar com um dos nossos humanos disponíveis. 💜';
            let replies = [
                {
                    'content_type': 'text',
                    'title': 'Falar com humano',
                    'payload': 'Falar com humano'
                }
            ];
            send.sendQuickReply(sender, text, replies);
        }, 1000);
    },
    'default': (sender, messages) => {
        send.sendTypingOn(sender);
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
        utils.setSessionandUser(senderID);
        dialogflowAPI.sendTextToDialogFlow(senderID, payload);
    },
    'view_site': (senderID, payload) => {
        send.sendTextMessage(senderID, payload);
    },
    'default': (senderID, payload) => {
        send.sendTextMessage(senderID, payload);
    }
};
const receivedPostback = event => {
    var senderID = event.sender.id;
    var recipientID = event.recipient.id;
    var timeOfPostback = event.timestamp;

    var payload = event.postback.payload;

    console.log(
        '⚡️ [BOT CONSILIO] Received postback for user %d and page %d with payload \'%s\' ' +
      'at %d',
        senderID,
        recipientID,
        payload,
        timeOfPostback
    );

    return (receivedPbObj[payload] || receivedPbObj['default'])(senderID, payload);
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
