const _ = require('lodash');

const commandProcessors = require('../command_processors');
const commands = _.chain(commandProcessors).keyBy('cmd').mapValues('run').value();

module.exports = class BaseController {
  constructor() {
    console.log(`Commands registered: ${_.keysIn(commands)}`);
  }

  getCommandProcessors() {
    return commandProcessors;
  }

  getCommands() {
    return commands;
  }

  getCommandKeys() {
    return _.keysIn(commands);
  }
}
