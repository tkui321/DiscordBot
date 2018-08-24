exports.run = (client, message, servers, args) => {
    message.channel.send("pong!");
}

exports.help = {
	name: "ping",
	category: "Functional",
	usage: "ping",
	help: "Pong!",
	dev: false
}
