const { MessageEmbed } = require('discord.js');
const ytsr = require('ytsr');
const { play } = require('./play');
module.exports = {
  name:'search',
  description:'Search a song title',
  options:[{
    name:'song',
    description:'The target song to search',
    required:true,
    type:3
  }],
  async execute(options)
  {
    const videosTOTAL = await ytsr(options.args.song, {limit:20});
    var videos = [];
    let result = "";
    let entries = [];
    for(var i = 0; i <= 9; i++)
    {
      let v = videosTOTAL.items[i];
      if(v && v.type == 'video') videos.push(v);
    }
    if(videos.length == 0) return options.send('No matching songs found.');
    for(i = 0; i<videos.length;i++)
    {
      entries.push((i+1).toString());
      result+=`${(i+1).toString()} - [${videos[i].title}](${videos[i].url})\n`;
    }
    
    options.send(new MessageEmbed().setTitle('Search Results: '+options.args.song).setDescription(result).setFooter(`Request By ${options.member.user.tag}`, options.member.user.displayAvatarURL({dynamic:true})).setTimestamp().setThumbnail(options.client.user.displayAvatarURL())).then(async()=>{
      const filter = m => m.member.user.id == options.member.user.id;
      const collector = options.channel.createMessageCollector(filter, {time:15000, max:1});
      collector.on('collect', async(collected)=>{
        if(!entries.includes(collected.content)) return;
        const song = videos[parseInt(collected.content - 1)];
        let client = options.client;
    if (!options.member.voice.channel) return options.channel.send('You are not in a voice channel.', { ephemeral: true });
    let citg = await options.guild.fetch(client.user.id);
    if (options.client.queue.get(options.guild.id) && options.client.queue.get(options.guild.id).is_playing == true && citg.voice.channel && citg.voice.channel.id !== options.member.voice.channel.id) return options.channel.send('You must be in the same channel as the bot to play the music', { ephemeral: true });
        options.member.voice.channel.join().then((connection) => {
      if (options.client.queue.get(options.guild.id)) {
        if (options.client.queue.get(options.guild.id).is_playing == true) {
          options.client.queue.get(options.guild.id).videos.push(song);
          options.channel.send(`**Added to queue : ${song.title}**`).catch(() => { return });
        } else {
          options.channel.send(`**Playing : ${song.title}**`).catch(() => { return })
          play(options, connection, song);
        }
      } else {
        options.client.queue.set(options.guild.id, { is_playing: true, dispatcher: null, connection, videos: [], current_video: null, playing_time: Date.now() });
        options.channel.send(`**Playing : ${song.title}**`).catch(() => { return })
        play(options, connection, song);
      }
    }).catch(() => {
      options.channel.send('Can\'t join the channel').catch(() => { return });
    })
      })
    })
  }
}