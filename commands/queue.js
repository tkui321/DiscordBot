const ytdl = require("ytdl-core");
const request = require("request");
const fs = require("fs");
const getYoutubeID = require("get-youtube-id");
const fetchVideoInfo = require("youtube-info");
const config = require("../config.json")



//client



var queue = [];
var isPlaying = false;
var dispatcher = null;
var voiceChannel = null;
var skipReq = 0;
var skippers = [];


exports.run = (client, message, /*servers,*/ args) => {
	if(!args[0]) {
		message.channel.send(message.author + " please provide a link or term to search.");
		return;
	}

	if(!message.member.voiceChannel){
		message.channel.send(message.author + " please enter a voice channel.");
		return;
	}
	
	//add search if not a url

	/*if(!servers[message.guild.id]) servers[message.guild.id] = {
		queue: []
	}*/

	if(/*server.*/queue.length > 0 || isPlaying){
		getID(args, function(id) {
			add_to_queue(/*server,*/ id);
			fetchVideoInfo(id, function (err, videoInfo) {
				if (err) throw new Error(err);
				message.channel.send(message.author + " added **" + videoInfo.title + "** to queue");
			})
		});
	}
	else {
		isPlaying = true;
		getID(args, function(id) {
			/*server.*/queue.push("placeholder");
			playMusic(id, message);
			fetchVideoInfo(id, function (err, videoInfo) {
				if (err) throw new Error(err);
				message.channel.send(message.author + " now playing **" + videoInfo.title + "**");
			});
		});
	}


/*
	var server = servers[message.guild.id];
	server.queue.push(args[0]);

	if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection){
		play(servers, connection, message);
	});*/
}

/*function play(servers, connection, message){
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
}*/

function playMusic(id, message) {
	voiceChannel = message.member.voiceChannel;
	voiceChannel.join().then(function(connection) { //boo! promises bad
		//recreate youtube url as needed for ytdl params
		stream = ytdl("https://www.youtube.com/watch?v=" + id, {filter: "audioonly"}); 

		skipReq = 0;
		skippers = [];
		dispatcher = connection.playStream(stream); 
	});
}

function add_to_queue(/*server,*/ strID) {
	if(isYoutube(strID)) {
		/*server.*/queue.push(getYoutubeID(strID));
	}
	else {
		/*server.*/queue.push(strID);
	}
}

function getID(str, cb) {
	if(isYoutube(str)) {
		console.log("hey");
		cb(getYoutubeID(str));
	}//////NOT WORKING TO FIND VALIDITY CORRECTLY
	else {
		console.log("hello");
		search_video(str, function(id) {
			cb(id);
		});
	}
}

function isYoutube(str) {
	console.log(str.toString());console.log(str.toString());console.log(str.toString());console.log(str.toString());
	return str.toString().toLowerCase().indexOf("youtube.com" > -1);
} 

function search_video(query, callback) {
	request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query) + "&key=" + config.youtube_api_key, function(error, response, body) {
		var json = JSON.parse(body);
		callback(json.items[0].id.videoID);	
	});
}