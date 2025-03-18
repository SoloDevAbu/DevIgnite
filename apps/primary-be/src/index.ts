import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import db from "@repo/db/client";

const app = express();

app.use(cors());
app.use(express.json());

app.post('/project', async (req: Request, res: Response) => {
    const { prompt } = req.body;
    const userId = req.user?.userId as string
    try {
        const title = prompt.split("\n")[0];

        const project = await db.project.create({
            data: {
                title,
                user_id: userId
            }
        })
        res.status(200).json({
            projectId: project.id
        })
    } catch (error) {
        res.status(500).json({
            error: (error as Error).message
        })
    }
})

app.get("/projects", async (req: Request, res: Response) => {
    const userId = req.user?.userId as string

    try {
        const projects = await db.project.findMany({
            where: {
                user_id: userId
            }
        })

        res.status(200).json({
            projects
        })
    } catch (error) {
        res.status(500).json({
            error: (error as Error).message
        })
    }
})

app.listen(5000, () => {
    console.log("backend running on PORT 5000")
})