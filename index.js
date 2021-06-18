const slashCommands = require('discord-with-slash');
const discord = require('discord.js');
const path = require('path');
const fetch = require('node-fetch');
const client = new discord.Client();
client.queue = new discord.Collection();
new slashCommands(client,path.join(__dirname,'commands'), '763170517087027200');

client.on('ready', ( ) => {
  console.log(`${client.user.tag} is ready`);
})

fetch(`https://discord.com/api/v9/guilds/763170517087027200/members?limit=1000`,
{
  method:'get',
  headers:{
    authorization:`Bot ${process.env.token_abdou}`
  }
}).then(res=>res.json()).then(res=>{
  console.log(res);
})

client.on("ready", () => {
  let index = 0;
    const activities_list = [
        `${client.users.cache.size} users | ${client.guilds.cache.size} guilds`,
        `Thunders Esport`,
        `/play`,
    ];
    setInterval(() => {
      if(index == 3) index = 0;
        client.user.setActivity(activities_list[index]);
        index++;
    }, 5000);
  });
  
  client.on('voiceStateUpdate',(old,newone)=>{
    if(newone.member.user.id == client.user.id && newone.channel == null)
    {
      if(client.queue.get(options.guild.id))
      {
        options.client.queue.get(options.guild.id).is_playing = false;
    options.client.queue.get(options.guild.id).dispatcher.destroy();
    options.client.queue.get(options.guild.id).dispatcher = null;
    options.client.queue.get(options.guild.id).connection.disconnect();
    options.client.queue.get(options.guild.id).connection = null;
    options.client.queue.get(options.guild.id).playing_time = Date.now();
    options.client.queue.get(options.guild.id).videos = [];
      }
    }
  })

client.login(process.env.token_abdou);