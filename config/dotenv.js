'use strict';
const path = require('path');

module.exports = function() {
  return {
    clientAllowedKeys: ['HOST'],
    failOnMissingKey: false,
    path: path.join(path.dirname(__dirname), '.env')
  }
};
