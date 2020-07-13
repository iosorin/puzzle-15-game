export class CommandManager {
    static executed = []
    static unexecuted = []

    static execute(cmd) {
        cmd.execute();

        CommandManager.executed.push(cmd);
    }

    static undo() {
        const cmd = CommandManager.executed.pop();

        if (cmd) {
            if (cmd.unexecute) {
                cmd.unexecute();
            }

            CommandManager.unexecuted.push(cmd);
        }
    }

    static redo() {
        let cmd = CommandManager.unexecuted.pop();

        if (cmd === undefined) {
            cmd = CommandManager.executed.pop();
            CommandManager.executed.push(cmd);
        }
        else {
            cmd.execute();
            CommandManager.executed.push(cmd);
        }
    }

}
