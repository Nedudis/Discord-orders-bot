const {
    ActionRowBuilder,
    ButtonBuilder,
    EmbedBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    InteractionType,
    ChannelType

} = require('discord.js')

const worker_roles = {
    owner: "1176555789431869710",
    dev: "1179069093568057454",
    support: "1176917773247594686",
    webdev: "1179157737519710208",
    coder: "1177685194304663682",
    editor: "1177683587315793920"
}

const worker_roles_array = [
    '1176555789431869710', //owner
    '1179069093568057454', //developer
    '1176917773247594686', //support
    '1179157737519710208', //web developer
    '1177685194304663682', //coder
    '1177683587315793920' //editor
]

module.exports = async (interaction) => {

    function CheckRoles(interaction) {
        const hasRoles = interaction.member.roles.cache
            .some(r => worker_roles_array.includes(r.id));
        return hasRoles;
    }

    if (interaction.isStringSelectMenu()) {
        if (interaction.customId === "menu_builder") {
// VIDEO EDITING MODAL
            if (interaction.values[0] === "vid_edit_ser") {
                const video_edit_modal = new ModalBuilder()
                    .setTitle("Video editing order form")
                    .setCustomId("vid_edit_modal_ID")
                    .setComponents(
                        new ActionRowBuilder().setComponents(
                            new TextInputBuilder()
                                .setLabel("What do you want in the video?")
                                .setCustomId("video_info_input")
                                .setStyle(TextInputStyle.Paragraph)
                                .setRequired(true)),
                        new ActionRowBuilder().setComponents(
                            new TextInputBuilder()
                                .setLabel("Link to video (youtube, etc.)")
                                .setPlaceholder("Optional (Also you can attach a file later on)")
                                .setCustomId("link_vid_input")
                                .setStyle(TextInputStyle.Short)
                                .setRequired(false)
                            )
                        )
                interaction.showModal(video_edit_modal)
//  DISCORD BOT MODAL
            } else if (interaction.values[0] === "dc_bot_service") {
                const dc_bot_modal = new ModalBuilder()
                    .setTitle("Discord bot order form")
                    .setCustomId("dc_bot_modal_ID")
                    .setComponents(
                        new ActionRowBuilder().setComponents(
                            new TextInputBuilder()
                                .setLabel("What specific tasks should the bot perform?")
                                .setCustomId("bot_info_input")
                                .setStyle(TextInputStyle.Paragraph)
                                .setRequired(true)
                        )
                    );
                interaction.showModal(dc_bot_modal);
// SUPPORT MODAL
            } else if(interaction.values[0] === "support_") {
                const support_modal = new ModalBuilder()
                    .setTitle("Support form")
                    .setCustomId("support_modal_ID")
                    .setComponents(
                        new ActionRowBuilder().setComponents(
                            new TextInputBuilder()
                                .setLabel("What's your question?")
                                .setCustomId("support_question_input")
                                .setStyle(TextInputStyle.Short)
                                .setRequired(true)
                        )
                    );
                interaction.showModal(support_modal);
// WEBSITE MODAL
            } else if(interaction.values[0] === "website_C-D_service") {
                const webdev_modal = new ModalBuilder()
                .setTitle("Website form")
                .setCustomId("website_modal_ID")
                .setComponents(
                    new ActionRowBuilder().setComponents(
                        new TextInputBuilder()
                            .setLabel("What is the purpose of the website?")
                            .setCustomId("website_purpose_input")
                            .setStyle(TextInputStyle.Short)
                            .setRequired(true)
                    )
                );
            interaction.showModal(webdev_modal);
            }
        }
    } else if (interaction.type === InteractionType.ModalSubmit) {
// ****************************************************************************************
// VIDEO EDIT CHANNEL CREATION
        if (interaction.customId === "vid_edit_modal_ID") {

            const server = client.guilds.cache.get("1176554062620131501")

            const newChannel = await server.channels.create({ 
                name: `🎬┃${interaction.user.username}`,
                parent: "1177704258041294990",
                type: ChannelType.GuildText,
                permissionOverwrites: [
                    {id: "1176554062620131501", // EVERYONE
                     deny: ['ViewChannel']},
                    {id: interaction.user.id, // USER
                     allow: ['ViewChannel', 'SendMessages', 'ReadMessageHistory']},
                    {id: "1179069093568057454", // DEVELOPER
                    allow: ['ViewChannel']},
                    {id: "1179157737519710208", // WEB DEVELOPER
                    allow: ['ViewChannel']},
                    {id: "1177685194304663682", // CODER
                    allow: ['ViewChannel']},
                    {id: "1177683587315793920", // EDITOR
                    allow: ['ViewChannel']}
                ]})
            
            await interaction.reply({ content: "The order has been created (🎬)!", ephemeral: true })
            
            const ntembed = new EmbedBuilder()
                .setColor("White")
                .setTitle("Order ticket for the video")
                .setFields([{name: `**Customer**:`, value: `${interaction.user.username}`, inline:true},
                            {name: 'User ID: ', value: `\`${interaction.user.id}\``, inline: true}])
                .addFields([{name:'**Order request**: ', value: `\`${interaction.fields.getTextInputValue('video_info_input')}\``}])
                .setFooter({text: "Please wait patiently, the administration will try to respond to your order as soon as possible."})
                .setTimestamp()

            if(interaction.fields.getTextInputValue('link_vid_input')) {
                ntembed.addFields([{ name: "Link: ", value: `${interaction.fields.getTextInputValue('link_vid_input')}`}])
            } else {
                ntembed.addFields([{ name: "Link: ", value: '\`The link wasn\'t included\`'}])
            }
            const buttonrow = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId("acceptbutton")
                    .setLabel("Take the order")
                    .setStyle("Primary")
                    .setEmoji({ name: "🤝" }),
                new ButtonBuilder()
                    .setCustomId("completebutton")
                    .setLabel("Complete the order")
                    .setStyle('Success')
                    .setEmoji({ name: "✅" }),
                new ButtonBuilder()
                    .setCustomId("closebutton")
                    .setLabel("Close the ticket")
                    .setStyle("Danger")
                    .setEmoji({ name: "❌" }),
            )
            await newChannel.send({ content: `<@&${worker_roles.editor}>` ,embeds: [ntembed], components: [buttonrow] });

// *****************************************************************************************
// DISCORD BOT CHANNEL CREATION
        } else if (interaction.customId === "dc_bot_modal_ID") {
            const server = client.guilds.cache.get("1176554062620131501")
            
            const newChannel = await server.channels.create({ 
                name: `🤖┃${interaction.user.username}`,
                parent: "1177704258041294990",
                type: ChannelType.GuildText,
                permissionOverwrites: [
                    {id: "1176554062620131501", // EVERYONE
                     deny: ['ViewChannel']},
                    {id: interaction.user.id, // USER
                     allow: ['ViewChannel', 'SendMessages', 'ReadMessageHistory']},
                    {id: "1179069093568057454", // DEVELOPER
                    allow: ['ViewChannel']},
                    {id: "1179157737519710208", // WEB DEVELOPER
                    allow: ['ViewChannel']},
                    {id: "1177685194304663682", // CODER
                    allow: ['ViewChannel']},
                    {id: "1177683587315793920", // EDITOR
                    allow: ['ViewChannel']}
                ]})
            await interaction.reply({ content: "The order has been created (🤖)!", ephemeral: true })

            const ntembed = new EmbedBuilder()
                .setColor("White")
                .setTitle("Order ticket for the discord bot")
                .setFields([{name: `**Customer**:`, value: `${interaction.user.username}`, inline: true},
                            {name: 'User ID: ', value: `\`${interaction.user.id}\``, inline: true}])
                .addFields([{name:'**Order request**: ', value: `\`${interaction.fields.getTextInputValue('bot_info_input')}\``}])
                .setFooter({text: "Please wait patiently, the administration will try to respond to your order as soon as possible."})
                .setTimestamp()

            const buttonrow = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId("acceptbutton")
                    .setLabel("Take the order")
                    .setStyle("Primary")
                    .setEmoji({ name: "🤝" }),
                new ButtonBuilder()
                    .setCustomId("completebutton")
                    .setLabel("Complete the order")
                    .setStyle('Success')
                    .setEmoji({ name: "✅" }),
                new ButtonBuilder()
                    .setCustomId("closebutton")
                    .setLabel("Close the ticket")
                    .setStyle("Danger")
                    .setEmoji({ name: "❌" }),
            )
            await newChannel.send({ content:`<@&${worker_roles.coder}>`,embeds: [ntembed], components: [buttonrow] });
// SUPPORT CHANNEL CREATION
        } else if (interaction.customId === "support_modal_ID") {
            const server = client.guilds.cache.get("1176554062620131501")
            
            const newChannel = await server.channels.create({ 
                name: `🤝┃${interaction.user.username}`,
                parent: "1177704258041294990",
                type: ChannelType.GuildText,
                permissionOverwrites: [
                    {id: "1176554062620131501", // EVERYONE
                     deny: ['ViewChannel']},
                    {id: interaction.user.id, // USER
                     allow: ['ViewChannel', 'SendMessages', 'ReadMessageHistory']},
                    {id: "1179069093568057454", // DEVELOPER
                    allow: ['ViewChannel']},
                    {id: "1179157737519710208", // WEB DEVELOPER
                    allow: ['ViewChannel']},
                    {id: "1177685194304663682", // CODER
                    allow: ['ViewChannel']},
                    {id: "1177683587315793920", // EDITOR
                    allow: ['ViewChannel']}
                ]})
            await interaction.reply({ content: "The order has been created (🤝)!", ephemeral: true })

            const ntembed = new EmbedBuilder()
                .setColor("White")
                .setTitle("Support ticket")
                .setFields([{name: `**Customer**:`, value: `${interaction.user.username}`, inline: true},
                            {name: 'User ID: ', value: `\`${interaction.user.id}\``, inline: true}])
                .addFields([{name:'**The problem/question**: ', value: `\`${interaction.fields.getTextInputValue('support_question_input')}\``}])
                .setFooter({text: "Please wait patiently, the administration will try to respond to your order as soon as possible."})
                .setTimestamp()

            const buttonrow = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId("acceptbutton")
                    .setLabel("Take the order")
                    .setStyle("Primary")
                    .setEmoji({ name: "🤝" }),
                new ButtonBuilder()
                    .setCustomId("closebutton")
                    .setLabel("Close the ticket")
                    .setStyle("Danger")
                    .setEmoji({ name: "❌" })
            )
            await newChannel.send({ content:`<@&${worker_roles.owner}>`,embeds: [ntembed], components: [buttonrow] });

        } else if (interaction.customId === "website_modal_ID") {
            const server = client.guilds.cache.get("1176554062620131501")
            
            const newChannel = await server.channels.create({ 
                name: `🌐┃${interaction.user.username}`,
                parent: "1177704258041294990",
                type: ChannelType.GuildText,
                permissionOverwrites: [
                    {id: "1176554062620131501", // EVERYONE
                     deny: ['ViewChannel']},
                    {id: interaction.user.id, // USER
                     allow: ['ViewChannel', 'SendMessages', 'ReadMessageHistory']},
                    {id: "1179069093568057454", // DEVELOPER
                    allow: ['ViewChannel']},
                    {id: "1179157737519710208", // WEB DEVELOPER
                    allow: ['ViewChannel']},
                    {id: "1177685194304663682", // CODER
                    allow: ['ViewChannel']},
                    {id: "1177683587315793920", // EDITOR
                    allow: ['ViewChannel']}
                ]})
            await interaction.reply({ content: "The order has been created (🌐)!", ephemeral: true })

            const ntembed = new EmbedBuilder()
                .setColor("White")
                .setTitle("Website order")
                .setFields([{name: `**Customer**:`, value: `${interaction.user.username}`, inline: true},
                            {name: 'User ID: ', value: `\`${interaction.user.id}\``, inline: true}])
                .addFields([{name:'**Website purpose**: ', value: `\`${interaction.fields.getTextInputValue('website_purpose_input')}\``}])
                .setFooter({text: "Please wait patiently, the administration will try to respond to your order as soon as possible."})
                .setTimestamp()

            const buttonrow = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId("acceptbutton")
                    .setLabel("Take the order")
                    .setStyle("Primary")
                    .setEmoji({ name: "🤝" }),
                new ButtonBuilder()
                    .setCustomId("completebutton")
                    .setLabel("Complete the order")
                    .setStyle('Success')
                    .setEmoji({ name: "✅" }),
                new ButtonBuilder()
                    .setCustomId("closebutton")
                    .setLabel("Close the ticket")
                    .setStyle("Danger")
                    .setEmoji({ name: "❌" }),
            )
            await newChannel.send({ content:`<@&${worker_roles.webdev}>`,embeds: [ntembed], components: [buttonrow] });
// COMPLETING ORDER EMBEDS
        } else if (interaction.customId === "complete_modal_ID") {
            const member_completed_embed = new EmbedBuilder()
                .setTitle("You order has been completed")
                .setDescription('Thank you for buying 🤍🤝')
                .setColor('Aqua')
                .setFields([
                    {name: 'Notes and description:' ,value: `\`${interaction.fields.getTextInputValue('complete_note_ID')}\``}
                ])
                .addFields([
                    {name: 'Closed by:', value: `<@${interaction.user.id}>`, inline: true},
                    {name: 'Opened by:', value: `<@${interaction.fields.getTextInputValue('complete_customer_ID')}>`, inline: true}
                ])
                .addFields([
                    {name: 'Link to completed order: ', value: interaction.fields.getTextInputValue('complete_files_ID'), inline: false}
                ])
                .setFooter({text: 'CodeMaven © 2023',
                            iconURL: "https://cdn.discordapp.com/attachments/1176567324619317329/1178101867822194748/serverlogo.gif?ex=6574ebdd&is=656276dd&hm=6ec343c2f03bd73c84d7fd45944c594a1cd83dfee943e4aa4b4f77825c96603b&"})
                .setTimestamp()
            const user = await client.users.fetch(interaction.fields.getTextInputValue('complete_customer_ID'))
            user.send({ embeds: [member_completed_embed] })
            await interaction.reply({ embeds: [member_completed_embed] });
            interaction.channel.setParent("1177705529137692682");
// CLOSE ORDER EMBEDS
        } else if (interaction.customId === "close_modal_ID") {
            const member_close_embed = new EmbedBuilder()
                .setTitle("You order has been closed")
                .setColor('Aqua')
                .setFields([
                    {name: 'Reason:' ,value: `\`${interaction.fields.getTextInputValue('close_reason_ID')}\``}
                ])
                .addFields([
                    {name: 'Closed by:', value: `<@${interaction.user.id}>`, inline: true},
                    {name: 'Opened by:', value: `<@${interaction.fields.getTextInputValue('close_customer_ID')}>`, inline: true}
                ])
                .setFooter({text: 'CodeMaven © 2023',
                            iconURL: "https://cdn.discordapp.com/attachments/1176567324619317329/1178101867822194748/serverlogo.gif?ex=6574ebdd&is=656276dd&hm=6ec343c2f03bd73c84d7fd45944c594a1cd83dfee943e4aa4b4f77825c96603b&"})
                .setTimestamp()
            const user = await client.users.fetch(interaction.fields.getTextInputValue('close_customer_ID'))
            user.send({ embeds: [member_close_embed] })
            await interaction.reply({ embeds: [member_close_embed] });
            interaction.channel.setParent("1177705529137692682")
        }
// ACCEPT ORDER BUTTON
    } else if (interaction.customId === "acceptbutton") {
        const memberRolesChecked = CheckRoles(interaction)
        console.log(memberRolesChecked);
        if (memberRolesChecked === true) {
            const accepted_embed = new EmbedBuilder()
                .setTitle(`Accepted by: **${interaction.user.username}**`)
                .setColor('Green')
            await interaction.reply({ embeds: [accepted_embed] }); 
        } else if (memberRolesChecked === false) {
            await interaction.reply({ content: "You cannot accept this order", ephemeral: true })
        } else {
            await interaction.reply({ content: `An error occured, please try again later.\nPlease contact <@566325993648685087> for this error`, ephemeral: true })
        }
// CLOSE ORDER BUTTON to MODAL
    } else if (interaction.customId === "closebutton") {
        const memberRolesChecked = CheckRoles(interaction)
        console.log(memberRolesChecked);
        if (memberRolesChecked === true) {
            const close_modal = new ModalBuilder()
                .setTitle("CodeMaven")
                .setCustomId("close_modal_ID")
                .setComponents(
                    new ActionRowBuilder().setComponents(
                        new TextInputBuilder()
                            .setLabel("Close reason")
                            .setCustomId("close_reason_ID")
                            .setStyle(TextInputStyle.Short)
                            .setRequired(true)
                            ),
                    new ActionRowBuilder().setComponents(
                        new TextInputBuilder()
                            .setLabel("Customer discord ID")
                            .setCustomId("close_customer_ID")
                            .setStyle(TextInputStyle.Short)
                            .setRequired(true)
                            )
            )
            interaction.showModal(close_modal)
        } else if (memberRolesChecked === false) {
            await interaction.reply({ content: "You cannot close this order ❌", ephemeral: true })
        } else {
            await interaction.reply({ content: `An error occured, please try again later.\nPlease contact <@566325993648685087> for this error`, ephemeral: true })
        }
// COMPLETE BUTTON to MODAL
    } else if (interaction.customId === "completebutton") {
        const memberRolesChecked = CheckRoles(interaction)
        console.log(memberRolesChecked);
        if (memberRolesChecked === true) {
            const complete_modal = new ModalBuilder()
            .setTitle("CodeMaven")
            .setCustomId("complete_modal_ID")
            .setComponents(
                new ActionRowBuilder().setComponents(
                    new TextInputBuilder()
                        .setLabel("Notes and description: ")
                        .setCustomId("complete_note_ID")
                        .setStyle(TextInputStyle.Paragraph)
                        .setRequired(true)
                        ),
                new ActionRowBuilder().setComponents(
                    new TextInputBuilder()
                        .setLabel("Customer discord ID")
                        .setCustomId("complete_customer_ID")
                        .setStyle(TextInputStyle.Short)
                        .setRequired(true)
                        ),
                new ActionRowBuilder().setComponents(
                    new TextInputBuilder()
                        .setLabel("The link to the ordered files")
                        .setCustomId("complete_files_ID")
                        .setStyle(TextInputStyle.Short)
                        .setRequired(true)
                )
        )
        interaction.showModal(complete_modal)
        } else if (memberRolesChecked === false) {
            await interaction.reply({ content: "You cannot complete the order ❌", ephemeral: true})
        } else {
            await interaction.reply({ content: `An error occured, please try again later.\nPlease contact <@566325993648685087> for this error`, ephemeral: true })
        }
// VERIFY BUTTON
    } else if (interaction.customId === "verify_button_ID") {
        const memberrole = interaction.guild.roles.cache.get("1176555981983981669")
        if (!interaction.member.roles.cache.has('1176555981983981669')) {
            interaction.member.roles.add(memberrole)
            await interaction.reply({ content: "You have verified yourself, you can move on now ✅", ephemeral: true })
        } else {
            await interaction.reply({ content: "You have already verified yourself", ephemeral: true})
        }
// PING BUTTON
    } else if (interaction.customId === "ping_role_button_ID") {
        const ping_role = interaction.guild.roles.cache.get('1179080905617322025')
        if (!interaction.member.roles.cache.has('1176555981983981669')) {
            await interaction.reply({ content: "Verify yourself first, to equip this role.", ephemeral: true })
        } else if (!interaction.member.roles.cache.has('1179080905617322025')) {
            interaction.member.roles.add(ping_role)
            await interaction.reply({ content: "You have equiped Ping role successfully!", ephemeral: true})
        } else {
            await interaction.reply({ content: "You have already equiped this role.", ephemeral: true })
        }
    }
}
