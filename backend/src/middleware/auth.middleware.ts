import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


declare global {
    namespace Express {
        interface Request {
            userId?: number;
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer')) {
            res.status(401)
            .json({message: 'Unauthorized'});
            return;
        }
        const token = authHeader.split(' ')[1];
        const payload = jwt.verify(
            token, 
            process.env.JWT_SECRET as string) as {userId: number};
        req.userId = payload.userId;
        next();
    } catch (error) {
        res.status(401)
        .json({message: 'Unauthorized', error: error.message});
    }
}