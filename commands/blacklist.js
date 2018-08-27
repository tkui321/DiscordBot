exports.run = (client, message, servers, args) => {
	if(!message.guild) return; //ignore private messages
	if(args[1]) return message.channel.send(message.author + " that's too many arguments! Just tag the target.")

	if(!message.member.hasPermission("ADMINISTRATOR"))
		return message.channel.send(message.author + " you don't have permission to do that.");

	let target = message.mentions.members.first();
	let entry = client.getBlacklist.get(`${message.guild.id}-${target.id}`);

	if (!entry) {
	  	entry = {
	    	id: `${message.guild.id}-${target.id}`,
	    	user: target.id,
	    	guild: message.guild.id,
  		}
	}

	client.setBlacklist.run(entry);
	message.channel.send(message.author + " successfully blacklisted " + target + " from using me.");
}


exports.help = {
	name: "blacklist",
	category: "Moderation",
	usage: "blacklist <@user>",
	help: "Blacklist a user from using my commands",
	dev: false
}
