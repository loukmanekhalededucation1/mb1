const { MessageEmbed } = require('discord.js');
module.exports = {
  name:'playingtime',
  description:'Shows your the time played in the music',
  execute(options)
  {
    if(!options.client.queue.get(options.guild.id) || options.client.queue.get(options.guild.id).is_playing == false) return options.send('Im not playing music.', {ephemeral:true});
    let duration = durationParser(options.client.queue.get(options.guild.id).current_video.duration);
    let pt_inseconds = Math.floor(Date.now() - options.client.queue.get(options.guild.id).playing_time)/1000;
    let playing_time = Math.floor((pt_inseconds * 100) / duration);
    let res = "";
    if(playing_time < 10)
    {
      res = ':radio_button:▬▬▬▬▬▬▬▬▬▬▬';
    }else if (playing_time < 20)
    {
      res = '[▬](https://discord.com/oauth2/authorize?client_id=854822210123202560&permissions=2150647808&scope=bot%20applications.commands):radio_button:▬▬▬▬▬▬▬▬▬▬'
    }else if(playing_time < 30)
    {
      res = '[▬▬](https://discord.com/oauth2/authorize?client_id=854822210123202560&permissions=2150647808&scope=bot%20applications.commands):radio_button:▬▬▬▬▬▬▬▬▬'
    }else if(playing_time < 40)
    {
      res = '[▬▬▬](https://discord.com/oauth2/authorize?client_id=854822210123202560&permissions=2150647808&scope=bot%20applications.commands):radio_button:▬▬▬▬▬▬▬▬'
    }else if(playing_time < 50)
    {
      res = '[▬▬▬▬](https://discord.com/oauth2/authorize?client_id=854822210123202560&permissions=2150647808&scope=bot%20applications.commands):radio_button:▬▬▬▬▬▬▬'
    }else if(playing_time < 60)
    {
      res = '[▬▬▬▬▬▬](https://discord.com/oauth2/authorize?client_id=854822210123202560&permissions=2150647808&scope=bot%20applications.commands):radio_button:▬▬▬▬▬'      
    }
    else if(playing_time < 70)
    {
      res = '[▬▬▬▬▬▬▬](https://discord.com/oauth2/authorize?client_id=854822210123202560&permissions=2150647808&scope=bot%20applications.commands):radio_button:▬▬▬▬'      
    }else if(playing_time < 80)
    {
      res = '[▬▬▬▬▬▬▬▬](https://discord.com/oauth2/authorize?client_id=854822210123202560&permissions=2150647808&scope=bot%20applications.commands):radio_button:▬▬▬'      
    }else if(playing_time < 80)
    {
      res = '[▬▬▬▬▬▬▬▬▬](https://discord.com/oauth2/authorize?client_id=854822210123202560&permissions=2150647808&scope=bot%20applications.commands):radio_button:▬▬'
    }else if(playing_time < 90)
    {
      res = '[▬▬▬▬▬▬▬▬▬▬](https://discord.com/oauth2/authorize?client_id=854822210123202560&permissions=2150647808&scope=bot%20applications.commands):radio_button:▬'
    }else if(playing_time <= 100 || playing_time < 100)
    {
      res = '[▬▬▬▬▬▬▬▬▬▬▬](https://discord.com/oauth2/authorize?client_id=854822210123202560&permissions=2150647808&scope=bot%20applications.commands):radio_button:'
    }

    options.send(new MessageEmbed().setTitle(`Playing Time - ${options.client.queue.get(options.guild.id).current_video.title}`).setDescription(res+' `'+playTimeParser(options.client.queue.get(options.guild.id).playing_time)+' - '+options.client.queue.get(options.guild.id).current_video.duration+'`').setFooter(`Requested by ${options.member.user.tag}`,options.member.user.displayAvatarURL({dynamic:true})).setTimestamp().setThumbnail(options.client.user.displayAvatarURL()));
  }
}

function durationParser(duration)
{
  if(!duration.includes(':')) return duration;
  let split = duration.split(':');
  for(var i = 0; i<split.length; i++){
  split[i] = parseInt(split[i]);
  }
  if(split.length == 2) return parseInt((split[0]*60)+split[1]);
  else if(split.length == 3) return parseInt((split[0]*3600)+(split[1]*60)+split[0]);
  else return parseInt((split[0]*86400)+(split[1]*3600)+(split[2]*60)+split[3]);
}

function playTimeParser(duration)
{
  duration = Math.floor(Date.now() - duration);
  // let days = Math.floor(duration/86400);
  // let hours = Math.floor(duration/3600);
  // let minutes = Math.floor(duration/60);

  // if(days > 0) return `${days}:${Math.floor((duration-(days*86400))/3600)}:${Math.floor(duration-(((days*86400)-Math.floor((duration-(days*86400))/3600))}:${(duration-(days*86400)-((duration-(days*86400))/3600)))}`;
  // if(hours > 0) return `${hours}:${}`
  const {days, hours, minutes, seconds} = convertTime(duration, "ms");
  if(days > 0) return `${days}:${hours}:${minutes}:${seconds}`;
  else if(hours > 0) return `${hours}:${minutes}:${seconds}`;
  else return `${minutes <= 9 ? '0'+minutes : minutes}:${seconds <= 9 ? '0'+seconds : seconds}`;
  }

  function convertTime(number, unit)
  {
  let d, h, m, s

  if (isNaN(number)) {
    throw new TypeError('Value sent to seconds-converter must be a number.')
  }

  if (unit === 'sec' || unit === 'seconds') {
    s = number
  } else if (unit === 'ms' || unit === 'milliseconds' || !unit) {
    s = Math.floor(number / 1000)
  } else {
    throw new TypeError("Unit must be 'sec' or 'ms'")
  }

  m = Math.floor(s / 60)
  s = s % 60
  h = Math.floor(m / 60)
  m = m % 60
  d = Math.floor(h / 24)
  h = h % 24

  return {days: d, hours: h, minutes: m, seconds: s}
}

