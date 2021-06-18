const { MessageEmbed } = require('discord.js');
module.exports = {
  name:'help',
  description:'Get some info about the bot and his commands',
  execute(options)
  {
    let embed = new MessageEmbed().setTitle('Help').setColor('#F2342B')
    .setDescription(`The bot uses only slash commands (Commands Starting with /) | Developper: —×ĐÌÇÀPŔÍÒ×— ⚡#0001 | [Invite Link](https://discord.com/oauth2/authorize?client_id=854822210123202560&permissions=2150647808&scope=bot%20applications.commands) | [Support Server](https://discord.gg/G5ZjBQKN5G)\n Website / Dashboard Comming Soon`)
    .addField('Commands',`- Play (song title or url) : Make the bot plays the song or add it in the server queue\n- Playingtime : link np in another bots, shows the current playing song and the playing time\n- Pause : pauses the current song\n- Resume: resumes the current song\n- Skip: skips the currently playing song\nStop: stop playing any song and clears the queue\n-Queue:Shows the server queue, (Bonus Feature) : You can write the index after the queue command to delete that song from it\n-Search (song name) : returns a list of song limited by 10, type the index of any of the videos showed to play it or add it to the queue\n-Invite: Shows the bot invite and the support server link\n- Help : Thats the command you're using now\n- Volime : Adjusts the player volume override the server\n- Join : Make the bot join your voice channel if he is not playing music\n-Leave : Make the bot leaves your voice channel`).setFooter(`Requested By ${options.member.user.tag}`).setTimestamp();
    options.send(embed);
  }
}