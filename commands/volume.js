module.exports = {
  name:'volume',
  description:'Set the bot streaming volume',
  options:[{
    name:'volume',
    description:'The volume to set',
    required:false,
    type:4
  }],
  execute(options){
    if(options.args.volume){
      if(options.args.volume > 250) return options.send('Can\'t set a higher volume than 200.');
    if(!options.guild.me.voice.channel || options.client.queue.get(options.guild.id) && options.client.queue.get(options.guild.id).is_playing == false) return options.send('I\'m not playing music.');
    if(options.member.voice.channel && options.guild.me.voice.channel.id !== options.member.voice.channel.id) return options.send('You must be in the same voice channel as me.');
    options.client.queue.get(options.guild.id).dispatcher.setVolume(options.args.volume / 100);
    options.client.queue.get(options.guild.id).volume = options.args.volume;
    options.send(`Volume set to **${options.args.volume}%**`)
    }else{
      if(options.client.queue.get(options.guild.id)){
      options.send(`Streaming volume is **${options.client.queue.get(options.guild.id).volume}%**`);
      }else{
        options.send(`Streaming volume is **100%**`)
      }
    }
  }
}