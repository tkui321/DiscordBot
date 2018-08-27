const config = require("../config.json");
const categories = require("./help.json");
const fs = require("fs");


exports.run = () => {
	fs.readdir("./commands/", (err, files) => {
		if(err) console.log(err);
		let jsFiles = files.filter(f => f.endsWith(".js"));
		if(jsFiles.length <= 0){
			console.log("Couldn't find commands.");
			return;
		}


		jsFiles.forEach((f, i) =>{
			let command = require(`../commands/${f}`);

			//error handle for a command file that is missing help data
			if(!command.help) return console.log("---Error " + f + " is missing help field---");
			//error handle for category name that does not match with the above categories object
			if(!categories.hasOwnProperty(command.help.category)) return console.log("---Error " + f + " has improper category name---");

			if(!command.help.dev) {
				let field = "***" + command.help.usage + "*** - " + command.help.help + "\n";
				categories[command.help.category] = categories[command.help.category].concat(field);
			}
		});
	});
}
