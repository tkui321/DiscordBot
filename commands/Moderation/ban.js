const config = require("../../config.json");

exports.run = (client, message, servers, args) => {
	if(!config.allow_moderation) return;
	let target = message.mentions.members.first();
	let reason = args.join(" ");

	if(target.user.bot)
		return message.channel.send("Nice try.");

	if(message.mentions.members.size == 0)
		return message.channel.send(message.author + " you need to mention a user to ban.");

	if(!(message.member.hasPermission("BAN_MEMBERS") && target.bannable))
		return message.channel.send("I'm sorry " + message.author + ", I'm afraid you can't do that");

	if(!message.guild.me.hasPermission("BAN_MEMBERS"))
		return message.channel.send(message.author + " I don't have permission to do that");

	else {
		target.ban(target.user.username + "#" + target.user.discriminator + " was banned by " + message.author.username + "#" + message.author.discriminator + " for reason: " + reason);
		return message.channel.send(message.author + " successfully banned " + target);
	}
}


exports.help = {
	name: "ban",
	category: "Moderation",
	usage: "ban <@user> [reason]",
	help: "Ban a user from this server",
	dev: false
}


exports.config = {
	enabled: true,
	permissionLevel: 4,
	aliases: [  ],
	perms: [ "BAN_MEMBERS" ]
};
