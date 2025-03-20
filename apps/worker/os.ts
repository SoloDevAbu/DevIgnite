import db from "@repo/db/client";

const BASE_WORKER_DIR = "/temp/bolty-worker";


if (!Bun.file(BASE_WORKER_DIR).exists()) {
    Bun.write(BASE_WORKER_DIR, "");
}

export async function onFileUpdate(filePath: string, fileContent: string) {
    await Bun.write(`${BASE_WORKER_DIR}/${filePath}`, fileContent);
}

export async function onShellCommand(shellCommand: string) {
    const commands = shellCommand.split("&&")
    for(const command of commands) {
        console.log(`Running command: ${command}`);
        const result = Bun.spawnSync({cmd: command.split(" "), cwd: BASE_WORKER_DIR})
        console.log(result.stdout.toString());
        console.log(result.stderr.toString());
    }
}