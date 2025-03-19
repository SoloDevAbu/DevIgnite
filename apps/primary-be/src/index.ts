import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import db from "@repo/db/client";
import { AuthMiddleware } from './authmiddleware';

const app = express();

app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express.json());

app.post('/project', AuthMiddleware, async (req: Request, res: Response) => {
    const { prompt } = req.body;
    const userId = req.user?.userId as string
    console.log('Received POST /project request with body:', prompt);
    console.log('User ID:', userId);
    try {
        const title = prompt.split("\n")[0];

        const project = await db.project.create({
            data: {
                title,
                user_id: userId
            }
        })
        console.log(project)
        res.status(200).json({
            projectId: project.id
        })
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({
            error: (error as Error).message
        })
    }
})

app.get("/projects", AuthMiddleware, async (req: Request, res: Response) => {
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