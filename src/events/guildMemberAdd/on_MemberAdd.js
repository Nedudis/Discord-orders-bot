const { EmbedBuilder } = require('discord.js')
module.exports = (member) => {
    const welcomechannel = member.guild.channels.cache.get('1176555755856478230')
    const wembed = new EmbedBuilder()
      .setTitle(`👋 ${member.displayName}`)
      .setDescription("Welcome, <@" + member.id + ">, thank you for coming to `" + member.guild.name + "`!\n" +
                      "Our website: [codemaven.tech](https://codemaven.tech/)")
      .setColor(0x007355)
      .setFooter({text: "CodeMaven",iconURL: "https://cdn.discordapp.com/attachments/1176567324619317329/1178101867822194748/serverlogo.gif?ex=6574ebdd&is=656276dd&hm=6ec343c2f03bd73c84d7fd45944c594a1cd83dfee943e4aa4b4f77825c96603b&"})
      .setTimestamp()
    welcomechannel.send( { embeds: [wembed] } )
}