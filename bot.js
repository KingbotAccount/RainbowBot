const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const suck = JSON.parse(fs.readFileSync('./suck.json', 'utf8'));
const prefix = "r#";
// By M7MD
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag} !`);
          client.user.setActivity("Rainbow , r#help .",{type: 'WATCHING'});
  
  });
client.on("message", message => {
    fs.writeFile('./suck.json', JSON.stringify(suck));
});

client.on('ready', () => {
    setInterval(function(){
        client.guilds.forEach(g => {
            if (suck[g.id]) {
                if (suck[g.id].role) {
                    var role = g.roles.get(suck[g.id].role);
                    if (role) {
                        role.edit({color : "RANDOM"});
                    };
                };
            };
        });
    }, 4000);
})

client.on("message", message => {
    if (!message.content.startsWith(prefix)) return;
    if (message.author.bot) return;
    if (message.channel.type !== "text") return message.reply("This Command Is Only Allowed In Servers");
    var args = message.content.split(" ");
    var command = args[0].slice(prefix.length);
    switch(command) {
        case "set" :
        if(!message.member.hasPermission('ADMINSTRATOR')) return message.channel.send('**للأسف لا تمتلك صلاحية** `ADMINSTRATOR`' );
        message.guild.createRole({name : "RainbowBot .", color : "RANDOM"}).then(r => {
            r.edit({color : "RANDOM"});
            suck[message.guild.id] = {role : r.id};
        });
    };
});
client.on("message", message => {
  if (message.content === "r#help") {
      message.react('🌈')
message.author.send(`**
r#set 
 - لإنشاء رتبة الرينبو وبدا الرينبو
- To create the role of the Rainbow & Start The Rainbow
r#inv 
- لدعوة البوت
- To Invite the bot

خطوات لو الرتبة م أشتغلت .!!
1- ضع رتبة الرينبو فوق الالوان أو الرتب الملونه لو فيه
2- ضع رتبة البوت فوق رتبة الرينبو
The steps of the role did not worked .!!
1- Place the role of the Rainbow above the colors or colored ranks if it
2- Put the bot role above the role of the Rainbow 
رآبط البوت - Bot Invite link
- http://cutt.us/RainbowBott
**`)
  }})
   client.on('message', message => {
	   if(message.content.startsWith(`r#inv`)){
		   if(!message.channel.guild) return message.channel.send("This Command is Just For Servers!")
                 message.react('🌈')
		   var embed = new Discord.RichEmbed()
		   .setTitle(">> ClickHere To Add" + `${client.user.username}` + " <<")
		   .setURL("https://discordapp.com/oauth2/authorize?client_id=" + `${client.user.id}` + "&scope=bot&permissions=2080374975")
		   .setTimestamp()
		   .setFooter(`Requested By | ${message.author.username}`)
		   .setColor("RANDOM")
		   message.author.send({embed})
	   }
   });
client.login(process.env.BOT_TOKEN)
