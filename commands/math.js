const request = require('request');
const Discord = require("discord.js");

exports.run = async (client, message, servers, args) => {
	if(!args[0]) message.channel.send(message.author + " add some math to evaluate!");

	let expression = args.join(" ");

	request(`http://api.mathjs.org/v4/?expr=${encodeURIComponent(expression)}&precision=3`, (err,response,body) => {
		if(err) return message.channel.send(message.author + " add some math to evaluate!");
		else {
			message.channel.send({embed: {
				title: expression,
				description: `\`\`\`js\n${body}\n\`\`\``,
				color: 3447003,
				url: "http://mathjs.org/"
			}});
		}
	})
}


exports.help = {
	name: "math",
	category: "Fun",
	usage: "math <function>",
	help: "Evaluate a mathematical function"
}
