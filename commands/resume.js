module.exports = {
  name:'resume',
  description:'Resumes the current song',
  execute(options){
    if(!options.guild.me.voice.channel || options.client.queue.get(options.guild.id) && options.client.queue.get(options.guild.id).is_playing == false) return options.send('I\'m not playing music.');
    if(options.member.voice.channel && options.guild.me.voice.channel.id !== options.member.voice.channel.id) return options.send('You must be in the same voice channel as me.');
    if(options.client.queue.get(options.guild.id).paused == false) return options.send('The song is not paused');
    options.client.queue.get(options.guild.id).dispatcher.resume();
    options.send('Resumed ✅');
    options.client.queue.get(options.guild.id).paused = false;
  }
}