const { MessageEmbed } = require('discord.js');
module.exports = {
  name:'queue',
  description:'Shows the server queue',
  execute(options)
  {
    if(!options.client.queue.get(options.guild.id) || options.client.queue.get(options.guild.id).videos.length == 0) return options.send('No videos in the queue.');

    let queue = "";
    let valids = [];
    for(var i = 0; i < options.client.queue.get(options.guild.id).videos.length; i++)
    {
      let video = options.client.queue.get(options.guild.id).videos[i];
      valids.push((i+1).toString());
      queue+=`${i+1} - [${video.title}](${video.url})\n`;
    }
    options.send(new MessageEmbed().setTitle(`Server Queue - ${options.guild.name}`).setDescription(queue).setFooter(`Requested By ${options.member.user.tag}`, options.member.user.displayAvatarURL()).setThumbnail(options.client.user.displayAvatarURL()).setTimestamp()).catch(()=>{return}).then(()=>{
      const filter = m => m.member.user.id == options.member.user.id;
      const collector = options.channel.createMessageCollector(filter,{max:1,time:10000});
      collector.on('collect', (msg) => {
        if(!valids.includes(msg.content)) return;
        let targetVideo = options.client.queue.get(options.guild.id).videos[parseInt(msg.content - 1)];
        if(!targetVideo) return;
        options.client.queue.get(options.guild.id).videos.splice(parseInt(msg.content - 1),parseInt(msg.content - 1));
        options.channel.send(`**${targetVideo.title}** removed successfully from the queue ✅`);
      })
    });
  }
}