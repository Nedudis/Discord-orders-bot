// UPDATES
const {
    EmbedBuilder
} = require('discord.js')

module.exports = async (message, client) => {
    if (message.author.bot) {
        return true;
    }
    if (message.content === "!updatemsg" && message.member.roles.cache.has("1176555789431869710")) {
        const check_emoji = client.emojis.cache.find(emoji => emoji.name === 'check_mark');
        const updateMsg = new EmbedBuilder()
            .setTitle("SERVER UPDATE 1.01")
            .setDescription(`${check_emoji} **[Discord Server]** - Updated ⁠<#1176566941360586763> channel.\n`+
                            `${check_emoji} **[Discord Server]** - Added <@&1179080905617322025> role.\n` +
                            `${check_emoji} **[Discord Server]** - Added \`Support\` and \`Website creation/design\` to our services menu.\n` +
                            `${check_emoji} **[Website]** - Changed Website Design.`)
            .setFooter({text: 'CodeMaven',
                        iconURL: "https://cdn.discordapp.com/attachments/1176567324619317329/1178101867822194748/serverlogo.gif?ex=6574ebdd&is=656276dd&hm=6ec343c2f03bd73c84d7fd45944c594a1cd83dfee943e4aa4b4f77825c96603b&"})
            .setTimestamp()
        await message.channel.send({ content: `@&1179080905617322025`, embeds: [updateMsg]});
        return true;
    }
}