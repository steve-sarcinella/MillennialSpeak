require('dotenv').config();
const _ = require('lodash');

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

  //discord does not strip the command from the content (notice the explicit space)
  let result = command.run(message.content.replace(`${command.cmd} `, ''));
  message.channel.send(result).then(msg => console.log(`Response (${result}) posted in channel ${message.channel.name}`)).catch(console.error);
  message.delete().then(msg => console.log(`Deleted message ${message.content} from ${message.author.username} after successful processing`)).catch(console.error);
});

//log into discord
client.login(DISCORD_BOT_TOKEN).catch(console.error);
