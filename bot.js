const Discord = require("discord.js");
const config = require("./config.json");
const auth = require("./auth.json");
const fs = require("fs");
const dir = require('node-dir');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./data/database.sqlite');
const client = new Discord.Client();


// Keep seperate list of servers so bot is usable across multiple servers
let servers = {};

let commands = new Discord.Collection();
let aliases = new Discord.Collection();


//TODO test this
client.on("guildMemberAdd", (member) => {
	if(config.greet_new_members && member.guild.channels.get(config.greeting_channel))
		member.guild.channels.get(config.greeting_channel).send(member + " has joined the server.");
});
client.on("guildMemberLeave", (member) => {
	if(config.farewell_leaving_members && member.guild.channels.get(config.farewell_channel))
		member.guild.channels.get(config.farewell_channel).send(member + " has left the server.");
});


// when the bot reads a message
client.on("message", (message) => {
    //respond with dumb things for certain users
	myArray = ["","","","","","","","","","","","",":angry:",":angry:",":angry:",":rage::rage::rage:",":angry::angry::angry:",":cry:"];
    if(message.author.id == 209497427504398336
        ||  message.author.id == 139123675965161472){
			var rand;
			if(message.author.id == 209497427504398336)
		 		rand = myArray[Math.floor(Math.random() * myArray.length)];
			else rand = myArray[Math.floor(Math.random() * myArray.length-1)];

      if(rand != "")
      	message.channel.send(rand);
      return;
    }

	if(message.guild) {
		if(client.getBlacklist.get(`${message.guild.id}-${message.author.id}`)) return;
	}



	//ignore other bots
    if(message.author.bot) return;

	//check if message starts with config.new_prefix
	if(!message.content.startsWith(config.prefix)) {
		//handle non commands here
		try{
	        let commandFile = require("./points/points-system.js");
	        commandFile.run(client, message, servers);
	    }
	    catch (err) {
	        console.error(err);
	    }
	}
	else {
		//handle commands here

	    // process input and split args for use
	    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	    const command = args.shift().toLowerCase();

	    // call seperate file with command code
	    try{
			let commandFile;
			if(commands.get(command))
	        	commandFile = require(commands.get(command));
			else if(aliases.get(command))
				commandFile = require(aliases.get(command));
			else {
				if(config.verbose)
					message.channel.send(message.author + " invalid command. Type " + config.prefix + "help to see a list of commands.")
				return;
			}


			//check self and sender for permission to perform action, also if can be run in guild
			let hasPermission = checkForPermission(commandFile, message);
	        if(hasPermission) commandFile.run(client, message, servers, args);
	    }
	    catch (err) {
	        console.error(err);
	    }
	}
});




// when the bot comes online
client.on("ready", () => {
	setupSQL();

	//Populate command Collection
	let commandFile = require("./data/commands-setup.js");
	commandFile.run(commands, aliases);

	//Generate help json
	let helpFile = require("./data/help-setup.js");
	helpFile.run(commands);

	client.user.setActivity("!!help");
  	console.log("Bot Online");
});


client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));
client.login(auth.discord_token);













function checkForPermission(commandFile, message) {
	let hasPermission = true;
	commandFile.config.perms.forEach((permission) => {
		if(!message.member.hasPermission(permission)) {
			if(config.verbose)
				message.channel.send(message.author + " you don't have permission to do that.");
			hasPermission = false;
			return hasPermission;
		}
		if(!message.guild.me.hasPermission(permission)) {
			if(config.verbose)
				message.channel.send(message.author + " I don't have permission to do that.");
			hasPermission = false;
			return hasPermission;
		}
	});
	if(!message.guild && commandFile.config.guildOnly) {
		message.channel.send(message.author + " that command can only be used in a Discord server.");
		hasPermission = false;
	}
	if(!commandFile.config.enabled) {
		if(config.verbose) message.channel.send(message.author + " command is disabled.");
		hasPermission = false;
	}
	return hasPermission;
}



function setupSQL() {
	//BEGIN point table setup
	//generate point table and prepare sql commands
	//Notes cause im bad at sqlite
	//count(*) is number of rows that satisfy WHERE clause
	const pointTable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';").get();
	if (!pointTable['count(*)']) {
		// If the table isn't there, create it and setup the database correctly.
	   	sql.prepare("CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER);").run();
	   	// Ensure that the "id" row is always unique and indexed.
	   	sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
	   	sql.pragma("synchronous = 1");
	   	sql.pragma("journal_mode = wal");
	}
	// And then we have two prepared statements to get and set the score data.
	client.getScore = sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
	client.setScore = sql.prepare("INSERT OR REPLACE INTO scores (id, user, guild, points, level) VALUES (@id, @user, @guild, @points, @level);");
	client.top10Scores = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY points DESC LIMIT 10;")
	// END point table setup

	////////////////////////////////////////////////////

	const blacklistTable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name='blacklist';").get();
	if(!blacklistTable['count(*)']) {
		// If the table isn't there, create it and setup the database correctly.
	   	sql.prepare("CREATE TABLE blacklist (id TEXT PRIMARY KEY, user TEXT, guild TEXT);").run();
	   	// Ensure that the "id" row is always unique and indexed.
	   	sql.prepare("CREATE UNIQUE INDEX idx_blacklist_id ON blacklist (id);").run();
	   	sql.pragma("synchronous = 1");
	   	sql.pragma("journal_mode = wal");
	}
	client.getBlacklist = sql.prepare("SELECT * FROM blacklist WHERE id = ?");
	client.setBlacklist = sql.prepare("INSERT OR REPLACE INTO blacklist (id, user, guild) VALUES (@id, @user, @guild);");
	client.delBlacklist = sql.prepare("DELETE FROM blacklist WHERE id = ?")
}
