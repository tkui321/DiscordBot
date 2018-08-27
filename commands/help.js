const Discord = require("discord.js");
const config = require("../config.json");
const categories = require("../data/help.json");


exports.run = (client, message, servers, args) => {
	if(args[1]) return message.channel.send(message.author + " too many arguments! Try something like " + config.prefix + "help or " + config.prefix + " help fun");

	const embed = new Discord.RichEmbed()
		.setDescription("Made by quichelorraine#4187\n<> Indicates a necessary parameter, [] indicates an optional one\nDo not type the bracket symbols\nThe current command prefix is **" + config.prefix + "**")
		.setAuthor(client.user.username, client.user.avatarURL)
		.setColor(config.embed_color)
		.setTimestamp()


	if(args[0]) {
		let category = args[0].toLowerCase();
		category =category.charAt(0).toUpperCase() + category.slice(1);
		if(categories[category])
			embed.addField("**"+category+"**", categories[category], false);
	}
	else {
		for (c in categories) {
			embed.addField("**"+c+"**", categories[c], false);
		}
	}

	message.channel.send({embed});

}


exports.help = {
	name: "help",
	category: "Functional",
	usage: "help [category]",
	help: "You already used it!",
	dev: false
}
