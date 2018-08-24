const owjs = require("overwatch-js");
const Discord = require("discord.js");

const defaultPlatform = "pc";
const defaultRegion = "us";


exports.run = (client, message, servers, args) => {


	if(!args[0]) {
		message.channel.send(message.author + " please provide a player name");
		return;
	}
	else if(!args[1]) {
		const tag = args[0];

	owjs
		.getOverall('pc', 'us', args[0])
		.then((data) => {
			console.dir(data, {depth : 2, colors : true});
			let rateComp = (data.competitive.global.games_won/data.competitive.global.games_played*100).toString().substring(0,4);
			let rateQuick = (data.quickplay.global.games_won/data.quickplay.global.games_played*100).toString().substring(0,4);
			const embed = new Discord.RichEmbed()
					.setTitle(data.profile.nick + "\'s Stats")
					.setAuthor(client.user.username, client.user.avatarURL)
					.addField("Level",data.profile.level,true)
					.addField("Prestige",data.profile.tier,true)
					.addField("Rank",data.profile.rank,true)
					.addBlankField()


					.addField("Competitive",rateComp + "\% Win Rate",false)
					.addField("Most Played", data.competitive.global.masteringHeroe,true)
					.addField("Eliminations",data.competitive.global.eliminations,true)
					.addField("Hero Damage",data.competitive.global.hero_damage_done,true)
					.addField("Healing",data.competitive.global.healing_done,true)
					.addField("Deaths",data.competitive.global.deaths,true)
					.addField("Games Won",data.competitive.global.games_won,true)
					.addField("Games Lost",data.competitive.global.games_lost,true)
					.addField("Games Played",data.competitive.global.games_played,true)
					.addBlankField()


					.addField("Quick Play",false)
					.addField("Most Played", data.quickplay.global.masteringHeroe,true)
					.addField("Eliminations",data.quickplay.global.eliminations,true)
					.addField("Hero Damage",data.quickplay.global.hero_damage_done,true)
					.addField("Healing",data.quickplay.global.healing_done,true)
					.addField("Deaths",data.quickplay.global.deaths,true)
					.addField("Games Won",data.quickplay.global.games_won,true)
					.addField("Games Lost",data.quickplay.global.games_lost,true)
					.addField("Games Played",data.quickplay.global.games_played,true)

					.setColor(3447003)
					.setFooter("If data is not found the user's profile is likely private.", "https://i.imgur.com/UIusJGD.png")
					.setThumbnail(data.profile.avatar)
					.setTimestamp()

					message.channel.send({embed});
		})
		.catch( err => {
            message.channel.send('No player found')
        })
		//.catch(err => {
		//	message.channel.send("No Player Found");
	//	});
	}

}


exports.help = {
	name: "overwatch-stats",
	category: "Games",
	usage: "overwatch-stats <username> [region]",
	help: "Check the overwatch stats of a player (TODO region)",
	dev: false
}
