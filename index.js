const Discord = require("discord.js"); //aqui você digita npm i discord.js

const ms = require("ms"); //aqui você digita npm i ms

const config = require("./config.json") //você não mexe e a pasta da sua token

const client = new Discord.Client({ 
  intents: [ 
Discord.GatewayIntentBits.Guilds
       ]
    });

    
module.exports = client

client.on('interactionCreate', (interaction) => {

  if(interaction.type === Discord.InteractionType.ApplicationCommand){

      const cmd = client.slashCommands.get(interaction.commandName);

      if (!cmd) return interaction.reply(`Error`);

      interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

      cmd.run(client, interaction)

   }
})


client.on('ready', () => {
console.log("Estou Online")
})

client.slashCommands = new Discord.Collection()

require('./handler/index.js')(client)

client.login(config.token)

