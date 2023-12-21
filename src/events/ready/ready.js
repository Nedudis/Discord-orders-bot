const { ActivityType } = require('discord.js')
module.exports = (c, client, handler) => {
    console.log(`${c.user.username} is ready!`);
    client.user.setPresence({
        status: 'online',
        activities: [{
            type: ActivityType.Watching,
            name: "⇒ codemaven.tech"
        }]
    })
};