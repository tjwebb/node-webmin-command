'use strict';

var _ = require('lodash');
_.mixin(require('congruence'));

var Command = function (command) {

};

var Field = function (command) {

};

Command.defaults = {
  options: {
    html: false,
    hide: false,
    timeout: 30,
    mime: null,
    order: 0,
    usermin: true,
    env: true
  }
};

Field.defaults = {
  required: true,
  quote: true,
  default: '',
  flag: '',
  prefix: '',
  suffix: '',
  options: null,
  type: 'string'
};

Field.template = {
  required: _.isBoolean,
  type: _.isString,
  quote: _.isBoolean,
  default: _.isString,
  flag: _.isString,
  prefix: _.isString,
  suffix: _.isString,
  options: function (options) {
    return _.isEmpty(options) || _.isArray(options) || _.isObject(options);
  }
};

Command.template = {
  name: _.isString,
  description: _.isString,
  options: _.similar({
    user: _.isString,
    html: _.isBoolean,
    hide: _.isBoolean,
    timeout: _.isNumber,
    mime: _.isString,
    order: _.isNumber,
    usermin: _.isBoolean,
    env: _.isBoolean
  }),
  command: _.isString,
  fields: function (fields) {
    return _.isObject(fields) && _.all(fields, Field.validate);
  }
};

Field.validate = function (field) {
  return _.congruent(Field.template, _.merge({ }, Field.defaults, field));
};

Command.validate = function (command) {
  return _.congruent(Command.template, _.merge({ }, Command.defaults, command));
};

Command.prototype.install = function () {

};

module.exports = Command;
