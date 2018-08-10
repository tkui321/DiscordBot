exports.run = (client, message, servers, args) => {
	var server = servers[message.guild.id];
	if(server.dispatcher) server.dispatcher.end();
}