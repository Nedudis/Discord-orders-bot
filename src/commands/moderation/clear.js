const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Deletes a specific amount of messages.')
        .addIntegerOption(option => option
            .setName('amount')
            .setDescription('The amount of messages you want to delete.')
            .setMinValue(1)
            .setMaxValue(100)
            .setRequired(true)),
    run: async ({interaction, client}) => {
        const amount = interaction.options.getInteger('amount');
        const channel = interaction.channel;

        if (!amount) {
            return await interaction.reply({ content: "Please specify the amount of messages you want to delete.", empheral: true });
        }
        if (amount > 100 || amount < 1) {
            return await interaction.reply({ content: "Please select a number *between* **100** and **1**"});
        }
        await interaction.channel.bulkDelete(amount).catch(err => {
            return console.log(err);
        });

        const embed = new EmbedBuilder()
            .setColor('White')
            .setDescription(`:white_check_mark: Deleted \`${amount}\` messages.`)
            .setFooter({ text: `${interaction.user.username}` })
        
        await interaction.reply({ embeds: [embed]})
            .then(msg => {
                setTimeout(() => msg.delete(), 5000)
            })
            .catch(async err => {
                await interaction.reply({content: "Idk, this shit ain't workin\'"});
            })
    },
    options: {
        userPermissions: ['ManageMessages'],
        botPermissions: ['ManageMessages'],
        deleted: false,
    }
}