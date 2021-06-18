module.exports = {
  name:'leave',
  description:'Make the bot leaves your voice channel',
  execute(options)
  {
    if(!options.guild.me.voice.channel) return options.send('I\'m not in a voice channel');
    if(options.member.voice.channel && options.guild.me.voice.channel.id !== options.member.voice.channel.id || !options.member.voice.channel) return options.send('You must be in the same voice channel as the bot.');
    if(options.client.queue.get(options.guild.id)){
    options.client.queue.get(options.guild.id).is_playing = false;
    if(options.client.queue.get(options.guild.id).dispatcher !== null){
    options.client.queue.get(options.guild.id).dispatcher.destroy();
    }
    options.client.queue.get(options.guild.id).dispatcher = null;
    options.client.queue.get(options.guild.id).playing_time = Date.now();
    }
    options.client.queue.get(options.guild.id).connection.disconnect();
    options.client.queue.get(options.guild.id).connection = null;
    options.client.queue.get(options.guild.id).videos = [];
    options.send('I leaved the voice channel and the queue has been cleared ✅');
  }
}