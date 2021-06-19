//dikhzabrio
const ytsr = require('ytsr');
const ytdl = require('ytdl-core');
module.exports = {
  name: 'play',
  description: 'Plays the given music name or add it to queue',
  options: [{
    name: 'song',
    description: 'The name or the link of the song',
    required: true,
    type: 3
  }],
  async execute(options) {
    let client = options.client;
    if (!options.member.voice.channel) return options.send('You are not in a voice channel.', { ephemeral: true });
    let citg = await options.guild.fetch(client.user.id);
    if (options.client.queue.get(options.guild.id) && options.client.queue.get(options.guild.id).is_playing == true && citg.voice.channel && citg.voice.channel.id !== options.member.voice.channel.id) return options.send('You must be in the same channel as the bot to play the music', { ephemeral: true });

    options.send(`<:youtube:855587882894491678> Searching : **${options.args.song}**`);
    const videos = await ytsr(options.args.song, { limit: 5 });
    let song = null;
    let found = false;
    videos.items.forEach((v) => {
      if (found == true) return;
      if (v.type == 'video') {
        song = v;
        found = true;
      }
    })
    if (song == null) return options.channel.send(`Cannot find that song.`);

    options.member.voice.channel.join().then((connection) => {
      if (options.client.queue.get(options.guild.id)) {
        if (options.client.queue.get(options.guild.id).is_playing == true) {
          options.client.queue.get(options.guild.id).videos.push(song);
          options.channel.send(`**:musical_note: Added to queue : ${song.title}**`).catch(() => { return });
        } else {
          options.channel.send(`:musical_note: **Playing : ${song.title}**`).catch(() => { return })
          play(options, connection, song);
        }
      } else {
        options.client.queue.set(options.guild.id, { is_playing: true, dispatcher: null, connection, videos: [], current_video: null, playing_time: Date.now(), paused:false, volume:100 });
        options.channel.send(`:musical_note: **Playing : ${song.title}**`).catch(() => { return })
        play(options, connection, song);
      }
    }).catch(() => {
      options.channel.send('Can\'t join the channel 🙄').catch(() => { return });
    })


  }
}

async function play(options, connection, song) {
  options.client.queue.get(options.guild.id).connection = connection;
  const dispatcher = await connection.play(ytdl(song.url, { quality: 'highest', filter:'audioonly' }));
  dispatcher.setVolume(options.client.queue.get(options.guild.id).volume / 100);
  options.client.queue.get(options.guild.id).current_video = song;
  options.client.queue.get(options.guild.id).dispatcher = dispatcher;
  options.client.queue.get(options.guild.id).is_playing = true;
  options.client.queue.get(options.guild.id).playing_time = Date.now();
  dispatcher.on('finish', () => {
    options.client.queue.get(options.guild.id).playing_time = Date.now();
    if (options.client.queue.get(options.guild.id).videos[0]) {
      let video = options.client.queue.get(options.guild.id).videos[0];
      options.client.queue.get(options.guild.id).videos.shift();
      play(options, connection, video);
    }
    else {
      options.client.queue.get(options.guild.id).is_playing = false;
    }
  });
  dispatcher.on('error', (err) => {
    console.log(err);
    options.channel.send('An error has been occured while playing the given song 🙄.').catch(() => { return });
    options.client.queue.get(options.guild.id).is_playing = false;
    options.client.queue.get(options.guild.id).dispatcher.destroy();
    options.client.queue.get(options.guild.id).dispatcher = null;
    options.client.queue.get(options.guild.id).connection.disconnect();
    options.client.queue.get(options.guild.id).connection = null;
    options.client.queue.get(options.guild.id).playing_time = Date.now();
    options.client.queue.get(options.guild.id).videos = [];
  })
}
module.exports.play = play;
