import { getFile } from './update/update.ts';
/**
 * @name DiscordTS
 * @description Discord API Wrapper in TypeScript using deno.
 * @authors Mateusz#4711 & dejwidson#0001 & kacperrrooo#8907
 * @git https://github.com/DiscordTS-better-DiscordJS/DiscordTS.v2
 */
export const version = `Alpha-${getFile().version}`;

export * from './src/websocket/WebSocket.ts';
export * from './src/fetch/Api.ts';

export * from './src/models/Client.ts';
export * from './src/models/Message.ts'
export * from './src/models/Embed.ts';
export * from './src/models/Channel.ts';
export * from './src/models/Guild.ts';
export * from './src/models/Collection.ts';
export * from './src/models/User.ts';
export * from './src/models/Member.ts';
export * from './src/models/Role.ts';

export * from './src/models/Permissions/PermissionsBitField.ts';
export * from './src/models/Permissions/Permissions.ts';

export * from './src/types/models/ClientTypes.ts';
export * from './src/types/models/channel.ts';
export * from './src/types/models/guild.ts';
export * from './src/types/models/embed.ts';
export * from './src/types/models/message.ts';
export * from './src/types/models/user.ts';
export * from './src/types/fetch/updateUtil.ts';
export * from './src/types/fetch/fetch.ts';
export * from './src/types/collectors/collectors.ts';

export * from './src/types/permissions/permissions.ts';
export * from './src/types/permissions/permissionsFlags.ts';
export * from './src/types/permissions/permissionsEnum.ts';

export * from './src/utils/BetterCommands.ts';
export * from './src/utils/EventsEmitter.ts';
export * from './src/utils/DiscordTSError.ts';
export * from './src/utils/ConvertSnwoflake.ts';
export * from './src/utils/Collectors/MessagesCollector.ts';