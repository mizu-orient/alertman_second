const { Client, GatewayIntentBits } = require('discord.js');
const { token, channelId ,textId } = require('./config.json');

const client = new Client({ intents: [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent,
	GatewayIntentBits.GuildVoiceStates,
	GatewayIntentBits.GuildMembers,] });

client.once('ready', () => {
	console.log('start alertman');
});

client.on('voiceStateUpdate', (oldState, newState) => {
	const channel = oldState.member.guild.channels.cache.get(channelId);

	if (oldState.channelId === null && newState.channelId !== null) {
		return oldState.member.guild.channels.cache.get(textId).send(`**参加** ${oldState.member.user.tag}が待機中`);
	}
	else if (oldState.channelId !== null && newState.channelId === null) {
		return oldState.member.guild.channels.cache.get(textId).send(`**退出** ${newState.member.user.tag}が退出`);
	}
});

client.login(token);