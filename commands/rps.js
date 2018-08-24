exports.run = (client, message, servers, args) => {
	let rps = ["rock","paper","scissors"];
	let myIndex = Math.floor(Math.random() * rps.length);

	let playerInput = args[0].toString().toLowerCase();
	let playerIndex = -1;

	for(var i = 0; i < rps.length; i++) {
		if(playerInput == rps[i])
			playerIndex = i;
	}

	if(playerIndex == -1)
		return message.channel.send("Pick rock, paper, or scissors");

	let output = ["You win","I win","Draw"][(playerIndex-myIndex+2)%3];
	message.channel.send("You chose: **" + playerInput + "**   |   I chose: **" + rps[myIndex] + "**");
	message.channel.send(output);
}


exports.help = {
	name: "rps",
	category: "Fun",
	usage: "rps <rock|paper|scissors>",
	help: "Play rock paper scissors with the bot!",
	dev: false
}
