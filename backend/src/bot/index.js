require('dotenv').config();

const { Telegraf } = require('telegraf');
const config = require('./config');

const {
  tgNotifyCoreTeam,
  tgSendMessageByName
} = require('./utils');

const bot = new Telegraf(process.env.BOT_TOKEN);

console.log('config -> ', config);

// Set bot commands
bot.telegram.setMyCommands([
  {
    command: 'start',
    description: 'Start the bot',
  },
]);

// Send message to Tuomas
// tgSendMessageByName('Tuomas', 'Hello, Tuomas! this is a test message!');

// Send message to Luciano
// tgSendMessageByName('Luciano', 'Hello, Luciano! this is a test message!');

// Send message to Eugene
// tgSendMessageByName('Eugene', 'Hello, Eugene! this is a test message!');

// Send message to all users
// tgNotifyCoreTeam('Hello, this is a test message!');

bot.launch();

// Line break: \n

// TODO: switch to webhook; bot.command uses polling
bot.command('start', (ctx) => {
  console.log(ctx.from);
  bot.telegram.sendMessage(
    ctx.chat.id,
    `Introducing UpWash B2B Telegram Bot, a vital component of 
Fleety software. Access valuable insights on UpWash's B2B 
segment promptly. Empower your business decisions. Explore 
business intelligence, excellence awaits.
    `,
  );
});
