exports.run = (client, message, servers, args) => {
	var server = servers[message.guild.id];
	server.dispatcher.pause();
}

exports.help = {
	name: "pause",
	category: "Music",
	usage: "pause",
	help: "Temporarily pause the current song (nonfunctional)",
	dev: false
}

exports.config = {
	enabled: true,
	guildOnly: true,
	permissionLevel: 2,
	aliases: [  ],
	perms: [  ]
};
