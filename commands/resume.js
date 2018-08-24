exports.run = (client, message, servers, args) => {
	var server = servers[message.guild.id];
	server.dispatcher.resume();
}


exports.help = {
	name: "resume",
	category: "Music",
	usage: "resume",
	help: "Resume the queue if it was paused (nonfunctional)",
	dev: false
}
