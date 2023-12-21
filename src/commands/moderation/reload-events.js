const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder().setName('reload-events').setDescription('Reloads all events'),
    run: async ({ interaction, client, handler }) => {
        await interaction.deferReply();
        await handler.reloadEvents();
        interaction.followUp('Reloaded all events');
    },

    options: {
        devOnly: true,
        guildOnly: true,
        userPermissions: ['Administrator'],
        botPermissions: ['Administrator'],
        deleted: false,
    },
};