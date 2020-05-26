/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dotenv */ "dotenv");
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! body-parser */ "body-parser");
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! cors */ "cors");
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _config_variables__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./config/variables */ "./config/variables.js");
/* harmony import */ var _config_mysql__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./config/mysql */ "./config/mysql.js");
/* harmony import */ var _routes_profile_route__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./routes/profile.route */ "./routes/profile.route.js");
/* harmony import */ var _routes_webhook_route__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./routes/webhook.route */ "./routes/webhook.route.js");

/*
 ** Import packages
 */











dotenv__WEBPACK_IMPORTED_MODULE_2___default.a.config();
var app = express__WEBPACK_IMPORTED_MODULE_3___default()();
app.use(body_parser__WEBPACK_IMPORTED_MODULE_4___default.a.json());
app.use(body_parser__WEBPACK_IMPORTED_MODULE_4___default.a.urlencoded({
  extended: true
}));
app.use(cors__WEBPACK_IMPORTED_MODULE_5___default()());
app.use(express__WEBPACK_IMPORTED_MODULE_3___default.a["static"](__dirname + '/static'));
_config_variables__WEBPACK_IMPORTED_MODULE_6__["default"].checkEnv();
/*
 ** Routes configuration
 */

Object(_routes_webhook_route__WEBPACK_IMPORTED_MODULE_9__["default"])(app);
Object(_routes_profile_route__WEBPACK_IMPORTED_MODULE_8__["default"])(app);
app.get('/leads', /*#__PURE__*/function () {
  var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(req, res) {
    var leads;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _config_mysql__WEBPACK_IMPORTED_MODULE_7__["default"].execQuery('SELECT * FROM leads');

          case 2:
            leads = _context.sent;
            res.status(200).send(leads);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
app.get('/events', /*#__PURE__*/function () {
  var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(req, res) {
    var events;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _config_mysql__WEBPACK_IMPORTED_MODULE_7__["default"].execQuery('SELECT * FROM calendar_events');

          case 2:
            events = _context2.sent;
            res.status(200).send(events);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
/*
 ** Middleware configuration
 */
// error handlers
// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
  app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
} // production error handler
// no stacktraces leaked to user


app.use(function (err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
app.listen(_config_variables__WEBPACK_IMPORTED_MODULE_6__["default"].PORT, function () {
  console.log('⚡️ [BOT CONSILIO] Express server is listening.');

  if (_config_variables__WEBPACK_IMPORTED_MODULE_6__["default"].APP_URL && _config_variables__WEBPACK_IMPORTED_MODULE_6__["default"].SITE_URL) {
    console.log('⚡️ [BOT CONSILIO] Make sure to set the both the Messenger profile ' + 'and webhook by visiting:\n⚡️ [BOT CONSILIO] ' + _config_variables__WEBPACK_IMPORTED_MODULE_6__["default"].APP_URL + '/profile?mode=all&verify_token=' + _config_variables__WEBPACK_IMPORTED_MODULE_6__["default"].FB_VERIFY_TOKEN);
  }

  if (_config_variables__WEBPACK_IMPORTED_MODULE_6__["default"].FB_PAGE_ID) {
    console.log('⚡️ [BOT CONSILIO] Test app by messaging:');
    console.log('⚡️ [BOT CONSILIO] https://m.me/' + _config_variables__WEBPACK_IMPORTED_MODULE_6__["default"].FB_PAGE_ID);
  }
});
/*
 ** Base view
 */

app.get('/', function (req, res) {
  res.send('⚡️[BOT CONSILIO] Hello world!');
});
/* WEBPACK VAR INJECTION */}.call(this, "/"))

/***/ }),

/***/ "./app/profile.js":
/*!************************!*\
  !*** ./app/profile.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "@babel/runtime/helpers/defineProperty");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _config_variables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config/variables */ "./config/variables.js");
/* harmony import */ var _services_facebook_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/facebook.service */ "./services/facebook.service.js");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }



/* harmony default export */ __webpack_exports__["default"] = ({
  setWebhook: function setWebhook() {
    _services_facebook_service__WEBPACK_IMPORTED_MODULE_2__["default"].callSubscriptionsAPI();
    _services_facebook_service__WEBPACK_IMPORTED_MODULE_2__["default"].callSubscribedApps();
  },
  setPageFeedWebhook: function setPageFeedWebhook() {
    _services_facebook_service__WEBPACK_IMPORTED_MODULE_2__["default"].callSubscriptionsAPI('feed');
    _services_facebook_service__WEBPACK_IMPORTED_MODULE_2__["default"].callSubscribedApps('feed');
  },
  setThread: function setThread() {
    var profilePayload = _objectSpread(_objectSpread(_objectSpread({}, this.getGetStarted()), this.getGreeting()), this.getPersistentMenu());

    _services_facebook_service__WEBPACK_IMPORTED_MODULE_2__["default"].callMessengerProfileAPI(profilePayload);
  },
  getGetStarted: function getGetStarted() {
    return {
      get_started: {
        payload: 'get_started'
      }
    };
  },
  getGreeting: function getGreeting() {
    var greetings = [];
    greetings.push(this.getGreetingText());
    return {
      greeting: greetings
    };
  },
  getPersistentMenu: function getPersistentMenu() {
    var menuItems = [];
    menuItems.push(this.getMenuItems());
    return {
      persistent_menu: menuItems
    };
  },
  getGreetingText: function getGreetingText() {
    var localizedGreeting = {
      locale: 'default',
      text: "Oi {{user_first_name}}! Clique em COME\xC7AR para saber como n\xF3s da ".concat(_config_variables__WEBPACK_IMPORTED_MODULE_1__["default"].NAME_COMPANY, " podemos te ajudar hoje!\uD83D\uDC47")
    };
    return localizedGreeting;
  },
  getMenuItems: function getMenuItems() {
    var localizedMenu = {
      locale: 'default',
      composer_input_disabled: false,
      call_to_actions: [{
        title: 'Atendimento',
        type: 'nested',
        call_to_actions: [{
          title: 'Menu 1',
          type: 'postback',
          payload: 'Lorem ipsum'
        }]
      }, {
        title: 'E-book gratuito',
        type: 'postback',
        payload: 'CARE_HELP'
      }, {
        type: 'web_url',
        title: 'Acessar site',
        url: _config_variables__WEBPACK_IMPORTED_MODULE_1__["default"].SITE_URL,
        webview_height_ratio: 'full'
      }]
    };
    return localizedMenu;
  },
  getWhitelistedDomains: function getWhitelistedDomains() {
    var whitelistedDomains = {
      whitelisted_domains: _config_variables__WEBPACK_IMPORTED_MODULE_1__["default"].whitelistedDomains
    };
    return whitelistedDomains;
  },
  setGetStarted: function setGetStarted() {
    var getStartedPayload = this.getGetStarted();
    _services_facebook_service__WEBPACK_IMPORTED_MODULE_2__["default"].callMessengerProfileAPI(getStartedPayload);
  },
  setGreeting: function setGreeting() {
    var greetingPayload = this.getGreeting();
    _services_facebook_service__WEBPACK_IMPORTED_MODULE_2__["default"].callMessengerProfileAPI(greetingPayload);
  },
  setPersistentMenu: function setPersistentMenu() {
    var menuPayload = this.getPersistentMenu();
    _services_facebook_service__WEBPACK_IMPORTED_MODULE_2__["default"].callMessengerProfileAPI(menuPayload);
  },
  setWhitelistedDomains: function setWhitelistedDomains() {
    var domainPayload = this.getWhitelistedDomains();
    _services_facebook_service__WEBPACK_IMPORTED_MODULE_2__["default"].callMessengerProfileAPI(domainPayload);
  }
});

/***/ }),

/***/ "./app/receive.js":
/*!************************!*\
  !*** ./app/receive.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "moment");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var pb_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! pb-util */ "pb-util");
/* harmony import */ var pb_util__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(pb_util__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _send__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./send */ "./app/send.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils */ "./utils/index.js");
/* harmony import */ var _config_mysql__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../config/mysql */ "./config/mysql.js");
/* harmony import */ var _services_dialogflow_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/dialogflow.service */ "./services/dialogflow.service.js");
/* harmony import */ var _services_facebook_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../services/facebook.service */ "./services/facebook.service.js");
/* harmony import */ var _services_calendar_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../services/calendar.service */ "./services/calendar.service.js");
/* harmony import */ var _models_calendar_model__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../models/calendar.model */ "./models/calendar.model.js");
/* harmony import */ var _models_user_model__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../models/user.model */ "./models/user.model.js");














/**
 * Process message type card
 * @param {Object} messages
 * @param {Number} sender
 */

var handleCardMessages = function handleCardMessages(messages, sender) {
  var elements = [];

  for (var m = 0; m < messages.length; m += 1) {
    var message = messages[m];
    var buttons = [];

    for (var b = 0; b < message.card.buttons.length; b += 1) {
      var isLink = message.card.buttons[b].postback.substring(0, 4) === 'http';
      var button = void 0;

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

    var element = {
      title: message.card.title,
      image_url: message.card.imageUri,
      subtitle: message.card.subtitle,
      buttons: buttons
    };
    elements.push(element);
  }

  _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendGenericMessage(sender, elements);
};
/**
 * Process messages
 * @param {Object} messages
 * @param {Number} sender
 */


var handleMessages = function handleMessages(messages, sender) {
  var timeoutInterval = 1100;
  var previousType;
  var cardTypes = [];
  var timeout = 0;

  for (var i = 0; i < messages.length; i += 1) {
    if (previousType == 'card' && (messages[i].message != 'card' || i == messages.length - 1)) {
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


var handleMsgObj = {
  'text': function text(message, sender) {
    message.text.text.forEach(function (text) {
      if (text !== '') {
        _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTextMessage(sender, text);
      }
    });
  },
  'quickReplies': function quickReplies(message, sender) {
    var replies = [];
    message.quickReplies.quickReplies.forEach(function (text) {
      var reply = {
        content_type: 'text',
        title: text,
        payload: text
      };
      replies.push(reply);
    });
    return _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendQuickReply(sender, message.quickReplies.title, replies);
  },
  'image': function image(message, sender) {
    _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendImageMessage(sender, message.image.imageUri);
  },
  'payload': function payload(message, sender) {
    var payload = pb_util__WEBPACK_IMPORTED_MODULE_3__["struct"].decode(message.payload);
    var verifyPerson = null;

    if (payload.facebook.payload) {
      verifyPerson = payload.facebook.person_true;
    }

    var messageData = {
      recipient: {
        id: sender
      },
      message: payload.facebook,
      verifyPerson: verifyPerson
    };
    _services_facebook_service__WEBPACK_IMPORTED_MODULE_8__["default"].sendCall(messageData, 0);
  }
};

var handleMessage = function handleMessage(message, sender) {
  handleMsgObj[message.message](message, sender);
};
/**
 * Process quick reply message
 * @param {*} senderID
 * @param {*} quickReply
 * @param {*} messageId
 */


var handleQuickReply = function handleQuickReply(senderID, quickReply, messageId) {
  var quickReplyPayload = quickReply.payload;
  console.log('⚡️ [BOT CONSILIO] Quick reply for message %s with payload %s', messageId, quickReplyPayload);
  _services_dialogflow_service__WEBPACK_IMPORTED_MODULE_7__["default"].sendTextToDialogFlow(senderID, quickReplyPayload);
};
/**
 * Process attachments
 * @param {*} messageAttachments
 * @param {Number} senderID
 */


var handleMessageAttachments = function handleMessageAttachments(messageAttachments, senderID) {
  _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTextMessage(senderID, 'Recebi o anexo. Muito obrigado.');
};
/**
 * Process Dialogflow response
 * @param {Number} sender
 * @param {Object} response
 */


var handleDialogFlowResponse = function handleDialogFlowResponse(sender, response) {
  var responseText = response.fulfillmentMessages.fulfillmentText;
  var messages = response.fulfillmentMessages;
  var action = response.action;
  var contexts = response.outputContexts;
  var parameters = response.parameters;
  var delay = 1000;

  if (_utils__WEBPACK_IMPORTED_MODULE_5__["default"].isDefined(action)) {
    _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTypingOn(sender);
    setTimeout(function () {
      _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTypingOff(sender);
      handleDialogFlowAction(sender, action, messages, contexts, parameters);
    }, delay);
  } else if (_utils__WEBPACK_IMPORTED_MODULE_5__["default"].isDefined(messages) && (messages.length == 1 && messages[0].type != 0 || messages.length > 1)) {
    _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTypingOn(sender);
    setTimeout(function () {
      _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTypingOff(sender);
      handleMessages(messages, sender);
    }, delay);
  } else if (responseText == '' && !_utils__WEBPACK_IMPORTED_MODULE_5__["default"].isDefined(action)) {
    return false;
  } else if (_utils__WEBPACK_IMPORTED_MODULE_5__["default"].isDefined(responseText)) {
    _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTypingOn(sender);
    setTimeout(function () {
      _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTypingOff(sender);
      _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTextMessage(sender, responseText);
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


var handleDFAObj = {
  'input.welcome': function () {
    var _inputWelcome = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(sender, messages, contexts, parameters) {
      var user, userDB, welcome, about, copy, getPhone, getEmail, onboarding, restart, _ref, phone, email, missingSlots;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              user = _utils__WEBPACK_IMPORTED_MODULE_5__["default"].usersMap.get(sender);
              _context.next = 3;
              return _config_mysql__WEBPACK_IMPORTED_MODULE_6__["default"].execQuery("SELECT * FROM leads WHERE senderID= '".concat(sender, "'"))["catch"](function (err) {
                console.log('❌ ERRO: ', err);
              });

            case 3:
              userDB = _context.sent;

              welcome = function welcome() {
                return new Promise(function (resolve) {
                  _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTypingOn(sender);
                  setTimeout(function () {
                    resolve(_send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTextMessage(sender, "Oi ".concat(user.first_name, "! \uD83D\uDC4B")));
                  }, 1000);
                });
              };

              about = function about() {
                return new Promise(function (resolve) {
                  _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTypingOn(sender);
                  setTimeout(function () {
                    resolve(_send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTextMessage(sender, 'Sou a Lary, a atendente virtual 🤖 da Clínica Dentalk!'));
                  }, 1000);
                });
              };

              copy = function copy() {
                return new Promise(function (resolve) {
                  _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTypingOn(sender);
                  setTimeout(function () {
                    resolve(_send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTextMessage(sender, 'Aqui acreditamos que sorrisos renovados transformam vidas!'));
                  }, 1000);
                });
              };

              getPhone = function getPhone() {
                return new Promise(function (resolve) {
                  _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTypingOn(sender);
                  setTimeout(function () {
                    var replies = [{
                      'content_type': 'user_phone_number',
                      'title': 'user_phone_number',
                      'payload': 'user_phone_number'
                    }];
                    var text = 'Me confirme seu número de telefone:';
                    resolve(_send__WEBPACK_IMPORTED_MODULE_4__["default"].sendQuickReply(sender, text, replies));
                  }, 1000);
                });
              };

              getEmail = function getEmail() {
                return new Promise(function (resolve) {
                  _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTypingOn(sender);
                  setTimeout(function () {
                    var replies = [{
                      'content_type': 'user_email',
                      'title': 'user_email',
                      'payload': 'user_email'
                    }];
                    var text = 'Ok! Antes de começarmos me confirme também seu e-mail:';
                    resolve(_send__WEBPACK_IMPORTED_MODULE_4__["default"].sendQuickReply(sender, text, replies));
                  }, 1000);
                });
              };

              onboarding = function onboarding(first) {
                return new Promise(function (resolve) {
                  _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTypingOn(sender);
                  setTimeout(function () {
                    var replies = [{
                      'content_type': 'text',
                      'title': 'Agendar avaliação',
                      'payload': 'Agendar avaliação'
                    }, {
                      'content_type': 'text',
                      'title': 'Verificar avaliação',
                      'payload': 'Verificar avaliação'
                    }, {
                      'content_type': 'text',
                      'title': 'Cancelar avaliação',
                      'payload': 'Cancelar avaliação'
                    }, {
                      'content_type': 'text',
                      'title': 'Conhecer a clínica',
                      'payload': 'Conhecer a clínica'
                    }, {
                      'content_type': 'text',
                      'title': 'Tratamentos',
                      'payload': 'Tratamentos'
                    }];

                    if (first) {
                      var text = 'Vamos começar o seu atendimento, selecione um dos botões abaixo. 👇';
                      resolve(_send__WEBPACK_IMPORTED_MODULE_4__["default"].sendQuickReply(sender, text, replies));
                    } else {
                      var _text = 'Que bom te ver por aqui novamente. No que posso te ajudar hoje?';
                      resolve(_send__WEBPACK_IMPORTED_MODULE_4__["default"].sendQuickReply(sender, _text, replies));
                    }
                  }, 1000);
                });
              };

              restart = function restart() {
                return new Promise(function (resolve) {
                  _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTypingOn(sender);
                  setTimeout(function () {
                    var replies = [{
                      'content_type': 'text',
                      'title': 'Agendar avaliação',
                      'payload': 'Agendar avaliação'
                    }, {
                      'content_type': 'text',
                      'title': 'Verificar avaliação',
                      'payload': 'Verificar avaliação'
                    }, {
                      'content_type': 'text',
                      'title': 'Cancelar avaliação',
                      'payload': 'Cancelar avaliação'
                    }, {
                      'content_type': 'text',
                      'title': 'Conhecer a clínica',
                      'payload': 'Conhecer a clínica'
                    }, {
                      'content_type': 'text',
                      'title': 'Tratamentos',
                      'payload': 'Tratamentos'
                    }];
                    var text = 'Quer falar sobre outro assunto? 🤓 \nTenho algumas sugestões aqui para você:';
                    resolve(_send__WEBPACK_IMPORTED_MODULE_4__["default"].sendQuickReply(sender, text, replies));
                  }, 1000);
                });
              };

              if (!(userDB && userDB.phone && userDB.email)) {
                _context.next = 15;
                break;
              }

              welcome().then(function () {
                return setTimeout(function () {
                  _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTypingOn(sender);
                  onboarding();
                }, 1000);
              });
              _context.next = 34;
              break;

            case 15:
              _ref = [parameters.fields.phone.stringValue, parameters.fields.email.stringValue], phone = _ref[0], email = _ref[1];
              missingSlots = [];

              if (!phone) {
                missingSlots.push('telefone');
              }

              if (!email) {
                missingSlots.push('e-mail');
              }

              if (!(missingSlots.length === 1)) {
                _context.next = 28;
                break;
              }

              if (!(!phone && email)) {
                _context.next = 24;
                break;
              }

              return _context.abrupt("return", getPhone());

            case 24:
              if (!(!email && phone)) {
                _context.next = 26;
                break;
              }

              return _context.abrupt("return", getEmail());

            case 26:
              _context.next = 34;
              break;

            case 28:
              if (!(missingSlots.length === 2)) {
                _context.next = 32;
                break;
              }

              welcome().then(function () {
                return about();
              }).then(function () {
                return copy();
              }).then(function () {
                return getPhone();
              });
              _context.next = 34;
              break;

            case 32:
              if (phone && email) {
                _config_mysql__WEBPACK_IMPORTED_MODULE_6__["default"].execQuery("UPDATE leads SET phone = '".concat(phone, "' WHERE senderID = '").concat(sender, "'"))["catch"](function (err) {
                  console.log('❌ ERRO: ', err);
                });
                _config_mysql__WEBPACK_IMPORTED_MODULE_6__["default"].execQuery("UPDATE leads SET email = '".concat(email, "' WHERE senderID = '").concat(sender, "'"))["catch"](function (err) {
                  console.log('❌ ERRO: ', err);
                });
              }

              return _context.abrupt("return", setTimeout(function () {
                _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTypingOn(sender);
                onboarding(true);
              }, 1000));

            case 34:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function inputWelcome(_x, _x2, _x3, _x4) {
      return _inputWelcome.apply(this, arguments);
    }

    return inputWelcome;
  }(),
  'input.schedule': function () {
    var _inputSchedule = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(sender, messages, contexts, parameters) {
      var userDB, event, text, _ref2, date, time, missingSlots, dateTimeStart, today, _dateTimeStart, dateTimeEnd, _date, _time, _dateTimeStart2, _dateTimeEnd, appointmentTimeString;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _models_user_model__WEBPACK_IMPORTED_MODULE_11__["default"].getUserDB(sender);

            case 2:
              userDB = _context3.sent;
              _context3.next = 5;
              return _models_calendar_model__WEBPACK_IMPORTED_MODULE_10__["default"].getEvent(sender);

            case 5:
              event = _context3.sent;
              _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTypingOn(sender);

              if (event && event.status == 'confirmed') {
                text = "Voc\xEA j\xE1 tem uma avalia\xE7\xE3o marcada \uD83D\uDCC6 ".concat(moment__WEBPACK_IMPORTED_MODULE_2___default()(event.start).locale('pt-br').format('LLLL'), ".");
                _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTextMessage(sender, text);
                setTimeout(function () {
                  var text = 'Deseja reagendar? 👇';
                  var replies = [{
                    'content_type': 'text',
                    'title': 'Reagendar agora',
                    'payload': 'Reagendar agora'
                  }];
                  _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendQuickReply(sender, text, replies);
                }, 1000);
              } else {
                _ref2 = [parameters.fields.date.stringValue, parameters.fields.time.stringValue], date = _ref2[0], time = _ref2[1];
                missingSlots = [];

                if (!date) {
                  missingSlots.push('data');
                }

                if (!time) {
                  missingSlots.push('horário');
                }

                if (missingSlots.length === 1) {
                  dateTimeStart = new Date(Date.parse(date.split('T')[0] + 'T' + date.split('T')[1].split('-')[0] + '-03:00'));
                  _services_calendar_service__WEBPACK_IMPORTED_MODULE_9__["default"].slotsFromEvents(dateTimeStart).then(function (resTime) {
                    var replies = [];
                    resTime.forEach(function (time) {
                      var hour = moment__WEBPACK_IMPORTED_MODULE_2___default()(time).format('HH:mm');
                      replies.push({
                        'content_type': 'text',
                        'title': hour,
                        'payload': hour
                      });
                    });
                    var text = 'Agora, selecione o melhor horário dentre os disponíveis para a sua avaliação:';
                    _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendQuickReply(sender, text, replies);
                  });
                } else if (missingSlots.length === 2) {
                  today = moment__WEBPACK_IMPORTED_MODULE_2___default()().format();
                  _dateTimeStart = new Date(Date.parse(today.split('T')[0] + 'T' + today.split('T')[1].split('-')[0] + '-03:00'));
                  dateTimeEnd = new Date(moment__WEBPACK_IMPORTED_MODULE_2___default()(_dateTimeStart).add(7, 'days'));
                  _services_calendar_service__WEBPACK_IMPORTED_MODULE_9__["default"].daysFromSlots(_dateTimeStart, dateTimeEnd).then(function (resTime) {
                    var days = [];
                    var daysRefine = [];
                    resTime.forEach(function (time) {
                      moment__WEBPACK_IMPORTED_MODULE_2___default.a.locale('pt-BR');
                      var day = moment__WEBPACK_IMPORTED_MODULE_2___default()(time.startDate).format('DD');
                      var month = moment__WEBPACK_IMPORTED_MODULE_2___default()(time.startDate).format('MM');
                      var weekDay = moment__WEBPACK_IMPORTED_MODULE_2___default()(time.startDate).format('dddd');
                      days.push({
                        day: day,
                        month: month,
                        weekDay: weekDay
                      });
                      daysRefine = days.filter(function (a) {
                        return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
                      }, Object.create(null));
                    });
                    var replies = [];
                    daysRefine.forEach(function (day) {
                      replies.push({
                        'content_type': 'text',
                        'title': "".concat(day.weekDay.substring(0, 3), " - ").concat(day.day, "/").concat(day.month),
                        'payload': "".concat(day.weekDay.substring(0, 3), " - ").concat(day.day, "/").concat(day.month)
                      });
                    });
                    var text = 'Que dia fica bom para você fazer sua avaliação?';
                    _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendQuickReply(sender, text, replies);
                  });
                } else {
                  handleMessages(messages, sender);
                  _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTypingOn(sender);

                  if (parameters.fields.date.stringValue && parameters.fields.time.stringValue) {
                    _date = parameters.fields.date.stringValue;
                    _time = parameters.fields.time.stringValue;
                    _dateTimeStart2 = new Date(Date.parse(_date.split('T')[0] + 'T' + _time.split('T')[1].split('-')[0] + '-03:00'));
                    _dateTimeEnd = new Date(new Date(_dateTimeStart2).setHours(_dateTimeStart2.getHours() + 1));
                    appointmentTimeString = moment__WEBPACK_IMPORTED_MODULE_2___default()(_dateTimeStart2).locale('pt-br').format('LLLL');
                    _services_calendar_service__WEBPACK_IMPORTED_MODULE_9__["default"].createCalendarEvent(_dateTimeStart2, _dateTimeEnd, userDB).then( /*#__PURE__*/function () {
                      var _ref3 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(res) {
                        var event, eventID;
                        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
                          while (1) {
                            switch (_context2.prev = _context2.next) {
                              case 0:
                                event = res.data;
                                _context2.next = 3;
                                return _utils__WEBPACK_IMPORTED_MODULE_5__["default"].getEventID(event);

                              case 3:
                                eventID = _context2.sent;
                                _config_mysql__WEBPACK_IMPORTED_MODULE_6__["default"].execQuery("INSERT INTO calendar_events (eventID, senderID, status, link, summary, description, start, end) VALUES ('".concat(eventID, "', '").concat(sender, "', '").concat(event.status, "', '").concat(event.htmlLink, "', '").concat(event.summary, "', '").concat(event.description, "', '").concat(moment__WEBPACK_IMPORTED_MODULE_2___default()(event.start.dateTime).format('YYYY-MM-DD HH:mm:ss'), "', '").concat(moment__WEBPACK_IMPORTED_MODULE_2___default()(event.end.dateTime).format('YYYY-MM-DD HH:mm:ss'), "')"))["catch"](function (err) {
                                  console.log('❌ ERRO: ', err);
                                });
                                _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTypingOn(sender);
                                setTimeout(function () {
                                  var text = "Tudo certo ".concat(userDB.first_name, "! Agendei aqui para voc\xEA. \uD83D\uDCDD \nTe aguardamos aqui \uD83D\uDCC6 ").concat(appointmentTimeString, ".");
                                  _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTextMessage(sender, text);
                                }, 1000);
                                setTimeout(function () {
                                  var buttons = [{
                                    type: 'web_url',
                                    url: 'http://bit.ly/humbertoconsilio',
                                    title: 'Chamar no WhatsApp'
                                  }, {
                                    type: 'phone_number',
                                    title: 'Ligar agora',
                                    payload: '+5562983465454'
                                  }, {
                                    type: 'postback',
                                    title: 'Falar com humano',
                                    payload: 'Falar com humano'
                                  }];
                                  _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendButtonMessage(sender, 'Caso tenha ficado alguma dúvida, fique à vontade de conversar com a gente!', buttons);
                                }, 4000);

                              case 8:
                              case "end":
                                return _context2.stop();
                            }
                          }
                        }, _callee2);
                      }));

                      return function (_x9) {
                        return _ref3.apply(this, arguments);
                      };
                    }())["catch"](function (erro) {
                      console.log('ERRO', erro);
                      var text = "Opps o hor\xE1rio ".concat(appointmentTimeString, ", n\xE3o est\xE1 dispon\xEDvel. Vamos tentar outro?");
                      _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTextMessage(sender, text);
                    });
                  }
                }
              }

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function inputSchedule(_x5, _x6, _x7, _x8) {
      return _inputSchedule.apply(this, arguments);
    }

    return inputSchedule;
  }(),
  'input.schedule.verify': function () {
    var _inputScheduleVerify = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(sender) {
      var event, text, _text2;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTypingOn(sender);
              _context4.next = 3;
              return _models_calendar_model__WEBPACK_IMPORTED_MODULE_10__["default"].getEvent(sender);

            case 3:
              event = _context4.sent;

              if (event && event.status == 'confirmed') {
                text = "Encontrei! Sou r\xE1pida, n\xE3o \xE9 mesmo? \uD83D\uDE0F \nExiste um agendamento para \uD83D\uDCC6 ".concat(moment__WEBPACK_IMPORTED_MODULE_2___default()(event.start).locale('pt-br').format('LLLL'), ".");
                _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTextMessage(sender, text);
                setTimeout(function () {
                  var text = 'Deseja reagendar ou cancelar? 👇';
                  var replies = [{
                    'content_type': 'text',
                    'title': 'Reagendar agora',
                    'payload': 'Reagendar agora'
                  }, {
                    'content_type': 'text',
                    'title': 'Cancelar agora',
                    'payload': 'Cancelar agora'
                  }];
                  _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendQuickReply(sender, text, replies);
                }, 1000);
              } else {
                _text2 = 'Infelizmente não encontrei o seu agendamento. 😰';
                _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTextMessage(sender, _text2);
                setTimeout(function () {
                  var text = 'Mas, calma. Você pode agendar a sua avaliação agora! 😄 \n\nSelecione para agendar. 👇';
                  var replies = [{
                    'content_type': 'text',
                    'title': 'Agendar agora',
                    'payload': 'Agendar agora'
                  }];
                  _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendQuickReply(sender, text, replies);
                }, 1000);
              }

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function inputScheduleVerify(_x10) {
      return _inputScheduleVerify.apply(this, arguments);
    }

    return inputScheduleVerify;
  }(),
  'input.schedule.update': function () {
    var _inputScheduleUpdate = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee5(sender) {
      var event, text, _text3;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTypingOn(sender);
              _context5.next = 3;
              return _models_calendar_model__WEBPACK_IMPORTED_MODULE_10__["default"].getEvent(sender);

            case 3:
              event = _context5.sent;

              if (event && event.status == 'confirmed') {
                text = "\xD3timo! Estava marcado dia \uD83D\uDCC6 ".concat(moment__WEBPACK_IMPORTED_MODULE_2___default()(event.start).locale('pt-br').format('LLLL'), ".");
                _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTextMessage(sender, text);
                setTimeout(function () {
                  var text = 'Posso continuar o reagedamento? 👇';
                  var replies = [{
                    'content_type': 'text',
                    'title': 'Sim',
                    'payload': 'Sim'
                  }, {
                    'content_type': 'text',
                    'title': 'Não',
                    'payload': 'Não'
                  }];
                  _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendQuickReply(sender, text, replies);
                }, 1000);
              } else {
                _text3 = 'Infelizmente não encontrei o seu agendamento. 😰';
                _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTextMessage(sender, _text3);
                setTimeout(function () {
                  var text = 'Mas, calma. Você pode agendar a sua avaliação agora! 😄 \n\nSelecione para agendar. 👇';
                  var replies = [{
                    'content_type': 'text',
                    'title': 'Agendar agora',
                    'payload': 'Agendar agora'
                  }];
                  _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendQuickReply(sender, text, replies);
                }, 1000);
              }

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    function inputScheduleUpdate(_x11) {
      return _inputScheduleUpdate.apply(this, arguments);
    }

    return inputScheduleUpdate;
  }(),
  'input.schedule.update-yes': function () {
    var _inputScheduleUpdateYes = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee6(sender, messages, contexts, parameters) {
      var userDB, event, date, time, dateTimeStart, dateTimeEnd, appointmentTimeString;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return _models_user_model__WEBPACK_IMPORTED_MODULE_11__["default"].getUserDB(sender);

            case 2:
              userDB = _context6.sent;
              _context6.next = 5;
              return _models_calendar_model__WEBPACK_IMPORTED_MODULE_10__["default"].getEvent(sender);

            case 5:
              event = _context6.sent;
              _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTypingOn(sender);
              handleMessages(messages, sender);

              if (parameters.fields.date.stringValue && parameters.fields.time.stringValue) {
                date = parameters.fields.date.stringValue;
                time = parameters.fields.time.stringValue;
                dateTimeStart = new Date(Date.parse(date.split('T')[0] + 'T' + time.split('T')[1].split('-')[0] + '-03:00'));
                dateTimeEnd = new Date(new Date(dateTimeStart).setHours(dateTimeStart.getHours() + 1));
                appointmentTimeString = moment__WEBPACK_IMPORTED_MODULE_2___default()(dateTimeStart).locale('pt-br').format('LLLL');
                _services_calendar_service__WEBPACK_IMPORTED_MODULE_9__["default"].updateCalendarEvent(dateTimeStart, dateTimeEnd, event.eventID).then(function (res) {
                  var event = res.data;
                  _config_mysql__WEBPACK_IMPORTED_MODULE_6__["default"].execQuery("UPDATE calendar_events SET start = '".concat(moment__WEBPACK_IMPORTED_MODULE_2___default()(event.start.dateTime).format('YYYY-MM-DD HH:mm:ss'), "', end = '").concat(moment__WEBPACK_IMPORTED_MODULE_2___default()(event.end.dateTime).format('YYYY-MM-DD HH:mm:ss'), "' WHERE senderID='").concat(sender, "'"))["catch"](function (err) {
                    console.log('❌ ERRO: ', err);
                  });
                  setTimeout(function () {
                    var text = "".concat(userDB.first_name, ", reagendei aqui! \u270C \nTe aguardamos aqui \uD83D\uDCC6 ").concat(appointmentTimeString, ".");
                    _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTextMessage(sender, text);
                  }, 1000);
                  setTimeout(function () {
                    var buttons = [{
                      type: 'web_url',
                      url: 'http://bit.ly/humbertoconsilio',
                      title: 'Chamar no WhatsApp'
                    }, {
                      type: 'phone_number',
                      title: 'Ligar agora',
                      payload: '+5562983465454'
                    }, {
                      type: 'postback',
                      title: 'Falar com humano',
                      payload: 'Falar com humano'
                    }];
                    _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendButtonMessage(sender, 'Caso tenha ficado alguma dúvida, fique à vontade de conversar com a gente!', buttons);
                  }, 4000);
                })["catch"](function (erro) {
                  console.log('ERRO', erro);
                  var text = "Opps o hor\xE1rio ".concat(appointmentTimeString, ", n\xE3o est\xE1 dispon\xEDvel. Vamos tentar outro?");
                  _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTextMessage(sender, text);
                });
              }

            case 9:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    function inputScheduleUpdateYes(_x12, _x13, _x14, _x15) {
      return _inputScheduleUpdateYes.apply(this, arguments);
    }

    return inputScheduleUpdateYes;
  }(),
  'input.schedule.cancel': function () {
    var _inputScheduleCancel = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee7(sender) {
      var event, text, _text4;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTypingOn(sender);
              _context7.next = 3;
              return _models_calendar_model__WEBPACK_IMPORTED_MODULE_10__["default"].getEvent(sender);

            case 3:
              event = _context7.sent;

              if (event && event.status == 'confirmed') {
                text = 'Que pena! 😢 \nA avaliação é o primeiro passo para a transformação do seu sorriso ou dar aquele up! na autoestima.';
                _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTextMessage(sender, text);
                setTimeout(function () {
                  var text = 'Deseja mesmo cancelar a sua avaliação? Lembre-se que você pode reagendar. 👇';
                  var replies = [{
                    'content_type': 'text',
                    'title': 'Sim',
                    'payload': 'Sim'
                  }, {
                    'content_type': 'text',
                    'title': 'Não',
                    'payload': 'Não'
                  }];
                  _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendQuickReply(sender, text, replies);
                }, 1000);
              } else {
                _text4 = 'Não encontrei o seu agendamento 🤔';
                _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTextMessage(sender, _text4);
                setTimeout(function () {
                  var text = 'Caso você queira ver sobre outro assunto. \n\nÉ só selecionar o botão 👇';
                  var replies = [{
                    'content_type': 'text',
                    'title': 'Agendar avaliação',
                    'payload': 'Agendar avaliação'
                  }, {
                    'content_type': 'text',
                    'title': 'Tratamentos',
                    'payload': 'Tratamentos'
                  }, {
                    'content_type': 'text',
                    'title': 'Horário de funcionamento',
                    'payload': 'Horário de funcionamento'
                  }];
                  _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendQuickReply(sender, text, replies);
                }, 2000);
              }

            case 5:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    function inputScheduleCancel(_x16) {
      return _inputScheduleCancel.apply(this, arguments);
    }

    return inputScheduleCancel;
  }(),
  'input.schedule.cancel-yes': function () {
    var _inputScheduleCancelYes = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee9(sender) {
      var userDB, event;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTypingOn(sender);
              _context9.next = 3;
              return _models_user_model__WEBPACK_IMPORTED_MODULE_11__["default"].getUserDB(sender);

            case 3:
              userDB = _context9.sent;
              _context9.next = 6;
              return _models_calendar_model__WEBPACK_IMPORTED_MODULE_10__["default"].getEvent(sender);

            case 6:
              event = _context9.sent;
              console.log(event);
              _context9.next = 10;
              return _services_calendar_service__WEBPACK_IMPORTED_MODULE_9__["default"].deleteCalendarEvent(event.eventID).then( /*#__PURE__*/_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee8() {
                return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee8$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTypingOn(sender);
                        _context8.next = 3;
                        return _models_calendar_model__WEBPACK_IMPORTED_MODULE_10__["default"].cancelEvent(sender);

                      case 3:
                        setTimeout(function () {
                          var text = "".concat(userDB.first_name, ", tudo pronto! \nCancelei sua avalia\xE7\xE3o.");
                          _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTextMessage(sender, text);
                        }, 1000);
                        setTimeout(function () {
                          var text = 'Caso você queira ver sobre outro assunto. \n\nÉ só selecionar o botão 👇';
                          var replies = [{
                            'content_type': 'text',
                            'title': 'Agendar avaliação',
                            'payload': 'Agendar avaliação'
                          }, {
                            'content_type': 'text',
                            'title': 'Tratamentos',
                            'payload': 'Tratamentos'
                          }, {
                            'content_type': 'text',
                            'title': 'Horário de funcionamento',
                            'payload': 'Horário de funcionamento'
                          }];
                          _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendQuickReply(sender, text, replies);
                        }, 2000);

                      case 5:
                      case "end":
                        return _context8.stop();
                    }
                  }
                }, _callee8);
              })))["catch"](function (erro) {
                console.log('ERRO', erro);
                var text = 'Ops, não consegui acessar a agenda agora, tente novamente mais tarde. 😓 ';
                _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTextMessage(sender, text);
              });

            case 10:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }));

    function inputScheduleCancelYes(_x17) {
      return _inputScheduleCancelYes.apply(this, arguments);
    }

    return inputScheduleCancelYes;
  }(),
  'input.institutional': function () {
    var _inputInstitutional = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee10(sender) {
      var event;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTypingOn(sender);
              _context10.next = 3;
              return _models_calendar_model__WEBPACK_IMPORTED_MODULE_10__["default"].getEvent(sender);

            case 3:
              event = _context10.sent;
              setTimeout(function () {
                var text = 'Ficamos felizes de você querer nos conhecer melhor! 💗 \n\nVamos aqui conta um pouco sobre a nossa clínica. Nossa Clínica foi fundada nos mais sólidos princípios éticos e profissionais. Possuímos uma equipe de profissionais especializada e pronta para oferecer o que há de mais avançado em tratamentos odontológicos e estética facial.';
                _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTextMessage(sender, text);
              }, 1000);

              if (event && event.status == 'confirmed') {
                setTimeout(function () {
                  var text = 'É meio complicado demonstrarmos tudo o que somos capazes por aqui.\nMas, a sua consulta de avaliação já está chegando e logo você nos conhecerá melhor. 😍 \n\nCaso tenha ficado alguma dúvida, fique à vontade de conversar com a gente no WhatsApp!';
                  _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTextMessage(sender, text);
                }, 2000);
                setTimeout(function () {
                  var buttons = [{
                    type: 'web_url',
                    url: 'http://bit.ly/humbertoconsilio',
                    title: 'Chamar no WhatsApp'
                  }];
                  _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendButtonMessage(sender, 'Caso tenha ficado alguma dúvida, fique à vontade de conversar com a gente!', buttons);
                }, 2000);
              } else {
                _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTypingOn(sender);
                setTimeout(function () {
                  var text = 'É complicado demonstrarmos tudo o que somos capazes por aqui.';
                  _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTextMessage(sender, text);
                }, 2000);
                setTimeout(function () {
                  var text = 'Agende uma avaliação, será um prazer te receber 😍';
                  var replies = [{
                    'content_type': 'text',
                    'title': 'Agendar agora',
                    'payload': 'Agendar agora'
                  }];
                  _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendQuickReply(sender, text, replies);
                }, 2000);
              }

            case 6:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }));

    function inputInstitutional(_x18) {
      return _inputInstitutional.apply(this, arguments);
    }

    return inputInstitutional;
  }(),
  'input.treatments': function inputTreatments(sender) {
    _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTypingOn(sender);
    setTimeout(function () {
      var text = 'Entendi! Veja alguns tratamentos/procedimentos que realizamos aqui na clínica e saiba mais sobre cada um deles. É só escolher 😉';
      _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTextMessage(sender, text);
    }, 1000);
    setTimeout(function () {
      var elements = [{
        title: 'Invisalign',
        image_url: 'https://afetoodontologia.com.br/wp-content/uploads/2019/10/shutterstock-1006765645.png',
        subtitle: 'O Invisalign são “alinhadores invisíveis”. Alternativa para quem não quer usar os aparelhos tradicionais',
        default_action: {
          type: 'web_url',
          url: 'https://consilio.com.br/'
        },
        buttons: [{
          type: 'postback',
          title: 'Agendar consulta',
          payload: 'SCHEDULE_APPOINTMENT'
        }]
      }, {
        title: 'Harmonização facial',
        image_url: 'https://afetoodontologia.com.br/wp-content/uploads/2019/10/harmoniza%C3%A7%C3%A3o-site-768x536.png',
        subtitle: 'Novo conceito da estética facial e rejunevescimento que integra a naturalidade à beleza da face',
        default_action: {
          type: 'web_url',
          url: 'https://consilio.com.br/'
        },
        buttons: [{
          type: 'postback',
          title: 'Agendar consulta',
          payload: 'SCHEDULE_APPOINTMENT'
        }]
      }, {
        title: 'Ortodontia',
        image_url: 'https://afetoodontologia.com.br/wp-content/uploads/2019/09/ortodontia.jpg',
        subtitle: 'Dentes alinhados não ajudam apenas o seu sorriso, mas também a saúde do seu organismo',
        default_action: {
          type: 'web_url',
          url: 'https://consilio.com.br/'
        },
        buttons: [{
          type: 'postback',
          title: 'Agendar consulta',
          payload: 'SCHEDULE_APPOINTMENT'
        }]
      }, {
        title: 'Implantes Dentários',
        image_url: 'https://afetoodontologia.com.br/wp-content/uploads/2020/04/implantes-dentarios-afeto.jpg',
        subtitle: 'O tratamento por meio do Implante trata-se de um pino inserido no maxilar ou mandíbula através de uma cirurgia. ',
        default_action: {
          type: 'web_url',
          url: 'https://consilio.com.br/'
        },
        buttons: [{
          type: 'postback',
          title: 'Agendar consulta',
          payload: 'SCHEDULE_APPOINTMENT'
        }]
      }, {
        title: 'Lentes de Contato',
        image_url: 'https://afetoodontologia.com.br/wp-content/uploads/2020/03/image.png',
        subtitle: 'As Lentes de Contato Dentais são trabalhos estéticos que encobrem a frente do dente.',
        default_action: {
          type: 'web_url',
          url: 'https://consilio.com.br/'
        },
        buttons: [{
          type: 'postback',
          title: 'Agendar consulta',
          payload: 'SCHEDULE_APPOINTMENT'
        }]
      }];
      _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendGenericMessage(sender, elements);
    }, 2000);
  },
  'input.values': function inputValues(sender) {
    _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTypingOn(sender);
    setTimeout(function () {
      var text = 'Para te passarmos um valor, precisamos primeiramente fazer uma avaliação sem compromisso. O valor costuma ser diferente de paciente para paciente.';
      _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTextMessage(sender, text);
    }, 1000);
    setTimeout(function () {
      var text = 'Mas, fique tranquilo! Você pode agendar a sua avaliação agora. Clique abaixo. 😬';
      var replies = [{
        'content_type': 'text',
        'title': 'Agendar agora',
        'payload': 'Agendar agora'
      }];
      _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendQuickReply(sender, text, replies);
    }, 2000);
  },
  'talk.human': function talkHuman(sender) {
    _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTypingOn(sender);
    _services_facebook_service__WEBPACK_IMPORTED_MODULE_8__["default"].sendPassThread(sender);
  },
  'input.unknown': function inputUnknown(sender, messages) {
    _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTypingOn(sender);
    handleMessages(messages, sender);
    setTimeout(function () {
      var text = 'Opps, talvez eu não tenha aprendido o suficiente. 😔 \n\nPodemos tentar de novo, ou se preferir falar com um dos nossos humanos disponíveis. 💜';
      var replies = [{
        'content_type': 'text',
        'title': 'Falar com humano',
        'payload': 'Falar com humano'
      }];
      _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendQuickReply(sender, text, replies);
    }, 1000);
  },
  'default': function _default(sender, messages) {
    _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTypingOn(sender);
    handleMessages(messages, sender);
  }
};

var handleDialogFlowAction = function handleDialogFlowAction(sender, action, messages, contexts, parameters) {
  return (handleDFAObj[action] ? handleDFAObj[action] : handleDFAObj['default'])(sender, messages, contexts, parameters);
};
/**
 * Just logging message echoes to console
 * @param {Number} messageId
 * @param {Number} appId
 * @param {Object} metadata
 */


var handleEcho = function handleEcho(messageId, appId, metadata) {
  console.log('❌ [BOT CONSILIO] Received echo for message %s and app %d with metadata %s', messageId, appId, metadata);
};
/**
 * Received message
 * @param {*} event
 */


var receivedMessage = function receivedMessage(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfMessage = event.timestamp;
  var message = event.message;
  _utils__WEBPACK_IMPORTED_MODULE_5__["default"].setSessionandUser(senderID);
  console.log('⚡️ [BOT CONSILIO] Received message for user %d and page %d at %d with message:', senderID, recipientID, timeOfMessage);
  var isEcho = message.is_echo;
  var messageId = message.mid;
  var appId = message.FB_APP_ID;
  var metadata = message.metadata; // You may get a text or attachment but not both

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
    _services_dialogflow_service__WEBPACK_IMPORTED_MODULE_7__["default"].sendTextToDialogFlow(senderID, messageText);
  } else if (messageAttachments) {
    handleMessageAttachments(messageAttachments, senderID);
  }
};
/**
 * Received post back
 * @param {*} event
 */


var receivedPbObj = {
  'get_started': function () {
    var _get_started = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee11(senderID, payload) {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return _utils__WEBPACK_IMPORTED_MODULE_5__["default"].setSessionandUser(senderID);

            case 2:
              _services_dialogflow_service__WEBPACK_IMPORTED_MODULE_7__["default"].sendTextToDialogFlow(senderID, payload);

            case 3:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    }));

    function get_started(_x19, _x20) {
      return _get_started.apply(this, arguments);
    }

    return get_started;
  }(),
  'VIEW_SITE': function VIEW_SITE(senderID, payload) {
    _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTextMessage(senderID, payload);
  },
  'SCHEDULE_APPOINTMENT': function SCHEDULE_APPOINTMENT(senderID) {
    _services_dialogflow_service__WEBPACK_IMPORTED_MODULE_7__["default"].sendEventToDialogFlow(senderID, 'schedule');
  },
  'DEFAULT': function DEFAULT(senderID, payload) {
    _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTextMessage(senderID, payload);
  }
};

var receivedPostback = function receivedPostback(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfPostback = event.timestamp;
  var payload = event.postback.payload;
  console.log('⚡️ [BOT CONSILIO] Received postback for user %d and page %d with payload \'%s\' ' + 'at %d', senderID, recipientID, payload, timeOfPostback);
  return (receivedPbObj[payload] || receivedPbObj['DEFAULT'])(senderID, payload);
};
/**
 * Received notification message read
 * @param {*} event
 */


var receivedMessageRead = function receivedMessageRead(event) {
  // var senderID = event.sender.id;
  // var recipientID = event.recipient.id;
  var watermark = event.read.watermark;
  var sequenceNumber = event.read.seq;
  console.log('⚡️ [BOT CONSILIO] Received message read event for watermark %d and sequence ' + 'number %d', watermark, sequenceNumber);
};
/**
 * Received notification authentication
 * @param {*} event
 */


var receivedAuthentication = function receivedAuthentication(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfAuth = event.timestamp;
  var passThroughParam = event.optin.ref;
  console.log('⚡️ [BOT CONSILIO] Received authentication for user %d and page %d with pass ' + 'through param \'%s\' at %d', senderID, recipientID, passThroughParam, timeOfAuth);
  _send__WEBPACK_IMPORTED_MODULE_4__["default"].sendTextMessage(senderID, 'Autenticação realizada com sucesso!');
};
/**
 * Received account link
 * @param {*} event
 */


var receivedAccountLink = function receivedAccountLink(event) {
  var senderID = event.sender.id; // var recipientID = event.recipient.id;

  var status = event.account_linking.status;
  var authCode = event.account_linking.authorization_code;
  console.log('⚡️ [BOT CONSILIO] Received account link event with for user %d with status %s ' + 'and auth code %s ', senderID, status, authCode);
};
/**
 * Received devivery confirmation
 * @param {*} event
 */


var receivedDeliveryConfirmation = function receivedDeliveryConfirmation(event) {
  // var senderID = event.sender.id;
  // var recipientID = event.recipient.id;
  var delivery = event.delivery;
  var messageIDs = delivery.mids;
  var watermark = delivery.watermark; // var sequenceNumber = delivery.seq;

  if (messageIDs) {
    messageIDs.forEach(function (messageID) {
      console.log('⚡️ [BOT CONSILIO] Received delivery confirmation for message ID: %s', messageID);
    });
  }

  console.log('⚡️ [BOT CONSILIO] All message before %d were delivered.', watermark);
};

/* harmony default export */ __webpack_exports__["default"] = ({
  handleCardMessages: handleCardMessages,
  handleMessages: handleMessages,
  handleMessage: handleMessage,
  handleQuickReply: handleQuickReply,
  handleMessageAttachments: handleMessageAttachments,
  handleDialogFlowResponse: handleDialogFlowResponse,
  handleDialogFlowAction: handleDialogFlowAction,
  handleEcho: handleEcho,
  receivedMessage: receivedMessage,
  receivedPostback: receivedPostback,
  receivedMessageRead: receivedMessageRead,
  receivedAuthentication: receivedAuthentication,
  receivedAccountLink: receivedAccountLink,
  receivedDeliveryConfirmation: receivedDeliveryConfirmation
});

/***/ }),

/***/ "./app/send.js":
/*!*********************!*\
  !*** ./app/send.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_facebook_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/facebook.service */ "./services/facebook.service.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./utils/index.js");
/* harmony import */ var _config_variables__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config/variables */ "./config/variables.js");





/**
 * Send action typing on using the Service API
 * @param {Number} recipientId
 */

var sendTypingOn = function sendTypingOn(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    sender_action: 'typing_on'
  };
  _services_facebook_service__WEBPACK_IMPORTED_MODULE_0__["default"].sendCall(messageData, 0);
};
/**
 * Send action typing off using the Service API
 * @param {Number} recipientId
 */


var sendTypingOff = function sendTypingOff(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    sender_action: 'typing_off'
  };
  _services_facebook_service__WEBPACK_IMPORTED_MODULE_0__["default"].sendCall(messageData, 0);
};
/**
 * Send type text message using the Service API
 * @param {Number} recipientId
 * @param {String} text
 */


var sendTextMessage = function sendTextMessage(recipientId, text) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: text
    }
  };
  _services_facebook_service__WEBPACK_IMPORTED_MODULE_0__["default"].sendCall(messageData, 0);
};
/**
 * Send text message with persona
 * @param {Number} recipientId
 * @param {String} text
 * @param {Number} persona_id
 */


var sendTextWithPersona = function sendTextWithPersona(recipientId, text, persona_id) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: text,
      persona_id: persona_id
    }
  };
  _services_facebook_service__WEBPACK_IMPORTED_MODULE_0__["default"].sendCall(messageData, 0);
};
/*
     * Send a Gif using the Send API.
     *
     */


var sendGifMessage = function sendGifMessage(recipientId, GifName) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: 'image',
        payload: {
          url: _config_variables__WEBPACK_IMPORTED_MODULE_2__["default"].APP_URL + GifName
        }
      }
    }
  };
  _services_facebook_service__WEBPACK_IMPORTED_MODULE_0__["default"].sendCall(messageData, 0);
};
/*
     * Send a image using the Send API.
     *
     */


var sendImageMessage = function sendImageMessage(recipientId, imageName) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: 'image',
        payload: {
          url: _config_variables__WEBPACK_IMPORTED_MODULE_2__["default"].APP_URL + imageName
        }
      }
    }
  };
  _services_facebook_service__WEBPACK_IMPORTED_MODULE_0__["default"].sendCall(messageData, 0);
};
/**
 * Send type quick reply message using the Service API.
 * @param {Number} recipientId
 * @param {String} text
 */


var sendQuickReply = function sendQuickReply(recipientId, text, replies, metadata) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: text,
      metadata: _utils__WEBPACK_IMPORTED_MODULE_1__["default"].isDefined(metadata) ? metadata : '',
      quick_replies: replies
    }
  };
  _services_facebook_service__WEBPACK_IMPORTED_MODULE_0__["default"].sendCall(messageData, 0);
};
/*
     * Send a button message using the Send API.
     *
     */


var sendButtonMessage = function sendButtonMessage(recipientId, text, buttons) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'button',
          text: text,
          buttons: buttons
        }
      }
    }
  };
  _services_facebook_service__WEBPACK_IMPORTED_MODULE_0__["default"].sendCall(messageData, 0);
};
/**
 * Send type template generic message using the Service API.
 * @param {Number} recipientId
 * @param {Object} elements
 */


var sendGenericMessage = function sendGenericMessage(recipientId, elements) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          elements: elements
        }
      }
    }
  };
  _services_facebook_service__WEBPACK_IMPORTED_MODULE_0__["default"].sendCall(messageData, 0);
};

/* harmony default export */ __webpack_exports__["default"] = ({
  sendTypingOn: sendTypingOn,
  sendTypingOff: sendTypingOff,
  sendTextMessage: sendTextMessage,
  sendTextWithPersona: sendTextWithPersona,
  sendQuickReply: sendQuickReply,
  sendButtonMessage: sendButtonMessage,
  sendGifMessage: sendGifMessage,
  sendImageMessage: sendImageMessage,
  sendGenericMessage: sendGenericMessage
});

/***/ }),

/***/ "./app/webhook.js":
/*!************************!*\
  !*** ./app/webhook.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config_variables__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config/variables */ "./config/variables.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils */ "./utils/index.js");
/* harmony import */ var _receive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./receive */ "./app/receive.js");
/* harmony import */ var _profile__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./profile */ "./app/profile.js");
/* harmony import */ var _services_facebook_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/facebook.service */ "./services/facebook.service.js");







process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

var messageHandler = /*#__PURE__*/function () {
  var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(req, res) {
    var body;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            try {
              body = req.body;

              if (body.object === 'page') {
                // var pageID = pageEntry.id;
                // var timeOfEvent = pageEntry.time;
                body.entry.forEach(function (pageEntry) {
                  var hookEvent = pageEntry.messaging[0];
                  var senderPsid = hookEvent.sender.id;
                  _utils__WEBPACK_IMPORTED_MODULE_3__["default"].setSessionandUser(senderPsid);

                  if (pageEntry.standby) {
                    pageEntry.standby.forEach(function (event) {
                      var psid = event.sender.id;
                      var message = event.message;
                      console.log('message from: ', psid);
                      console.log('message to inbox: ', message);
                    });
                  }

                  if (pageEntry.messaging) {
                    pageEntry.messaging.forEach(function (messagingEvent) {
                      if (messagingEvent.optin) {
                        _receive__WEBPACK_IMPORTED_MODULE_4__["default"].receivedAuthentication(messagingEvent);
                      } else if (messagingEvent.message) {
                        _receive__WEBPACK_IMPORTED_MODULE_4__["default"].receivedMessage(messagingEvent);
                      } else if (messagingEvent.delivery) {
                        _receive__WEBPACK_IMPORTED_MODULE_4__["default"].receivedDeliveryConfirmation(messagingEvent);
                      } else if (messagingEvent.postback) {
                        _receive__WEBPACK_IMPORTED_MODULE_4__["default"].receivedPostback(messagingEvent);
                      } else if (messagingEvent.read) {
                        _receive__WEBPACK_IMPORTED_MODULE_4__["default"].receivedMessageRead(messagingEvent);
                      } else if (messagingEvent.account_linking) {
                        _receive__WEBPACK_IMPORTED_MODULE_4__["default"].receivedAccountLink(messagingEvent);
                      } else if (messagingEvent.pass_thread_control) {
                        _receive__WEBPACK_IMPORTED_MODULE_4__["default"].receivedMessage(messagingEvent.pass_thread_control.metadata);
                      } else {
                        console.log('❌ [BOT CONSILIO] Webhook received unknown messaging. Event: ', messagingEvent);
                      }
                    });
                  }
                });
                res.status(200).send('⚡️ [BOT CONSILIO] Event receiving.');
              }
            } catch (error) {
              console.log('❌ [BOT CONSILIO] Error in post webhook. ', error);
            }

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function messageHandler(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var verifyWebhook = /*#__PURE__*/function () {
  var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(req, res) {
    var mode, challenge, token;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            try {
              mode = req.query['hub.mode'];
              challenge = req.query['hub.challenge'];
              token = req.query['hub.verify_token'];

              if (mode && token) {
                if (mode === 'subscribe' && token === process.env.FB_VERIFY_TOKEN) {
                  console.log('⚡️ [BOT CONSILIO] Verify token passed.');
                  res.status(200).send(challenge);
                } else {
                  console.log('❌ [BOT CONSILIO] Webhook is not verified.');
                  res.status(403);
                }
              }
            } catch (error) {
              console.log('❌ [BOT CONSILIO] Error in verify webhook ', error);
            }

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function verifyWebhook(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var setProfile = /*#__PURE__*/function () {
  var _ref3 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(req, res) {
    var token, mode;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            token = req.query['verify_token'];
            mode = req.query['mode'];

            if (!_config_variables__WEBPACK_IMPORTED_MODULE_2__["default"].APP_URL.startsWith('https://')) {
              res.status(200).send('❌ [BOT CONSILIO] ERROR - Need a proper API_URL in the .env file');
            }

            if (mode && token) {
              if (token === _config_variables__WEBPACK_IMPORTED_MODULE_2__["default"].FB_VERIFY_TOKEN) {
                if (mode == 'webhook' || mode == 'all') {
                  _profile__WEBPACK_IMPORTED_MODULE_5__["default"].setWebhook();
                  res.write("<p>Set app ".concat(_config_variables__WEBPACK_IMPORTED_MODULE_2__["default"].FB_APP_ID, " call to ").concat(_config_variables__WEBPACK_IMPORTED_MODULE_2__["default"].APP_URL, "/webhook </p>"));
                }

                if (mode == 'profile' || mode == 'all') {
                  _profile__WEBPACK_IMPORTED_MODULE_5__["default"].setThread();
                  res.write("<p>Set Messenger Profile of Page ".concat(_config_variables__WEBPACK_IMPORTED_MODULE_2__["default"].FB_PAGE_ID, "</p>"));
                }

                if (mode == 'nlp' || mode == 'all') {
                  _services_facebook_service__WEBPACK_IMPORTED_MODULE_6__["default"].callNLPConfigsAPI();
                  res.write("<p>Enable Built-in NLP for Page ".concat(_config_variables__WEBPACK_IMPORTED_MODULE_2__["default"].FB_PAGE_ID, "</p>"));
                }

                if (mode == 'domains' || mode == 'all') {
                  _profile__WEBPACK_IMPORTED_MODULE_5__["default"].setWhitelistedDomains();
                  res.write("<p>Whitelisting domains: ".concat(_config_variables__WEBPACK_IMPORTED_MODULE_2__["default"].whitelistedDomains, "</p>"));
                }

                if (mode == 'private-reply') {
                  _profile__WEBPACK_IMPORTED_MODULE_5__["default"].setPageFeedWebhook();
                  res.write('<p>Set Page Feed Webhook for Private Replies.</p>');
                }

                res.status(200).end();
              } else {
                res.sendStatus(403);
              }
            } else {
              res.sendStatus(404);
            }

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function setProfile(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

/* harmony default export */ __webpack_exports__["default"] = ({
  messageHandler: messageHandler,
  verifyWebhook: verifyWebhook,
  setProfile: setProfile
});

/***/ }),

/***/ "./config/mysql.js":
/*!*************************!*\
  !*** ./config/mysql.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var mysql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mysql */ "mysql");
/* harmony import */ var mysql__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mysql__WEBPACK_IMPORTED_MODULE_0__);

var connection = mysql__WEBPACK_IMPORTED_MODULE_0___default.a.createConnection({
  host: '198.58.109.236',
  port: 3306,
  user: 'dentalk',
  password: '!CCOKRQ1Ca1x',
  database: 'dentalk'
});

function execQuery(sqlQry) {
  return new Promise(function (resolve, reject) {
    connection.query(sqlQry, function (error, results) {
      if (error) {
        if (error.code == 'ER_DUP_ENTRY') {
          reject('Registro duplicado no banco de dados.');
        } else {
          reject(JSON.parse(JSON.stringify(error)));
        }
      } else {
        var response = results[0];
        resolve(response);
      }
    });
  });
}

/* harmony default export */ __webpack_exports__["default"] = ({
  execQuery: execQuery
});

/***/ }),

/***/ "./config/variables.js":
/*!*****************************!*\
  !*** ./config/variables.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


__webpack_require__(/*! dotenv */ "dotenv").config();

var ENV_VARS = ['PORT', 'APP_URL', 'APP_EMAIL', 'SITE_URL', 'NAME_COMPANY', 'FB_PAGE_ID', 'FB_APP_ID', 'FB_PAGE_ACCESS_TOKEN', 'FB_VERIFY_TOKEN', 'GOOGLE_CLIENT_EMAIL', 'GOOGLE_PROJECT_ID', 'GOOGLE_LANGUAGE_CODE', 'GOOGLE_PRIVATE_KEY', 'GOOGLE_CALENDAR_ID'];
/* harmony default export */ __webpack_exports__["default"] = ({
  mPlatformDomain: 'https://graph.facebook.com',
  mPlatformVersion: 'v3.2',
  PORT: process.env.PORT || 3000,
  APP_URL: process.env.APP_URL,
  APP_EMAIL: process.env.APP_EMAIL,
  SITE_URL: process.env.SITE_URL,
  NAME_COMPANY: process.env.NAME_COMPANY,
  FB_PAGE_ID: process.env.FB_PAGE_ID,
  FB_APP_ID: process.env.FB_APP_ID,
  FB_APP_SECRET: process.env.FB_APP_SECRET,
  FB_PAGE_ACCESS_TOKEN: process.env.FB_PAGE_ACCESS_TOKEN,
  FB_VERIFY_TOKEN: process.env.FB_VERIFY_TOKEN,
  GOOGLE_CLIENT_EMAIL: process.env.GOOGLE_CLIENT_EMAIL,
  GOOGLE_PROJECT_ID: process.env.GOOGLE_PROJECT_ID,
  GOOGLE_LANGUAGE_CODE: process.env.GOOGLE_LANGUAGE_CODE,
  GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY,
  GOOGLE_CALENDAR_ID: process.env.GOOGLE_CALENDAR_ID,

  get mPlatfom() {
    return this.mPlatformDomain + '/' + this.mPlatformVersion;
  },

  get webhookUrl() {
    return this.APP_URL + '/webhook';
  },

  get whitelistedDomains() {
    return [this.APP_URL, this.SITE_URL];
  },

  checkEnv: function checkEnv() {
    ENV_VARS.forEach(function (key) {
      if (!process.env[key]) {
        console.log('❌ [BOT CONSILIO] WARNING: Missing the environment variable ' + key);
      } else {
        if (['APP_URL', 'SITE_URL'].includes(key)) {
          var url = process.env[key];

          if (!url.startsWith('https://')) {
            console.log('❌ [BOT CONSILIO] WARNING: Your ' + key + ' does not begin with "https://"');
          }
        }
      }
    });
  }
});

/***/ }),

/***/ "./models/calendar.model.js":
/*!**********************************!*\
  !*** ./models/calendar.model.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config_mysql__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config/mysql */ "./config/mysql.js");




var getEvent = /*#__PURE__*/function () {
  var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(sender) {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new Promise(function (resolve) {
              var query = _config_mysql__WEBPACK_IMPORTED_MODULE_2__["default"].execQuery("SELECT * FROM calendar_events WHERE senderID='".concat(sender, "' ORDER BY id DESC LIMIT 1"))["catch"](function (err) {
                console.log('❌ ERRO: ', err);
              });
              resolve(query);
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getEvent(_x) {
    return _ref.apply(this, arguments);
  };
}();

var cancelEvent = /*#__PURE__*/function () {
  var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(sender) {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", new Promise(function (resolve) {
              var query = _config_mysql__WEBPACK_IMPORTED_MODULE_2__["default"].execQuery("UPDATE calendar_events SET status = 'canceled' WHERE senderID='".concat(sender, "'"))["catch"](function (err) {
                console.log('❌ ERRO: ', err);
              });
              resolve(query);
            }));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function cancelEvent(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

/* harmony default export */ __webpack_exports__["default"] = ({
  getEvent: getEvent,
  cancelEvent: cancelEvent
});

/***/ }),

/***/ "./models/user.model.js":
/*!******************************!*\
  !*** ./models/user.model.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config_mysql__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config/mysql */ "./config/mysql.js");




var getUserDB = /*#__PURE__*/function () {
  var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(sender) {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new Promise(function (resolve) {
              var query = _config_mysql__WEBPACK_IMPORTED_MODULE_2__["default"].execQuery("SELECT * FROM leads WHERE senderID= '".concat(sender, "'"))["catch"](function (err) {
                console.log('❌ ERRO: ', err);
              });
              resolve(query);
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getUserDB(_x) {
    return _ref.apply(this, arguments);
  };
}();

/* harmony default export */ __webpack_exports__["default"] = ({
  getUserDB: getUserDB
});

/***/ }),

/***/ "./routes/profile.route.js":
/*!*********************************!*\
  !*** ./routes/profile.route.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_webhook__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app/webhook */ "./app/webhook.js");



/* harmony default export */ __webpack_exports__["default"] = (function (app) {
  app.route('/profile').get(_app_webhook__WEBPACK_IMPORTED_MODULE_0__["default"].setProfile);
});

/***/ }),

/***/ "./routes/webhook.route.js":
/*!*********************************!*\
  !*** ./routes/webhook.route.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_webhook__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app/webhook */ "./app/webhook.js");



/* harmony default export */ __webpack_exports__["default"] = (function (app) {
  app.route('/webhook').get(_app_webhook__WEBPACK_IMPORTED_MODULE_0__["default"].verifyWebhook);
  app.route('/webhook').post(_app_webhook__WEBPACK_IMPORTED_MODULE_0__["default"].messageHandler);
});

/***/ }),

/***/ "./services/calendar.service.js":
/*!**************************************!*\
  !*** ./services/calendar.service.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config_variables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/variables */ "./config/variables.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "moment");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var googleapis__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! googleapis */ "googleapis");
/* harmony import */ var googleapis__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(googleapis__WEBPACK_IMPORTED_MODULE_2__);





var serviceAccountAuth = new googleapis__WEBPACK_IMPORTED_MODULE_2__["google"].auth.JWT({
  email: _config_variables__WEBPACK_IMPORTED_MODULE_0__["default"].GOOGLE_CLIENT_EMAIL,
  key: _config_variables__WEBPACK_IMPORTED_MODULE_0__["default"].GOOGLE_PRIVATE_KEY,
  scopes: 'https://www.googleapis.com/auth/calendar'
});
var calendar = googleapis__WEBPACK_IMPORTED_MODULE_2__["google"].calendar('v3');

var createCalendarEvent = function createCalendarEvent(dateTimeStart, dateTimeEnd, userDB) {
  return new Promise(function (resolve, reject) {
    calendar.events.list({
      auth: serviceAccountAuth,
      calendarId: _config_variables__WEBPACK_IMPORTED_MODULE_0__["default"].GOOGLE_CALENDAR_ID,
      timeMin: dateTimeStart.toISOString(),
      timeMax: dateTimeEnd.toISOString()
    }, function (err, calendarResponse) {
      if (err || calendarResponse.data.items.length > 0) {
        reject(err || new Error('O horário solicitado entra em conflito com outro compromisso.'));
      } else {
        calendar.events.insert({
          auth: serviceAccountAuth,
          calendarId: _config_variables__WEBPACK_IMPORTED_MODULE_0__["default"].GOOGLE_CALENDAR_ID,
          resource: {
            summary: "Consulta de ".concat(userDB.first_name),
            description: "Nome do paciente: ".concat(userDB.first_name, " ").concat(userDB.last_name, " \nTelefone: ").concat(userDB.phone, " \nE-mail: ").concat(userDB.email, " \n\nAgendamento realizado em: Facebook - ").concat(moment__WEBPACK_IMPORTED_MODULE_1___default()().format('DD/MM/YYYY HH:mm')),
            start: {
              dateTime: dateTimeStart
            },
            end: {
              dateTime: dateTimeEnd
            }
          }
        }, function (err, event) {
          err ? reject(err) : resolve(event);
        });
      }
    });
  });
};

var updateCalendarEvent = function updateCalendarEvent(dateTimeStart, dateTimeEnd, eventID) {
  return new Promise(function (resolve, reject) {
    calendar.events.get({
      auth: serviceAccountAuth,
      calendarId: _config_variables__WEBPACK_IMPORTED_MODULE_0__["default"].GOOGLE_CALENDAR_ID,
      eventId: eventID
    }, function (err, calendarResponse) {
      if (err || calendarResponse.data.length > 0) {
        reject(err || new Error('O horário solicitado entra em conflito com outro compromisso.'));
      } else {
        var resource = {
          start: {
            dateTime: dateTimeStart.toISOString()
          },
          end: {
            dateTime: dateTimeEnd.toISOString()
          }
        };
        calendar.events.patch({
          auth: serviceAccountAuth,
          calendarId: _config_variables__WEBPACK_IMPORTED_MODULE_0__["default"].GOOGLE_CALENDAR_ID,
          eventId: eventID,
          resource: resource
        }, function (err, event) {
          err ? reject(err) : resolve(event);
        });
      }
    });
  });
};

var deleteCalendarEvent = function deleteCalendarEvent(eventID) {
  return new Promise(function (resolve, reject) {
    calendar.events["delete"]({
      auth: serviceAccountAuth,
      calendarId: _config_variables__WEBPACK_IMPORTED_MODULE_0__["default"].GOOGLE_CALENDAR_ID,
      eventId: eventID
    }, function (err) {
      if (err) {
        console.log('The API returned an error: ' + err);
        reject();
      }

      resolve();
    });
  });
};

var currentlyOpen = function currentlyOpen() {
  var date = new Date();
  date.setHours(date.getHours() + parseInt('-03:00'.split(':')[0]));
  date.setMinutes(date.getMinutes() + parseInt('-03:00'.split(':')[0][0] + '-03:00'.split(':')[1]));
  return date.getDay() >= 1 && date.getDay() <= 5 && date.getHours() >= 8 && date.getHours() <= 18;
};

var daysFromSlots = function daysFromSlots(startTime, endTime) {
  return new Promise(function (resolve) {
    var startDate = new Date(startTime);
    var endDate = new Date(endTime);
    startDate.setHours('0', '00', '00');
    endDate.setHours('23', '59', '59');
    var check = {
      auth: serviceAccountAuth,
      resource: {
        items: [{
          id: _config_variables__WEBPACK_IMPORTED_MODULE_0__["default"].GOOGLE_CALENDAR_ID
        }],
        timeMin: startDate.toISOString(),
        timeMax: endDate.toISOString(),
        timeZone: '-03:00'
      }
    };
    calendar.freebusy.query(check).then(function (data) {
      resolve(receivedSlotsDays(startDate, endDate, data.data.calendars["".concat(_config_variables__WEBPACK_IMPORTED_MODULE_0__["default"].GOOGLE_CALENDAR_ID)].busy));
    });
  });
};

var receivedSlotsDays = function receivedSlotsDays(start, end, events) {
  return new Promise(function (resolve) {
    var freeSlots = [];
    events.forEach(function (event, index) {
      if (index == 0 && start < event.start) {
        freeSlots.push({
          startDate: start,
          endDate: event.start
        });
      } else if (index == 0) {
        start = event.end;
      } else if (events[index - 1].end < event.start) {
        freeSlots.push({
          startDate: events[index - 1].end,
          endDate: event.start
        });
      }

      if (events.length == index + 1 && event.end < start) {
        freeSlots.push({
          startDate: event.end,
          endDate: start
        });
      }
    });
    resolve(freeSlots);
  });
};

var slotsFromEvents = function slotsFromEvents(startTime) {
  return new Promise(function (resolve) {
    var startDate = new Date(startTime);
    var endDate = new Date(startTime);
    startDate.setHours('08', '00', '00', '00');
    endDate.setHours('18', '00', '00', '00');
    var check = {
      auth: serviceAccountAuth,
      resource: {
        items: [{
          id: _config_variables__WEBPACK_IMPORTED_MODULE_0__["default"].GOOGLE_CALENDAR_ID
        }],
        timeMin: startDate.toISOString(),
        timeMax: endDate.toISOString(),
        timeZone: '-03:00'
      }
    };
    calendar.freebusy.query(check).then(function (data) {
      resolve(receivedSlotsHours(startDate, endDate, data.data.calendars["".concat(_config_variables__WEBPACK_IMPORTED_MODULE_0__["default"].GOOGLE_CALENDAR_ID)].busy));
    });
  });
};

var receivedSlotsHours = function receivedSlotsHours(start, end, events) {
  return new Promise(function (resolve) {
    var start_org = start.toISOString();
    var end_org = end.toISOString();
    var freeSlots = [];
    var start_time = moment__WEBPACK_IMPORTED_MODULE_1___default()(start_org).format();
    var end_time = moment__WEBPACK_IMPORTED_MODULE_1___default()(end_org).format();
    end_time = end_time.valueOf();
    var appt_start_time = start_time;
    appt_start_time = new Date(appt_start_time).getTime();
    end_time = new Date(end_time).getTime();

    var _loop = function _loop() {
      var appt_end_time = appt_start_time + 1799;
      var slot_available = true;
      events.forEach(function (event) {
        var this_start = new Date(event['start']).getTime();
        var this_end = new Date(event['end']).getTime();

        if (appt_start_time >= this_start && appt_start_time < this_end || appt_end_time >= this_start && appt_end_time < this_end) {
          slot_available = false;
          return false;
        }
      });

      if (slot_available) {
        var date = new Date(parseInt(appt_start_time));
        freeSlots.push(date);
      }

      appt_start_time += 600 * 6000;
    };

    while (appt_start_time < end_time) {
      _loop();
    }

    resolve(freeSlots);
  });
};

/* harmony default export */ __webpack_exports__["default"] = ({
  createCalendarEvent: createCalendarEvent,
  updateCalendarEvent: updateCalendarEvent,
  deleteCalendarEvent: deleteCalendarEvent,
  currentlyOpen: currentlyOpen,
  daysFromSlots: daysFromSlots,
  slotsFromEvents: slotsFromEvents
});

/***/ }),

/***/ "./services/dialogflow.service.js":
/*!****************************************!*\
  !*** ./services/dialogflow.service.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var dialogflow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dialogflow */ "dialogflow");
/* harmony import */ var dialogflow__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dialogflow__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _config_variables__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../config/variables */ "./config/variables.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils */ "./utils/index.js");
/* harmony import */ var _app_send__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../app/send */ "./app/send.js");
/* harmony import */ var _app_receive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../app/receive */ "./app/receive.js");
/* harmony import */ var _utils_structjson__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/structjson */ "./utils/structjson.js");








var credentials = {
  credentials: {
    private_key: _config_variables__WEBPACK_IMPORTED_MODULE_3__["default"].GOOGLE_PRIVATE_KEY,
    client_email: _config_variables__WEBPACK_IMPORTED_MODULE_3__["default"].GOOGLE_CLIENT_EMAIL
  }
};
var sessionClient = new dialogflow__WEBPACK_IMPORTED_MODULE_2___default.a.SessionsClient(credentials);
/**
* Send all messages to DialogFlow
* @param {*} sender
* @param {*} textString
* @param {*} params
*/

var sendTextToDialogFlow = /*#__PURE__*/function () {
  var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(sender, textString, params) {
    var sessionPath, request, responses, result;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _app_send__WEBPACK_IMPORTED_MODULE_5__["default"].sendTypingOn(sender);
            sessionPath = sessionClient.sessionPath(_config_variables__WEBPACK_IMPORTED_MODULE_3__["default"].GOOGLE_PROJECT_ID, _utils__WEBPACK_IMPORTED_MODULE_4__["default"].sessionIds.get(sender));
            _context.prev = 2;
            request = {
              session: sessionPath,
              queryInput: {
                text: {
                  text: textString,
                  languageCode: _config_variables__WEBPACK_IMPORTED_MODULE_3__["default"].GOOGLE_LANGUAGE_CODE
                }
              },
              queryParams: {
                payload: {
                  data: params
                }
              }
            };
            _context.next = 6;
            return sessionClient.detectIntent(request);

          case 6:
            responses = _context.sent;
            result = responses[0].queryResult;
            _app_receive__WEBPACK_IMPORTED_MODULE_6__["default"].handleDialogFlowResponse(sender, result);
            _context.next = 15;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](2);
            console.log('❌ [BOT CONSILIO] Error in process message in Dialogflow:');
            console.log(_context.t0);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 11]]);
  }));

  return function sendTextToDialogFlow(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var sendEventToDialogFlow = /*#__PURE__*/function () {
  var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(sender, event) {
    var params,
        sessionPath,
        request,
        responses,
        result,
        _args2 = arguments;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            params = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {};
            _app_send__WEBPACK_IMPORTED_MODULE_5__["default"].sendTypingOn(sender);
            sessionPath = sessionClient.sessionPath(_config_variables__WEBPACK_IMPORTED_MODULE_3__["default"].GOOGLE_PROJECT_ID, _utils__WEBPACK_IMPORTED_MODULE_4__["default"].sessionIds.get(sender));
            _context2.prev = 3;
            request = {
              session: sessionPath,
              queryInput: {
                event: {
                  name: event,
                  parameters: _utils_structjson__WEBPACK_IMPORTED_MODULE_7__["default"].jsonToStructProto(params),
                  languageCode: _config_variables__WEBPACK_IMPORTED_MODULE_3__["default"].GOOGLE_LANGUAGE_CODE
                }
              }
            };
            _context2.next = 7;
            return sessionClient.detectIntent(request);

          case 7:
            responses = _context2.sent;
            result = responses[0].queryResult;
            _app_receive__WEBPACK_IMPORTED_MODULE_6__["default"].handleDialogFlowResponse(sender, result);
            _context2.next = 16;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](3);
            console.log('❌ [BOT CONSILIO] Error in process message in Dialogflow:');
            console.log(_context2.t0);

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 12]]);
  }));

  return function sendEventToDialogFlow(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

/* harmony default export */ __webpack_exports__["default"] = ({
  sendTextToDialogFlow: sendTextToDialogFlow,
  sendEventToDialogFlow: sendEventToDialogFlow
});

/***/ }),

/***/ "./services/facebook.service.js":
/*!**************************************!*\
  !*** ./services/facebook.service.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var request__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! request */ "request");
/* harmony import */ var request__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(request__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _config_variables__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../config/variables */ "./config/variables.js");
/* harmony import */ var _config_mysql__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../config/mysql */ "./config/mysql.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils */ "./utils/index.js");





var _this = undefined;





/**
 * Send call to Facebook Graph API
 * @param {*} callback
 */

var sendCall = /*#__PURE__*/function () {
  var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(callback, i) {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            request__WEBPACK_IMPORTED_MODULE_2___default()({
              uri: "".concat(_config_variables__WEBPACK_IMPORTED_MODULE_3__["default"].mPlatfom, "/me/messages"),
              qs: {
                access_token: _config_variables__WEBPACK_IMPORTED_MODULE_3__["default"].FB_PAGE_ACCESS_TOKEN
              },
              method: 'POST',
              json: callback
            }, function (error, response, body) {
              if (!error && response.statusCode == 200) {
                var recipientId = body.recipient_id;
                var messageId = body.message_id;
                _utils__WEBPACK_IMPORTED_MODULE_5__["default"].setSessionandUser(recipientId);
                if (i < callback.length) sendCall(callback, i + 1);

                if (messageId) {
                  console.log('⚡️ [BOT CONSILIO] Successfully sent message with id %s to recipient %s', messageId, recipientId);
                } else {
                  console.log('⚡️ [BOT CONSILIO] Successfully called Send API for recipient %s', recipientId);
                }
              } else {
                console.error('❌ [BOT CONSILIO] Failed calling Send API', response.statusCode, response.statusMessage, body.error);
              }
            });

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function sendCall(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var sendPassThread = function sendPassThread(senderID) {
  request__WEBPACK_IMPORTED_MODULE_2___default()({
    uri: 'https://graph.facebook.com/v2.6/me/pass_thread_control',
    qs: {
      access_token: _config_variables__WEBPACK_IMPORTED_MODULE_3__["default"].FB_PAGE_ACCESS_TOKEN
    },
    method: 'POST',
    json: {
      recipient: {
        id: senderID
      },
      target_app_id: _config_variables__WEBPACK_IMPORTED_MODULE_3__["default"].FB_PAGE_ID
    }
  }, function (error, _res, body) {
    if (!error) {
      console.log('⚡️ [BOT CONSILIO] Send pass thrend request sent:', body);
    } else {
      console.error('❌ [BOT CONSILIO] Unable to pass thread message:', error);
    }
  });
};

var callMessengerProfileAPI = function callMessengerProfileAPI(requestBody) {
  console.log("\u26A1\uFE0F [BOT CONSILIO] Setting messenger profile for app ".concat(_config_variables__WEBPACK_IMPORTED_MODULE_3__["default"].FB_APP_ID));
  request__WEBPACK_IMPORTED_MODULE_2___default()({
    uri: "".concat(_config_variables__WEBPACK_IMPORTED_MODULE_3__["default"].mPlatfom, "/me/messenger_profile"),
    qs: {
      access_token: _config_variables__WEBPACK_IMPORTED_MODULE_3__["default"].FB_PAGE_ACCESS_TOKEN
    },
    method: 'POST',
    json: requestBody
  }, function (error, _res, body) {
    if (!error) {
      console.log('⚡️ [BOT CONSILIO] Messenger profile API request sent:', body);
    } else {
      console.error('❌ [BOT CONSILIO] Unable to send message:', error);
    }
  });
};

var getUserProfile = /*#__PURE__*/function () {
  var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(senderPsid) {
    var userProfile, keysUserProfile, valuesUserProfile, i, value;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _this.callUserProfileAPI(senderPsid);

          case 3:
            userProfile = _context2.sent;
            keysUserProfile = Object.keys(userProfile);
            valuesUserProfile = Object.values(userProfile);

            for (i = 0; i <= keysUserProfile.length; i += 1) {
              if (Object.prototype.hasOwnProperty.call(valuesUserProfile, i)) {
                value = userProfile[i];
                delete userProfile[i];
                userProfile[i] = value;
              }
            }

            return _context2.abrupt("return", userProfile);

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            console.log('❌ [BOT CONSILIO] Fetch failed:', _context2.t0);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 10]]);
  }));

  return function getUserProfile(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

var callUserProfileAPI = function callUserProfileAPI(senderPsid) {
  return new Promise(function (resolve, reject) {
    var body = [];
    request__WEBPACK_IMPORTED_MODULE_2___default()({
      uri: "".concat(_config_variables__WEBPACK_IMPORTED_MODULE_3__["default"].mPlatfom, "/").concat(senderPsid),
      qs: {
        access_token: _config_variables__WEBPACK_IMPORTED_MODULE_3__["default"].FB_PAGE_ACCESS_TOKEN,
        fields: 'first_name, last_name, gender, locale, timezone'
      },
      method: 'GET'
    }).on('response', function (response) {
      // console.log(response.statusCode);
      if (response.statusCode !== 200) {
        reject(Error(response.statusCode));
      }
    }).on('data', function (chunk) {
      body.push(chunk);
    }).on('error', function (error) {
      console.error('❌ [BOT CONSILIO] Unable to fetch profile:' + error);
      reject(Error('❌ [BOT CONSILIO] Network Error'));
    }).on('end', function () {
      body = Buffer.concat(body).toString(); // console.log(JSON.parse(body));

      resolve(JSON.parse(body));
    });
  });
};

var callNLPConfigsAPI = function callNLPConfigsAPI() {
  console.log("\u26A1\uFE0F [BOT CONSILIO] Enable Built-in NLP for Page ".concat(_config_variables__WEBPACK_IMPORTED_MODULE_3__["default"].FB_PAGE_ID));
  request__WEBPACK_IMPORTED_MODULE_2___default()({
    uri: "".concat(_config_variables__WEBPACK_IMPORTED_MODULE_3__["default"].mPlatfom, "/me/nlp_configs"),
    qs: {
      access_token: _config_variables__WEBPACK_IMPORTED_MODULE_3__["default"].FB_PAGE_ACCESS_TOKEN,
      nlp_enabled: true
    },
    method: 'POST'
  }, function (error, _res, body) {
    if (!error) {
      console.log('⚡️ [BOT CONSILIO] NLP request sent:', body);
    } else {
      console.error('❌ [BOT CONSILIO] Unable to activate built-in NLP:', error);
    }
  });
};

var callFBAEventsAPI = function callFBAEventsAPI(senderPsid, eventName) {
  // Construct the message body
  var requestBody = {
    event: 'CUSTOM_APP_EVENTS',
    custom_events: JSON.stringify([{
      _eventName: 'postback_payload',
      _value: eventName,
      _origin: 'original_coast_clothing'
    }]),
    advertiser_tracking_enabled: 1,
    application_tracking_enabled: 1,
    extinfo: JSON.stringify(['mb1']),
    FB_PAGE_ID: _config_variables__WEBPACK_IMPORTED_MODULE_3__["default"].pageId,
    page_scoped_user_id: senderPsid
  };
  request__WEBPACK_IMPORTED_MODULE_2___default()({
    uri: "".concat(_config_variables__WEBPACK_IMPORTED_MODULE_3__["default"].mPlatfom, "/").concat(_config_variables__WEBPACK_IMPORTED_MODULE_3__["default"].FB_APP_ID, "/activities"),
    method: 'POST',
    form: requestBody
  }, function (error) {
    if (!error) {
      console.log("\u26A1\uFE0F [BOT CONSILIO] FBA event '".concat(eventName, "'"));
    } else {
      console.error("\u274C [BOT CONSILIO] Unable to send FBA event '".concat(eventName, "':") + error);
    }
  });
};

var callSubscriptionsAPI = function callSubscriptionsAPI(customFields) {
  console.log("\u26A1\uFE0F [BOT CONSILIO] Setting app ".concat(_config_variables__WEBPACK_IMPORTED_MODULE_3__["default"].FB_APP_ID, " callback url to ").concat(_config_variables__WEBPACK_IMPORTED_MODULE_3__["default"].webhookUrl));
  var fields = 'messages, messaging_postbacks, messaging_optins, message_deliveries, messaging_referrals';

  if (customFields !== undefined) {
    fields = fields + ', ' + customFields;
  } //console.log(fields);


  request__WEBPACK_IMPORTED_MODULE_2___default()({
    uri: "".concat(_config_variables__WEBPACK_IMPORTED_MODULE_3__["default"].mPlatfom, "/").concat(_config_variables__WEBPACK_IMPORTED_MODULE_3__["default"].FB_APP_ID, "/subscriptions"),
    qs: {
      access_token: _config_variables__WEBPACK_IMPORTED_MODULE_3__["default"].FB_APP_ID + '|' + _config_variables__WEBPACK_IMPORTED_MODULE_3__["default"].FB_APP_SECRET,
      object: 'page',
      callback_url: _config_variables__WEBPACK_IMPORTED_MODULE_3__["default"].APP_URL + '/webhook',
      verify_token: _config_variables__WEBPACK_IMPORTED_MODULE_3__["default"].FB_VERIFY_TOKEN,
      fields: fields,
      include_values: 'true'
    },
    method: 'POST'
  }, function (error, _res, body) {
    if (!error) {
      console.log('⚡️ [BOT CONSILIO] Request sent:', body);
    } else {
      console.error('❌ [BOT CONSILIO] Unable to send message:', error);
    }
  });
};

var callSubscribedApps = function callSubscribedApps(customFields) {
  console.log("\u26A1\uFE0F [BOT CONSILIO] Subscribing app ".concat(_config_variables__WEBPACK_IMPORTED_MODULE_3__["default"].FB_APP_ID, " to page ").concat(_config_variables__WEBPACK_IMPORTED_MODULE_3__["default"].FB_PAGE_ID));
  var fields = 'messages, messaging_postbacks, messaging_optins, \
      message_deliveries, messaging_referrals';

  if (customFields !== undefined) {
    fields = fields + ', ' + customFields;
  } //messaging_postbacksconsole.log(fields);


  request__WEBPACK_IMPORTED_MODULE_2___default()({
    uri: "".concat(_config_variables__WEBPACK_IMPORTED_MODULE_3__["default"].mPlatfom, "/").concat(_config_variables__WEBPACK_IMPORTED_MODULE_3__["default"].FB_PAGE_ID, "/subscribed_apps"),
    qs: {
      access_token: _config_variables__WEBPACK_IMPORTED_MODULE_3__["default"].FB_PAGE_ACCESS_TOKEN,
      subscribed_fields: fields
    },
    method: 'POST'
  }, function (error) {
    if (error) {
      console.error('❌ [BOT CONSILIO] Unable to send message:', error);
    }
  });
};

var addUser = function addUser(callback, userId) {
  request__WEBPACK_IMPORTED_MODULE_2___default()({
    uri: "".concat(_config_variables__WEBPACK_IMPORTED_MODULE_3__["default"].mPlatfom, "/").concat(userId),
    qs: {
      access_token: _config_variables__WEBPACK_IMPORTED_MODULE_3__["default"].FB_PAGE_ACCESS_TOKEN
    }
  }, /*#__PURE__*/function () {
    var _ref3 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(error, response, body) {
      var user, consulta;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(!error && response.statusCode == 200)) {
                _context3.next = 16;
                break;
              }

              user = JSON.parse(body);

              if (!(user.first_name.length > 0)) {
                _context3.next = 13;
                break;
              }

              _context3.next = 5;
              return _config_mysql__WEBPACK_IMPORTED_MODULE_4__["default"].execQuery("SELECT * FROM leads WHERE senderID= '".concat(userId, "'"))["catch"](function (err) {
                console.log('❌ ERRO: ', err);
              });

            case 5:
              consulta = _context3.sent;
              console.log('CONSULTA: ', consulta);

              if (consulta) {
                _context3.next = 10;
                break;
              }

              _context3.next = 10;
              return _config_mysql__WEBPACK_IMPORTED_MODULE_4__["default"].execQuery("INSERT INTO leads (senderID, first_name, last_name, profile_pic) VALUES ('".concat(userId, "', '").concat(user.first_name, "','").concat(user.last_name, "', '").concat(user.profile_pic, "')"))["catch"](function (err) {
                console.log('❌ ERRO: ', err);
              });

            case 10:
              callback(user);
              _context3.next = 14;
              break;

            case 13:
              console.log('❌ [BOT CONSILIO] Cannot get data for fb user with id', userId);

            case 14:
              _context3.next = 17;
              break;

            case 16:
              console.error(response.error);

            case 17:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x4, _x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());
};

/* harmony default export */ __webpack_exports__["default"] = ({
  sendCall: sendCall,
  sendPassThread: sendPassThread,
  callMessengerProfileAPI: callMessengerProfileAPI,
  getUserProfile: getUserProfile,
  callUserProfileAPI: callUserProfileAPI,
  callNLPConfigsAPI: callNLPConfigsAPI,
  callFBAEventsAPI: callFBAEventsAPI,
  callSubscriptionsAPI: callSubscriptionsAPI,
  callSubscribedApps: callSubscribedApps,
  addUser: addUser
});

/***/ }),

/***/ "./utils/index.js":
/*!************************!*\
  !*** ./utils/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _services_facebook_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/facebook.service */ "./services/facebook.service.js");





var uuid = __webpack_require__(/*! uuid */ "uuid");


/**
 * Define is undefined
 * @param {Object} obj
 */

var isDefined = function isDefined(obj) {
  if (typeof obj == 'undefined') {
    return false;
  }

  if (!obj) {
    return false;
  }

  return obj != null;
};
/**
 * Resolve after x time
 * @param {*} x 
 */


var resolveAfterXSeconds = /*#__PURE__*/function () {
  var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(x) {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new Promise(function (resolve) {
              setTimeout(function () {
                resolve(x);
              }, x * 1000);
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function resolveAfterXSeconds(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Set userid
 * @param {Number} senderID
 */


var sessionIds = new Map();
var usersMap = new Map();

var setSessionandUser = function setSessionandUser(senderID) {
  return new Promise(function (resolve, reject) {
    if (!sessionIds.has(senderID)) {
      sessionIds.set(senderID, uuid.v4());
    }

    if (!usersMap.has(senderID)) {
      try {
        _services_facebook_service__WEBPACK_IMPORTED_MODULE_2__["default"].addUser(function (user) {
          resolve(usersMap.set(senderID, user));
        }, senderID);
      } catch (err) {
        reject(err);
      }
    }
  });
};
/**
 * Resolve after x time
 * @param {*} x 
 */


var getEventID = /*#__PURE__*/function () {
  var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(event) {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", new Promise(function (resolve) {
              var query = event.htmlLink.slice(1);
              var partes = query.split('&');
              var eventID = {};
              partes.forEach(function (parte) {
                var chaveValor = parte.split('=');
                var valor = chaveValor[1];
                eventID = valor;
              });
              var buf = Buffer.from(eventID, 'base64').toString('ascii');
              eventID = buf.split(' ');
              resolve(eventID[0]);
            }));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getEventID(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

/* harmony default export */ __webpack_exports__["default"] = ({
  isDefined: isDefined,
  setSessionandUser: setSessionandUser,
  resolveAfterXSeconds: resolveAfterXSeconds,
  getEventID: getEventID,
  sessionIds: sessionIds,
  usersMap: usersMap
});

/***/ }),

/***/ "./utils/structjson.js":
/*!*****************************!*\
  !*** ./utils/structjson.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "@babel/runtime/helpers/defineProperty");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "@babel/runtime/helpers/typeof");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__);
/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Utilities for converting between JSON and goog.protobuf.Struct
 * proto.
 */





var _JSON_SIMPLE_TYPE_TO_;

function jsonToStructProto(json) {
  var fields = {};

  for (var k in json) {
    fields[k] = jsonValueToProto(json[k]);
  }

  return {
    fields: fields
  };
}

var JSON_SIMPLE_TYPE_TO_PROTO_KIND_MAP = (_JSON_SIMPLE_TYPE_TO_ = {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_JSON_SIMPLE_TYPE_TO_, _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1___default()(0), 'numberValue'), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_JSON_SIMPLE_TYPE_TO_, _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1___default()(''), 'stringValue'), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_JSON_SIMPLE_TYPE_TO_, _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1___default()(false), 'boolValue'), _JSON_SIMPLE_TYPE_TO_);
var JSON_SIMPLE_VALUE_KINDS = new Set(['numberValue', 'stringValue', 'boolValue']);

function jsonValueToProto(value) {
  var valueProto = {};

  if (value === null) {
    valueProto.kind = 'nullValue';
    valueProto.nullValue = 'NULL_VALUE';
  } else if (value instanceof Array) {
    valueProto.kind = 'listValue';
    valueProto.listValue = {
      values: value.map(jsonValueToProto)
    };
  } else if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1___default()(value) === 'object') {
    valueProto.kind = 'structValue';
    valueProto.structValue = jsonToStructProto(value);
  } else if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1___default()(value) in JSON_SIMPLE_TYPE_TO_PROTO_KIND_MAP) {
    var kind = JSON_SIMPLE_TYPE_TO_PROTO_KIND_MAP[_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1___default()(value)];

    valueProto.kind = kind;
    valueProto[kind] = value;
  } else {
    console.warn('Unsupported value type ', _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1___default()(value));
  }

  return valueProto;
}

function structProtoToJson(proto) {
  if (!proto || !proto.fields) {
    return {};
  }

  var json = {};

  for (var k in proto.fields) {
    json[k] = valueProtoToJson(proto.fields[k]);
  }

  return json;
}

function valueProtoToJson(proto) {
  if (!proto || !proto.kind) {
    return null;
  }

  if (JSON_SIMPLE_VALUE_KINDS.has(proto.kind)) {
    return proto[proto.kind];
  } else if (proto.kind === 'nullValue') {
    return null;
  } else if (proto.kind === 'listValue') {
    if (!proto.listValue || !proto.listValue.values) {
      console.warn('Invalid JSON list value proto: ', JSON.stringify(proto));
    }

    return proto.listValue.values.map(valueProtoToJson);
  } else if (proto.kind === 'structValue') {
    return structProtoToJson(proto.structValue);
  } else {
    console.warn('Unsupported JSON value proto kind: ', proto.kind);
    return null;
  }
}

/* harmony default export */ __webpack_exports__["default"] = ({
  jsonToStructProto: jsonToStructProto,
  structProtoToJson: structProtoToJson
});

/***/ }),

/***/ 0:
/*!**********************!*\
  !*** multi ./app.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./app.js */"./app.js");


/***/ }),

/***/ "@babel/runtime/helpers/asyncToGenerator":
/*!**********************************************************!*\
  !*** external "@babel/runtime/helpers/asyncToGenerator" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/asyncToGenerator");

/***/ }),

/***/ "@babel/runtime/helpers/defineProperty":
/*!********************************************************!*\
  !*** external "@babel/runtime/helpers/defineProperty" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/defineProperty");

/***/ }),

/***/ "@babel/runtime/helpers/typeof":
/*!************************************************!*\
  !*** external "@babel/runtime/helpers/typeof" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/typeof");

/***/ }),

/***/ "@babel/runtime/regenerator":
/*!*********************************************!*\
  !*** external "@babel/runtime/regenerator" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/regenerator");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),

/***/ "dialogflow":
/*!*****************************!*\
  !*** external "dialogflow" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dialogflow");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "googleapis":
/*!*****************************!*\
  !*** external "googleapis" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("googleapis");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),

/***/ "mysql":
/*!************************!*\
  !*** external "mysql" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mysql");

/***/ }),

/***/ "pb-util":
/*!**************************!*\
  !*** external "pb-util" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("pb-util");

/***/ }),

/***/ "request":
/*!**************************!*\
  !*** external "request" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("request");

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("uuid");

/***/ })

/******/ });
//# sourceMappingURL=main.bundle.js.map