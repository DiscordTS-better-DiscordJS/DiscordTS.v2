import { Collection } from '../models/Collection.ts';
import { DiscordTSError } from './DiscordTSError.ts';

/**
 * Class representing BetterCommands utility
 */
export class BetterCommands<CommandInterface> {

    commands: Collection<string, CommandInterface>
    aliases: Collection<string | any, string | any>

    /**
     * Create utility
     */
    constructor () {
        this.commands = new Collection();
        this.aliases = new Collection();
    }

    /**
     * Add a command into collection
     * @param {{ name: string, command: * }} data - Setter input.
     */
    set add (data: { name: string, command: CommandInterface }) {
        try {
            this.commands.set(data.name, data.command);
        } catch (e) {
            throw new DiscordTSError('BetterCommands', `${e}`);
        }

    }

    /**
     * Get command from collection
     * @param {string} name - Command name (or alias)
     * @return {* | undefined} - Returns custom command interface or undefined
     */
    get (name: string): CommandInterface | undefined {
        if (this.commands.has(name)) return this.commands.get(name);
        else if (this.aliases && this.aliases.has(name)) return this.commands.get(this.aliases.get(name));
        else return undefined;
    }

}