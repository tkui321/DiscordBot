const Discord = require("discord.js");

exports.run = (client, message, servers, args) => {
	const top10 = client.top10Scores.all(message.guild.id);

	// Now shake it and show it! (as a nice embed, too!)
	const embed = new Discord.RichEmbed()
	    .setTitle("Leaderboard")
	    .setAuthor(client.user.username, client.user.avatarURL)
	    .setDescription("The top 10 points leaders!")
	    .setColor(3447003);

	for(const data of top10) {
		if(!client.users.get(data.user)) console.log("---Error a user is missing in the cache---")
	    else embed.addField(client.users.get(data.user).tag, `${data.points} points (level ${data.level})`);
	}
	return message.channel.send({embed});
}


exports.help = {
	name: "leaderboard",
	category: "Points",
	usage: "leaderboard",
	help: "See who the top users are in terms of points",
	dev: false
}

exports.config = {
	enabled: true,
	permissionLevel: 1,
	aliases: [ "highscore" ],
	perms: [  ]
};
