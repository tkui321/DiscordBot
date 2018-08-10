exports.run = (client, message, servers, args) => {
	var server = servers[message.guild.id];
	server.dispatcher.resume();
}