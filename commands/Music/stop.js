exports.run = (client, message, servers, args) => {
	var server = servers[message.guild.id];
	if(message.guild.voiceConnection) {
		for(var i = server.queue.length - 1; i >= 0; i--) {
			server.queue.splice(i, 1);
		}
		server.dispatcher.end();
		message.member.voiceChannel.leave();
	}
}


exports.help = {
	name: "stop",
	category: "Music",
	usage: "stop",
	help: "Stop the queue and remove all songs (nonfunctional)",
	dev: false
}

exports.config = {
	enabled: true,
	guildOnly: true,
	permissionLevel: 3,
	aliases: [  ],
	perms: [  ]
};
