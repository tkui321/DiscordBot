const Discord = require("discord.js");
exports.run = (client, message, servers, args) => {
    const embed = new Discord.RichEmbed()
        .setTitle("This is the title title.")
        .setAuthor(client.user.username, "https://i.imgur.com/lm8s41J.png")
        /*
        * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
        */
        .setColor(3447003)
        .setDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")
        .setFooter("This is the footer.", "http://i.imgur.com/w1vhFSR.png")
        .setImage("http://i.imgur.com/yVpymuV.png")
        .setThumbnail("http://i.imgur.com/p2qNFag.png")
        /*
        * Takes a Date object, defaults to current date.
        */
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
        .addField("Inline Field 3", "Another field.", true);

        message.channel.send({embed});
}