const { play } = require('./play.js');
module.exports = {
  name:'skip',
  description:'Skips the current song',
  execute(options)
  {
    options.guild.members.fetch(options.client.user.id).then((cm)=>{
      if(cm.voice.channel && options.member.voice.channel && cm.voice.channel.id !== options.member.voice.channel.id) return options.send('You must be in the same channel as the bot.');
      if(options.client.queue.get(options.guild.id).is_playing == false) return options.send('The bot is not playing music.');
    if(options.client.queue.get(options.guild.id).videos.length == 0){
      options.client.queue.get(options.guild.id).is_playing = false;
      options.client.queue.get(options.guild.id).dispatcher.destroy();
      options.client.queue.get(options.guild.id).playing_time = 0;
      options.send('Skipped successfully ✅')
    }else{
      options.client.queue.get(options.guild.id).dispatcher.destroy();
      options.client.queue.get(options.guild.id).playing_time = 0;
      let vid = options.client.queue.get(options.guild.id).videos[0];
      options.client.queue.get(options.guild.id).videos.shift();
      play(options,options.client.queue.get(options.guild.id).connection,vid);
      options.send('Skipped successfully ✅')
    }
    }).catch(()=>{return});
  }
}