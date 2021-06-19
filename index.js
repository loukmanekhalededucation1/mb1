const slashCommands = require('discord-with-slash');
const discord = require('discord.js');
const path = require('path');
const client = new discord.Client();
client.queue = new discord.Collection();
new slashCommands(client,path.join(__dirname,'commands'));

client.on('ready', ( ) => {
  console.log(`${client.user.tag} is ready`);
})


client.on("ready", () => {

setInterval(()=>{
   let members = 0;
   client.guilds.cache.forEach((guild)=>{
        
        members+=guild.memberCount;
    })
    client.user.setActivity(`${members} members | ${client.guilds.cache.size}`)
},15000)
    
      
       
   
  });
  
  client.on('voiceStateUpdate',(old,newone)=>{
    if(newone.member.user.id == client.user.id && newone.channel == null)
    {
      if(client.queue.get(newone.guild.id))
      {
        client.queue.get(newone.guild.id).is_playing = false;
        if(client.queue.get(newone.guild.id).dispatcher !== null){
          client.queue.get(newone.guild.id).dispatcher.destroy();
        }
    client.queue.get(newone.guild.id).dispatcher = null;
    if(client.queue.get(newone.guild.id).connection !== null){
    client.queue.get(newone.guild.id).connection.disconnect();
    }
    client.queue.get(newone.guild.id).connection = null;
    client.queue.get(newone.guild.id).playing_time = Date.now();
    client.queue.get(newone.guild.id).videos = [];
      }
    }
  })

client.login(process.env.token_abdou);
