const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");

const categories = {
	Fun: "",
	Functional: "",
	Music: "",
	Moderation: "",
	Points: "",
	Games: ""
};
exports.run = (client, message, servers, args) => {

	//setup on first run
	if(categories["Fun"].length == 0) {
		fs.readdir("./commands/", (err, files) => {
			if(err) console.log(err);
			let jsFiles = files.filter(f => f.endsWith(".js"));
			if(jsFiles.length <= 0){
				console.log("Couldn't find commands.");
			    return;
			}


		  	jsFiles.forEach((f, i) =>{
		    	let command = require(`./${f}`);

				//error handle for a command file that is missing help data
				if(!command.help) return console.log("---Error " + f + " is missing help field---");
				//error handle for category name that does not match with the above categories object
				if(!categories.hasOwnProperty(command.help.category)) return console.log("---Error " + f + " has improper category name---");

				if(!command.help.dev) {
					let field = "***" + command.help.usage + "*** - " + command.help.help + "\n";
					categories[command.help.category] = categories[command.help.category].concat(field);
				}
		  	});

			output(client, message);
		});
	}
	else output(client, message);

}

function output(client, message) {
	const embed = new Discord.RichEmbed()
		.setDescription("Made by quichelorraine#4187\n<> Indicates a necessary parameter, [] indicates an optional one\nDo not type the bracket symbols\nThe current command prefix is **" + config.prefix + "**")
		.setAuthor(client.user.username, client.user.avatarURL)
		.setColor(3447003)
		.setTimestamp()


	for (c in categories) {
		embed.addField("**"+c+"**", categories[c], false);
	}
	message.channel.send({embed});
}

exports.help = {
	name: "help",
	category: "Functional",
	usage: "help",
	help: "You already used it!",
	dev: false
}
