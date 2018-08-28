const Discord = require("discord.js");
const videoInfo = require("youtube-info");
const getVideoId = require("get-youtube-id");
const config = require("../config.json");

exports.run = (client, message, servers, args) => {
	// data setup
	var server = servers[message.guild.id]; //get the server that command was run on
	var url = server.current;//get url of current song
	var id = getVideoId(url);//get id from url using npm get-youtube-id
	var info = videoInfo(id);//get meta data from id using npm youtube-info

	// formatting rich embed
	const embed = new Discord.RichEmbed()
        .setTitle(info.title)
        .setAuthor(client.user.username, "https://i.imgur.com/sGcURt3.png")
        .setColor(config.embed_color)
        .setDescription(info.description)
        .setFooter("This is the footer.", "http://i.imgur.com/w1vhFSR.png")
        //.setImage("http://i.imgur.com/yVpymuV.png")
        .setThumbnail(info.thumbnailUrl)
        .setTimestamp()
        .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
        .addField("This is a field title",
          "This is a field value")
        /*
        * Inline fields may not display as inline if the thumbnail and/or image is too big.
        */
        .addField("Inline Field", "They can also be inline.", true)
        /*
        * Blank field, useful to create some space.
        */
        .addBlankField(true)
        .addField(info, "Another field.", true);

        message.channel.send({embed});
}


exports.help = {
	name: "currentsong",
	category: "Music",
	usage: "currentsong",
	help: "Get information about the current song (nonfunctional)",
	dev: false
}


exports.config = {
	enabled: true,
	permissionLevel: 1,
	aliases: [  ],
	perms: [  ]
};
