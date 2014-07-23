'use strict';

var assert = require('assert');
var Command = require('../');
var _ = require('lodash');
_.mixin(require('congruence'));

describe('node-webmin-command', function () {

  describe('Field', function () {

  });

  describe('Command', function () {

    describe('#validate', function () {
      it('should validate api example', function () {
        var command = {
          name: 'install',
          description: 'Deploy a new xTuple Instance',
          options: {
            user: 'root',
            html: true,
            hide: true,
            timeout: 3600,
            mime: 'text/html',
            order: 1,
            usermin: true,
            env: true
          },
          command: 'sudo xtuple-server',
          fields: {
            'Instance Type': { required: true, quote: false, default: 'dev', prefix: 'install-',
              options: [ 'pilot', 'live' ] },
            'Account Name': { required: true, quote: true, flag: '--xt-name' },
            'xTuple Version': { required: true, quote: true, flag: '--xt-version', default: '4.5.2' },
            'xTuple Edition': { required: true, default: 'Core', options: {
              core: 'Postbooks',
              manufacturing: 'Manufacturing',
              distribution: 'Distribution',
              enterprise: 'Enterprise'
            }},
            'Databases': { required: true, default: 'Demo', type: 'multiselect', options: {
              '--xt-demo': 'Demo',
              '--xt-quickstart': 'Quickstart',
              '--xt-empty': 'Empty'
            }},
            'Admin Password': { type: 'password' },
            'Enable Snapshots': { type: 'boolean', flag: '--pg-snapenable' },
            'Database File': { type: 'remotefile' } 
          }
        };

        assert(Command.validate(command));
      });
    });
  });

});
