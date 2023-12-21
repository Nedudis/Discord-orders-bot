const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder().setName('reload-commands').setDescription('Reloads all global/dev commands'),
    run: async ({ interaction, client, handler }) => {
        await interaction.deferReply();
        await handler.reloadCommands();
        interaction.followUp('Reloaded all commands');
    },
 
    options: {
        devOnly: true,
        guildOnly: true,
        userPermissions: ['Administrator'],
        botPermissions: ['Administrator'],
        deleted: false,
    },
};