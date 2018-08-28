const config = require("../config.json");

exports.run = (client, message, servers, args) => {
	message.channel.fetchMessages().then((messages) => {
		const toDelete = messages.filter(msg => msg.author == client.user || msg.content.startsWith(config.prefix));
		message.channel.bulkDelete(toDelete);

		const numDeleted = toDelete.array().length;
		message.channel.send("Successfully cleaned **" + numDeleted + "** messages from this channel.");
	})
	.catch((err) => {
		console.log("---Error in !!clean---");
		console.log(err);
	})
}


exports.help = {
	name: "clean",
	category: "Functional",
	usage: "clean",
	help: "Removes command calls and bot responses from this channel",
	dev: false
}

exports.config = {
	enabled: true,
	permissionLevel: 2,
	aliases: [ "clear" ],
	perms: [ "MANAGE_MESSAGES" ]
};
