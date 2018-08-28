const dir = require('node-dir');

exports.run = (commands, aliases) => {
	let files = dir.files("./commands/", {sync:true});

	files.forEach((file) => {
		//replace all instance of \ with /
		file = file.replace(/\\/g,"/");
		let command = require("../" + file);
		commands.set(command.help.name, "./" + file);

		command.config.aliases.forEach((alias) => {
			aliases.set(alias, "./" + file);
		});
	});
}
