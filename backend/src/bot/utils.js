require('dotenv').config();

const { Telegraf } = require('telegraf');
const config = require('./config');

const bot = new Telegraf(process.env.BOT_TOKEN);

async function tgNotifyCoreTeam(message) {
  await Promise.all(config.users.map((user) => bot.telegram.sendMessage(user.userId, message)));
}

async function tgSendMessageByName(name, message) {
  await bot.telegram.sendMessage(
    config.users.find((user) => user.name === name).userId,
    message
  );
}

module.exports = {
  tgNotifyCoreTeam,
  tgSendMessageByName
};
