// Note: I use snake case because I am a C++ native
// whoopsie!


// STARTUP
const Discord = require("discord.js");
const config = require("./config.json");
const auth = require("./auth.json");
const fs = require("fs");
const client = new Discord.Client();

// Keep seperate list of servers so bot is usable across multiple servers
var servers = {};


// EVENTS
/*
// add events from /events folder to each event
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    //TODO can the below allow access to file system?
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    // call events with arguments after `client` var.
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});
*/




// when the bot reads a message
client.on("message", (message) => {
    // filter out messages that are made by bots or do not use the prefix
    // defined for this bot as per config.json
    if(message.author.bot || !message.content.startsWith(config.prefix)) return;


    /////////// COMMANDS ///////////
    /// Input Handling
    // process input and split args for use
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // call seperate file with command code
    try{
        let commandFile = require("./commands/"+command+".js");
        commandFile.run(client, message, /*servers,*/ args);
    } 
    catch (err) {
        console.error(err);
    }
});

client.login(auth.discord_token);

/*

    /// Functional Commands
    // kick a given member if a user has high enough permission to do so
    // also records the kick reason for audit logs if a reason is given
   
    // change the prefix from its '!!' default
    else if (command == "prefix") {
        let new_prefix = message.content.split(" ").slice(1, 2)[0];
        config.prefix = new_prefix;

        fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
    }
*/

// when the bot comes online
client.on("ready", () => {
  console.log("Bot Online");
});