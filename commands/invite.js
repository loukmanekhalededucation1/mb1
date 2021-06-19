module.exports = {
  name:'invite',
  description:'Bot invite and support server link',
  execute(options)
  {
    options.client.api.interactions(options.interaction.id,options.interaction.token).callback.post(
     {
       data:{
        type:4,
       flags:64,
       content:'Here is the invite link of the bot and the support server',
      components:[{
        type:1,
        components:[{
          type:2,
          style:5,
          url:'https://discord.com/oauth2/authorize?client_id=854822210123202560&permissions=2150647808&scope=bot%20applications.commands',
          label:'Invite Bot'
        },
        {
          type:2,
          style:5,
          url:'https://discord.gg/G53qNs6m',
          label:'Support Server'
        }]
      }]
    }
  })
}
}
