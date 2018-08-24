exports.run = (client, message, servers, args) => {
	var server = servers[message.guild.id];
	if(server.dispatcher) server.dispatcher.end();
}

exports.help = {
	name: "skip",
	category: "Music",
	usage: "skip",
	help: "Skip the currently playing song on the queue (nonfunctional)",
	dev: false
}
