import cors from 'cors';
import express from 'express';
import db from "@repo/db/client";
import { GoogleGenerativeAI } from "@google/generative-ai"
import { systemPrompt } from '../systemPrompt';
import { ArtifactProcessor } from '../parser';
import { onFileUpdate, onShellCommand } from '../os';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/prompt', async (req, res) => {
    const { prompt, projectId } = req.body;
    
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
            systemInstruction: systemPrompt
        })
        await db.prompt.create({
            data: {
                content: prompt,
                project_id: projectId,
                type: 'USER'
            }
        });

        const allPrompts = await db.prompt.findMany({
            where: {
                project_id: projectId
            },
            orderBy: {
                created_at: 'asc'
            }
        });

        let artifactProcessor = new ArtifactProcessor("", onFileUpdate, onShellCommand);
        let artifact = "";

        console.log(allPrompts.map((p: any) => ({
            role: p.type === 'USER' ? 'user' : 'model',
            content: p.content
        })));

       const history = allPrompts.map((p: any) => (
            {
                role: p.type === 'USER' ? 'user' : 'model',
                parts: [{text: p.content}]
            }
        ))

       const chat = model.startChat({
        history: history
       })

       const result = await chat.sendMessageStream(prompt);
       for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        process.stdout.write(chunkText);

        artifactProcessor.append(chunkText);
        artifactProcessor.parse();

        artifact += chunkText;
       }

       await db.prompt.create({
        data: {
            content: artifact,
            project_id: projectId,
            type: 'SYSTEM'
        }
       })
        // let response = clinet.messages.stream({
        //     message: allPrompts.map((p: any) => ({
        //         role: p.type === 'USER' ? 'user' : 'assistant',
        //         content: p.content
        //     })),
        //     system: systemPrompt,
        //     max_tokens: 1000,
        //     model: "claude-3-7-sonnet-20250219"
        // }).on('text', (text) => {
        //     artifactProcessor.append(text);
        //     artifactProcessor.parse();
        //     artifact += text;
        // })
        // .on('finalMessage', async (message) => {
        //     console.log('done!');
        //     await db.prompt.create({
        //         data: {
        //             content: message,
        //             project_id: projectId,
        //             type: 'SYSTEM'
        //         }
        //     })
        // })
        // .on('error', (error) => {
        //     console.log("error: ", error);
        // })

        res.json({ response: artifact });
    } catch (error) {
        res.status(500).json({
            error: (error as Error).message
        })
    }
})

app.listen(9090, () => {
    console.log('Worker is running on port 9090');
});
