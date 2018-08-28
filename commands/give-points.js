const Discord = require("discord.js");
const config = require("../config.json")

exports.run = (client, message, servers, args) => {
	if(message.author.id != config.creatorID || message.author != message.guild.owner.user)
		return message.channel.send(message.author + " you can't do that.");
	if(!message.guild) return; //ignore private messages
	if(args[2]) return message.channel.send(message.author + " that's too many arguments! Just tag the target.");
	let points = parseInt(args[1]);
	if(!points) return message.channel.send(message.author + " set a number of points to give");

	let target = message.mentions.members.first();
	let score = client.getScore.get(target.id, message.guild.id);

	if (!score) {
	  	score = {
	    	id: `${message.guild.id}-${target.id}`,
	    	user: target.id,
	    	guild: message.guild.id,
	    	points: 0,
	    	level: 1
  		}
	}

	score.points += points;
	// Calculate the current level through MATH OMG HALP.
	const curLevel = Math.floor(0.1 * Math.sqrt(score.points));

	client.setScore.run(score);
	message.channel.send(message.author + ` gave **${points}** to ` + target);

	// Check if the user has leveled up, and let them know if they have:
	if(score.level < curLevel) {
  		// Level up!
		score.level = curLevel;
  		message.reply(target + ` leveled up to level **${curLevel}**! Ain't that dandy?`);
	}
}


exports.help = {
	name: "give-points",
	category: "Points",
	usage: "give-points <@user> <points>",
	help: "Give points to tagged user",
	dev: true
}


exports.config = {
	enabled: true,
	guildOnly: true,
	permissionLevel: 5,
	aliases: [  ],
	perms: [  ]
};
