exports.run = (client, message, servers, args) => {
	let target = message.mentions.members.first();
	let reason = args.join(" ");

	if(client.user == target)
		return message.channel.send("Nice try.");

	if(message.mentions.members.size == 0)
		return message.channel.send(message.author + " you need to mention a user to .");

	if(!(message.member.hasPermission("DEAFEN_MEMBERS")))
		return message.channel.send("I'm sorry " + message.author + ", I'm afraid you can't do that");

	if(!message.guild.me.hasPermission("DEAFEN_MEMBERS"))
		return message.channel.send(message.author + " I don't have permission to do that");

	else {
		let status = !target.serverDeaf;
		target.setDeaf(status, target.user.username + "#" + target.user.discriminator + " was deafened by " + message.author.username + "#" + message.author.discriminator + " for reason: " + reason);
		return message.channel.send(message.author + " successfully deafened " + target);
	}
}

exports.help = {
	name: "deafen",
	category: "Moderation",
	usage: "deafen <@user> [reason]",
	help: "Toggle whether a user is deafened",
	dev: false
}
