'use strict';

import BaseTypes from 'sequelize/lib/data-types';
import util from 'util';

var TIMESTAMP = function() {
    if (!(this instanceof TIMESTAMP)) {
        return new TIMESTAMP();
    }

    BaseTypes.ABSTRACT.apply(this, arguments);
};

util.inherits(TIMESTAMP, BaseTypes.ABSTRACT);

TIMESTAMP.prototype.key = TIMESTAMP.key = 'TIMESTAMP';

export default TIMESTAMP;