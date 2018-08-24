exports.run = (client, message, servers, args) => {

	//there are no arguments
	if(!args[0]){
		let score = client.getScore.get(message.author.id, message.guild.id);
		//if score is empty, make one
		if (!score) {
			score = {
				id: `${message.guild.id}-${message.author.id}`,
				user: message.author.id,
				guild: message.guild.id,
				points: 0,
				level: 1
			}
		}
		message.reply(`You currently have **${score.points}**  :angry::dollar: and are level **${score.level}**!`);
		return;
	}
	//there is more than one argument
	else if(args[1]){
		message.channel.send(message.author + "Please only tag a valid member to look up.");
		return;
	}
	//one argument
	else{
		//REMOVE THESE
		if(message.mentions.members.first().id == 139123675965161472){
			message.channel.send(message.mentions.members.first() + ` currently has **0**  :angry::dollar: and is retarded`);
			return;
		}
		if(message.mentions.members.first().id == 209497427504398336){
			message.channel.send(message.mentions.members.first() + ` currently has **0**  :angry::dollar: and is :angry:`);
			return;
		}
		//the one argument is a mention
		let memberID = message.mentions.members.first().id;
		if(memberID) {
			let score = client.getScore.get(memberID, message.guild.id);

			if (!score) {
				score = {
					id: `${message.guild.id}-` + memberID.toString(),
					user: memberID,
					guild: message.guild.id,
					points: 0,
					level: 1
				}
			}

			message.channel.send(message.guild.members.get(memberID) + ` currently has **${score.points}**  :angry::dollar: and is level **${score.level}**!`);
			return;
		}
		else{
			message.channel.send(message.author + "Please tag a valid member to look up.");
			return;
		}

	}
}


exports.help = {
	name: "points",
	category: "Points",
	usage: "points [user]",
	help: "Check your own points or those of another user",
	dev: false
}
