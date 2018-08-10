const ytdl = require("ytdl-core");
exports.run = (client, message, servers, args) => {
	if(!args[0]) {
		message.channel.sendMessage(message.author + " please provide a link.");
		return;
	}

	if(!message.member.voiceChannel){
		message.channel.sendMessage(message.author + " please provide a link.");
		return;
	}

	if(!servers[message.guild.id]) servers[message.guild.id] = {
		queue: []
	}

	var server = servers[message.guild.id];
	server.queue.push(args[0]);

	if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection){
		play(servers, connection, message);
	});
}

function play(servers, connection, message){
	var server = servers[message.guild.id];
	server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter:"audioonly"}));

	server.queue.shift();
	server.dispatcher.on("end", function() {
		if(server.queue[0]){
			play(servers, connection, message);
		}
		else {
			connection.disconnect();
		}
	});
}