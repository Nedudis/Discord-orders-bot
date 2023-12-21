const {
    ActionRowBuilder,
    ButtonBuilder,
    EmbedBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    Embed,
    ActionRow
} = require('discord.js')

module.exports = async (message, client) => {
    if (message.author.bot) {
        return true;
    }
    if (message.content === 'hey') {
        message.reply('Hi!');
        return true; 
    }
    if (message.content === "!embed" && message.member.roles.cache.has("1176555789431869710")) {
        const menu_options = [
            {
                label: "Support",
                description: "Choose this option if you have any questions",
                value: "support_",
                emoji: "🤝"
            },
            {
                label: "Video editing",
                description: "Choose this option if you need video editing service",
                value: "vid_edit_ser",
                emoji: "🎞"
            },
            {
                label: "Discord bot coding",
                description: "Choose this option if you need discord bot coding service",
                value: "dc_bot_service",
                emoji: "🤖"
            },                  
            {
                label: "Website creation/designing",
                description: "Choose this option if you need website creation service",
                value: "website_C-D_service",
                emoji: "🌐"     
            }                   
        ]
        const menu = new StringSelectMenuBuilder()
            .setCustomId("menu_builder")
            .setPlaceholder('Choose an order...')
            .addOptions(
                menu_options.map((option) =>
                    new StringSelectMenuOptionBuilder()
                        .setLabel(option.label)
                        .setDescription(option.description)
                        .setValue(option.value)
                        .setEmoji(option.emoji)
                )
            )
        const actionrow = new ActionRowBuilder()
            .addComponents(menu)
        const embed = new EmbedBuilder()
                .setTitle("OUR SERVICES")
                .setColor("White")
                .setDescription("We are CodeMaven, your destination for creative and technological solutions! With our team of experienced video editors and highly skilled programmers, we are ready not only to bring your ideas to life but also to give them a digital edge.")
                .setFields([{
                    name: 'Prices:',
                    value: "The prices are different for every order, because every order requires different amount of work."
                }])
                .setFooter({text: 'Thank you for choosing CodeMaven - your partner in creative and technological potential!',
                            iconURL: "https://cdn.discordapp.com/attachments/1176567324619317329/1178101867822194748/serverlogo.gif?ex=6574ebdd&is=656276dd&hm=6ec343c2f03bd73c84d7fd45944c594a1cd83dfee943e4aa4b4f77825c96603b&"})
                .setThumbnail('https://cdn.discordapp.com/attachments/1064547965030637650/1178004442361118831/logob.png?ex=65749121&is=65621c21&hm=2a974168465a49a585f2b5085877887dd504780bc13c3b9c5113a8da3ddbfd30&')
                .setURL('https://www.codemaven.tech')
        await message.channel.send({ embeds: [embed], components: [actionrow] });
        return true;
    }
    if (message.content === '!rules' && message.member.roles.cache.has("1176555789431869710")) {
        const rules_embed = new EmbedBuilder()
            .setTitle('SERVER RULES')
            .setColor(0x007355)
            .setDescription("\u200B")
            .setFields([
                { name: 'General Rule:', value: '\`Be respectful and friendly. We do not tolerate inappropriate behavior, insults, or threats.\`'},
                { name: 'Inappropriate Content Ban:', value: '\`Sharing or displaying inappropriate or offensive content, including vulgar language, images, or videos, is not allowed.\`'},
                { name: 'No Advertising:', value: '\`Server channels are for discussion and communication, so advertising other servers or products without permission is prohibited.\`'}])
            .addFields([
                { name: 'Personal Information Restriction:', value: '\`Do not share other members personal information without their permission.\`'},
                { name: 'Anti-Discrimination Policy:', value: '\`Discrimination or insults based on race, gender, religion, or other personal attributes are not allowed.\`'},
                { name: 'Spam Ban:', value: '\`Do not engage in spam or flood in the channels. Avoid repeating messages unnecessarily or sending meaningless messages.\`'}])
            .addFields([
                { name: 'Proper Channel Usage Rules:', value: '\`Use the appropriate channels for specific discussions or activities.\`'},
                { name: 'Image/Video Rules:', value: '\`Only clean and appropriate images are allowed in server channels.\`'},
                { name: 'Moderator Intervention Rules:', value: '\`Respected moderators have the right to intervene if they observe rule violations or issues.\`'}])
            .addFields([
                { name: 'News and Announcement Posting Rules:', value: '\`News and important announcements will be posted in\`\n<#1176958458470342786>\`.\`'},
                { name: 'Username Rules:', value: '\`Usernames must be appropriate and should not contain offensive or vulgar elements.\`'},
                { name: 'Welcoming New Members Rules:', value: '\`New members should be welcomed and integrated into the community.\`'}])
            .addFields([
                { name: 'Personal Conflict Resolution Rules:', value: '\`If you have personal conflicts with another member, try to resolve them privately or seek assistance from moderators.\`'}])
            .addFields([
                { name: '\u200B', value: 'Please always follow the rules or you will be punished, be respectful of each other.' }
            ]) 
                .setThumbnail('https://cdn.discordapp.com/attachments/1064547965030637650/1178004442361118831/logob.png?ex=65749121&is=65621c21&hm=2a974168465a49a585f2b5085877887dd504780bc13c3b9c5113a8da3ddbfd30&')
                .setFooter({ text: 'Press the button below to verify yourself', iconURL: 'https://cdn.discordapp.com/attachments/1064547965030637650/1178004442361118831/logob.png?ex=65749121&is=65621c21&hm=2a974168465a49a585f2b5085877887dd504780bc13c3b9c5113a8da3ddbfd30&'})
        const verify_button = new ButtonBuilder()
            .setLabel('Verify')
            .setCustomId('verify_button_ID')
            .setStyle('Success')
            .setEmoji('✅')
        const verify_actionrow = new ActionRowBuilder()
            .addComponents(verify_button)
        message.channel.send({ embeds: [rules_embed], components: [verify_actionrow] })
        return true;
    } 
    if (message.content === "!pingmsg" && message.member.roles.cache.has("1176555789431869710")) {
        const ping_embed = new EmbedBuilder()
            .setTitle("PING ROLE")
            .setColor(0x007355)
            .setDescription("The message is intended for those people who want to follow and see all the server news first. <@&1179080905617322025> role is used to inform users about events and updates.")
            .setImage('https://cdn.discordapp.com/attachments/1064547965030637650/1179130410681253998/standard_1.gif?ex=6578a9c5&is=656634c5&hm=7dba9c1967a99916ec243e8de1efbfb901ba8ba70e436c8464d569ed8c7692c1&')
            .setFooter({text: "CodeMaven - To equip this role, just press the button below", iconURL: 'https://cdn.discordapp.com/attachments/1064547965030637650/1178004442361118831/logob.png?ex=65749121&is=65621c21&hm=2a974168465a49a585f2b5085877887dd504780bc13c3b9c5113a8da3ddbfd30&'})
        const ping_button = new ButtonBuilder()
            .setLabel("Equip PING role")
            .setCustomId("ping_role_button_ID")
            .setStyle('Success')
            .setEmoji('📢')
        const ping_actionrow = new ActionRowBuilder()
            .addComponents(ping_button)
        message.channel.send({ embeds: [ping_embed], components: [ping_actionrow] })
        return true;
    }
}