require('dotenv').config();
const _ = require('lodash');
// const logger = require('winston');

//discord
const { PORT, DISCORD_BOT_TOKEN } = process.env;
const Discord = require('discord.js');
const client = new Discord.Client();

const commandProcessors = require('../command_processors');
// const commandMap = _.chain(commandProcessors).keyBy('cmd').mapValues('run').value();
console.log(`Discord Bot watching for commands: ${_.keys(commandProcessors)}`);

//register event listeners
client.on('ready', () => console.log(`Speak(Discord) logged in ${client.user.tag}`));

client.on('message', message => {
  let command = _.find(commandProcessors, commandProcessor => _.startsWith(message.content, commandProcessor.cmd));
  if (!command) return;

  //discord does not strip the command from the content
  let toReplace = command.cmd + ' ';
  let result = command.run(_.replace(message.content, toReplace, ''));
  message.channel.send(result);
});

//log into discord
client.login(DISCORD_BOT_TOKEN).catch(console.error);
