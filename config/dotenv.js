'use strict';
const path = require('path');

// Get backend IP address from environmental variable stored in .env file
module.exports = function() {
  return {
    clientAllowedKeys: ['HOST'],
    failOnMissingKey: false,
    path: path.join(path.dirname(__dirname), '.env')
  }
};
