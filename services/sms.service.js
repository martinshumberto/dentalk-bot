const TextMessageService = require('comtele-sdk').TextMessageService;
import config from '../config/variables';

const textMessageService = new TextMessageService(config.SMS_API_KEY);

export default {
    textMessageService
};