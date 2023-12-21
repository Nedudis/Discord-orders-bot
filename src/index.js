require("dotenv").config();

const { CommandKit } = require('commandkit');
const path = require('node:path');
const {
  Client,
  Partials,
  GatewayIntentBits,
  Collection,
  ActivityType
  } = require("discord.js");

global.client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers], 
    partials: [Partials.Channel, Partials.Message, Partials.Reaction] 
  });

client.commands = new Collection();


new CommandKit({
	client,
	devGuildIds: ["1176554062620131501"],
	devUserIds: ["566325993648685087", "423461200664199168"],
	commandsPath: path.join(`${__dirname}/commands`),
	eventsPath: path.join(`${__dirname}/events`),
	bulkRegister: true
  });



client.login(process.env.VEDTOKEN);
