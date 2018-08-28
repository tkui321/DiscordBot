const config = require("../config.json");

exports.run = (client, message, servers, args) => {
	if(!config.allow_moderation) return;
	//TODO use different permission?
	if(!message.guild) return; //ignore private messages
	if(args[1]) return message.channel.send(message.author + " that's too many arguments! Just tag the target.")

	if(!message.member.hasPermission("ADMINISTRATOR"))
		return message.channel.send(message.author + " you don't have permission to do that.");

	let target = message.mentions.members.first();
	let entry = client.getBlacklist.get(`${message.guild.id}-${target.id}`);

	if(target.user.bot)
		return message.channel.send("Nice try.");

	if (entry) {
	  	client.delBlacklist.run(entry.id);
		message.channel.send(message.author + " successfully whitelisted " + target);
	}
	else{
		message.channel.send(message.author + " you cannot whitelist " + target + " as they are not blacklisted.");
	}
}


exports.help = {
	name: "whitelist",
	category: "Moderation",
	usage: "whitelist <@user>",
	help: "Allow a user to use my commands",
	dev: false
}
