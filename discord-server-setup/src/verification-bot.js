import 'dotenv/config';
import { Client, GatewayIntentBits } from 'discord.js';
import { handleSupportInteraction } from './support/discord-flow.js';
import { handleVerificationInteraction } from './verification/discord-flow.js';
import { createVerificationProvider } from './verification/providers.js';

const token = process.env.DISCORD_TOKEN;
const guildId = process.env.DISCORD_GUILD_ID;

if (!token || !guildId) {
  console.error('Configure DISCORD_TOKEN e DISCORD_GUILD_ID no arquivo .env antes de rodar.');
  process.exit(1);
}

const provider = createVerificationProvider();
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once('clientReady', async () => {
  const guild = await client.guilds.fetch(guildId);
  await guild.roles.fetch();
  await guild.channels.fetch();

  console.log(`Bot de verificação e suporte online em: ${guild.name}`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.inGuild() || interaction.guildId !== guildId) {
    return;
  }

  try {
    const handledVerification = await handleVerificationInteraction(interaction, provider);
    if (handledVerification) {
      return;
    }

    await handleSupportInteraction(interaction);
  } catch (error) {
    console.error('Falha ao processar interação:', error);

    const message = 'Não foi possível concluir esta ação agora. Tente novamente ou procure o suporte.';

    if (interaction.deferred || interaction.replied) {
      await interaction.editReply(message).catch(console.error);
      return;
    }

    if (interaction.isRepliable()) {
      await interaction.reply({ content: message, ephemeral: true }).catch(console.error);
    }
  }
});

client.login(token);
