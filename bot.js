// Note: I use snake case because I am a C++ native
// whoopsie!


// STARTUP
const Discord = require("discord.js");
const config = require("./config.json");
const auth = require("./auth.json");
const fs = require("fs");
const client = new Discord.Client();


// when the bot comes online
client.on("ready", () => {
  console.log("Bot Online");
});
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

// EVENTS



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
        commandFile.run(client, message, args);
    } 
    catch (err) {
        console.error(err);
    }
/*
    /// Testing Commands
    // call and response command, mostly for testing
    if (command == "ping") {
        message.channel.send("pong!");
    }
    // for testing interpretation of arguments, split by an undefined number of spaces
    else if(command == "argstest"){
        let [a1, a2, a3] = args;
        message.reply("Argument 1: " + a1 + "  Argument 2: " + a2 + "  Argument 3: " + a3);
    }
    // for testing getting users tagged in a command message for targetting
    else if(command == "tag"){
        let user = message.mentions.members.first();
        message.channel.send(user+ "f");
    }


    /// Functional Commands
    // kick a given member if a user has high enough permission to do so
    // also records the kick reason for audit logs if a reason is given
    else if (command == "kick") {
        let user = message.mentions.members.first();
        let reason = args.slice(1).join(" "); // join arguments back together for reason
        message.channel.send(message.author + " kicked " + user + "!");
        user.kick(reason);
    }
    // change the prefix from its '!!' default
    else if (command == "prefix") {
        let new_prefix = message.content.split(" ").slice(1, 2)[0];
        config.prefix = new_prefix;

        fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
    }
*/


    // EXCLUSIVE COMMANDS
    // Commands beyond this point are executed only for me, the author
    //if(message.author.id !== config.creatorID) return;
    // TODO
});

client.login(auth.discord_token);