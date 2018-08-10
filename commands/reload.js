const config = require("../config.json");
// Reloads a command file if it has been updated, without requiring a bot
// reboot. This command can only be run by me.
exports.run = (client, message, servers, args) => {
	if(message.author.id !== config.creatorID) return;
  	if(!args || args.size < 1) return message.reply("Provide a command name to reload.");
  	// the path is relative to the *current folder*, so just ./filename.js
  	delete require.cache[require.resolve("./${args[0]}.js")];
 	message.reply("${args[0]} has been reloaded");
};

