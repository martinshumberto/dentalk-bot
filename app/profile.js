import config from '../config/variables';
import facebookAPI from '../services/facebook.service';

export default {

    setWebhook() {
        facebookAPI.callSubscriptionsAPI();
        facebookAPI.callSubscribedApps();
    },

    setPageFeedWebhook() {
        facebookAPI.callSubscriptionsAPI('feed');
        facebookAPI.callSubscribedApps('feed');
    },

    setThread() {
        let profilePayload = {
            ...this.getGetStarted(),
            ...this.getGreeting(),
            ...this.getPersistentMenu()
        };

        facebookAPI.callMessengerProfileAPI(profilePayload);
    },

    getGetStarted() {
        return {
            get_started: {
                payload: 'GET_STARTED'
            }
        };
    },

    getGreeting() {
        let greetings = [];
        greetings.push(this.getGreetingText());

        return {
            greeting: greetings
        };
    },

    getPersistentMenu() {
        let menuItems = [];

        menuItems.push(this.getMenuItems());

        return {
            persistent_menu: menuItems
        };
    },

    getGreetingText() {
        let localizedGreeting = {
            locale: 'default',
            text:
        `Oi {{user_first_name}}! Clique em COMEÇAR para saber como nós da ${config.NAME_COMPANY} podemos te ajudar hoje!👇`
        };

        return localizedGreeting;
    },

    getMenuItems() {
        let localizedMenu = {
            locale: 'default',
            composer_input_disabled: false,
            call_to_actions: [
                {
                    title: 'Atendimento',
                    type: 'nested',
                    call_to_actions: [
                        {
                            title: 'Menu 1',
                            type: 'postback',
                            payload: 'Lorem ipsum'
                        },
                    ]
                },
                {
                    title: 'E-book gratuito',
                    type: 'postback',
                    payload: 'CARE_HELP'
                },
                {
                    type: 'web_url',
                    title: 'Acessar site',
                    url: config.SITE_URL,
                    webview_height_ratio: 'full'
                }
            ]
        };
        return localizedMenu;
    },

    getWhitelistedDomains() {
        let whitelistedDomains = {
            whitelisted_domains: config.whitelistedDomains
        };

        return whitelistedDomains;
    },

    setGetStarted() {
        let getStartedPayload = this.getGetStarted();
        facebookAPI.callMessengerProfileAPI(getStartedPayload);
    },

    setGreeting() {
        let greetingPayload = this.getGreeting();
        facebookAPI.callMessengerProfileAPI(greetingPayload);
    },

    setPersistentMenu() {
        let menuPayload = this.getPersistentMenu();
        facebookAPI.callMessengerProfileAPI(menuPayload);
    },

    setWhitelistedDomains() {
        let domainPayload = this.getWhitelistedDomains();
        facebookAPI.callMessengerProfileAPI(domainPayload);
    }

};
