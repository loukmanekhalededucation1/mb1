module.exports = {
  name:'join',
  description:'Make the bot joins your voice channel',
  execute(options)
  {
    if(!options.member.voice.channel) return options.send("You are not in a voice channel.");
    let t = false;
    options.guild.members.fetch(options.client.user.id).catch(()=>{return t = true}).then((cm)=>{
      if(t == true) return;
      if(cm.voice.channel && cm.voice.channel.id == options.member.voice.channel.id) return options.send('Im already in your voice channel.');
    if(options.client.queue.get(options.guild.id) && options.client.queue.get(options.guild.id).is_playing == true) return options.send('Can\'t call the bot while is playing.');
    let cx = false;
    options.member.voice.channel.join().catch(()=>{
      cx = true;
      options.send('Can\'t join your voice channel, please check my permissions');
    }).then((connection)=>{
      if(cx == true) return;
      if(!options.client.queue.get(options.guild.id))
      options.client.queue.set(options.guild.id, { is_playing: false, dispatcher: null, connection, videos: [], current_video: null, playing_time: Date.now(), paused:false, volume:100 });
      else options.client.queue.get(options.guild.id).connection = connection;
      options.send('Joined successfully ✅');
    })
    });
    
  }
  }
