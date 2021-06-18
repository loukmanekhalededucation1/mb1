module.exports = {
  name:'stop',
  description:'Make the bot stop playing music and clears the queue',
  execute(options)
  {
    
    let ca = false;
    options.guild.members.fetch(options.client.user.id).catch(()=>{ca = true;}).then((cm)=>{
      if(ca == true) return;
      if(cm.voice.channel && options.member.voice.channel && cm.voice.channel.id !== options.member.voice.channel.id) return options.send('You must be in the same channel as the bot.');
      if(!options.client.queue.get(options.guild.id) || options.client.queue.get(options.guild.id).is_playing == false) return options.send('The bot is not playing music.');

      options.client.queue.get(options.guild.id).is_playing = false;
      options.client.queue.get(options.guild.id).videos = []
    options.client.queue.get(options.guild.id).dispatcher.destroy();
    options.client.queue.get(options.guild.id).playing_time = Date.now();
    options.send('The bot has stopped from streaming music and the server queue has been cleared.');
    })
  }
}