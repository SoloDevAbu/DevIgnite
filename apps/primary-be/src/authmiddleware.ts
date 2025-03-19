import { NextFunction, Request, Response } from "express";
import { decode } from "next-auth/jwt";
import dotenv from 'dotenv';
dotenv.config();

export const AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies["__Secure-next-auth.session-token"] || req.cookies["next-auth.session-token"];

        if(!token) {
            res.status(404).json({
                message: "No token found"
            })
            return
        }

        const secret = process.env.NEXTAUTH_SECRET;

        if(!secret) throw new Error("NEXTAUTH_SECRET is missing")

        const decodedToken = await decode({ token, secret});
        console.log(decodedToken)

        if(!decodedToken) {
            res.status(401).json({
                message: "Invalid token"
            })
            return
        }

        req.user = {
            userId: decodedToken.dbUserId as string
        }

        console.log(req.user)

        next();
    } catch (error) {
        res.status(500).json({
            error: (error as Error).message
        })
    }
}