exports.run = (client, message, servers, [user, reason]) => {
	//TODO add permission check here
	if(!message.member.roles.hasPermission("KICK_MEMBERS"))
		return message.channel.send("I'm sorry " + message.author + 
									", I'm afraid you can't do that");

	if(message.mentions.members.size === 0) {
		return message.channel.send(message.author + 
									" you need to mention a user to kick.");
	}

	if(message.guild.me.hasPermission("KICK_MEMBERS")) {
		var target = message.mentions.members.first();
		return message.channel.send(message.author + " successfully kicked " + target);
	}
	else {
		return message.channel.send("Sorry, " + message.author + 
									" I don't have permission to do that");
	}
}
