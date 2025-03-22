import db from "@repo/db/client";
import * as fs from 'fs/promises';
import { execSync } from 'child_process';
import * as path from 'path';
const BASE_WORKER_DIR = "/temp/bolty-worker";

async function initialize() {
    try {
        await fs.access(BASE_WORKER_DIR);
    } catch {
        await fs.mkdir(BASE_WORKER_DIR, { recursive: true });
    }
}

(async () => {
    await initialize();
})();

export async function onFileUpdate(filePath: string, fileContent: string) {
    const fullPath = path.join(BASE_WORKER_DIR, filePath);
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.writeFile(fullPath, fileContent);
}

export async function onShellCommand(shellCommand: string) {
    const commands = shellCommand.split("&&");
    for(const command of commands) {
        console.log(`Running command: ${command}`);
        try {
            const result = execSync(command, { 
                cwd: BASE_WORKER_DIR,
                stdio: 'pipe'
            });
            console.log(result.toString());
        } catch (error: any) {
            console.error(error.stderr?.toString());
        }
    }
}