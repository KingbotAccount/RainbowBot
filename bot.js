const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const suck = JSON.parse(fs.readFileSync('./suck.json', 'utf8'));
const prefix = "r#";

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
    }, 1500);
})

client.on("message", message => {
    if (message.author.bot) return;
    var args = message.content.split(" ");
  if (message.content === "r#set") {
        if (message.member.hasPermission("MANAGE_ROLES")) return message.reply("للاسف لا تمتلك صلاحية MANAGE_ROLES");
        message.guild.createRole({name : "rainbow", color : "RANDOM"}).then(r => {
            r.edit({color : "RANDOm"});
            suck[message.guild.id] = {role : r.id};
        });
    };
});
client.on("message", message => {
  if (message.content === "r#help") {
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
client.login(process.env.BOT_TOKEN)
