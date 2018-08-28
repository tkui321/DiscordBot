const ytdl = require("ytdl-core");

exports.run = (client, message, servers, args) => {
	if(!args[0]) {
		message.channel.send(message.author + " please provide a link.");
		return;
	}

	if(!message.member.voiceChannel){
		message.channel.send(message.author + " please enter a voice channel.");
		return;
	}

	//add search if not a url

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
	server.current = server.queue[0];

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

//function isValid(url){
//	return url.toLowerCase().indexOf("youtube.com" > -1);
//} 28:52

function searchVideos() {}



exports.help = {
	name: "queue",
	category: "Music",
	usage: "queue",
	help: "Add a new song to the queue from youtube (nonfunctional)",
	dev: false
}

exports.config = {
	enabled: true,
	guildOnly: true,
	permissionLevel: 2,
	aliases: [ "play" ],
	perms: [  ]
};
