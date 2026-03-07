import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../prisma/client';
import { RegisterDto, LoginDto } from './auth.dto';
import { registerSchema, loginSchema } from './auth.validation';
import { Request, Response } from 'express';

export const register = async( req: Request, res: Response) => {
    try {
        const dto = await registerSchema.validate(req.body) as RegisterDto;
        const existingUser = await prisma.user.findUnique({
            where: {email: dto.email}
        });
        if(existingUser) {
            res.status(400)
            .json({message: 'User with this email already exists'});
            return;
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const user = await prisma.user.create({
            data: {
                name: dto.name,
                email: dto.email,
                password: hashedPassword
            }
        });
        const token = jwt.sign(
            {userId: user.id},
            process.env.JWT_SECRET as string,
            {expiresIn: '7d'}
        );
        res.status(201).json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(400)
        .json({message: 'Registration failed', error: error.message});
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const dto = await loginSchema.validate(req.body) as LoginDto;
        const user = await prisma.user.findUnique({
            where: {email: dto.email}
        });

        if(!user) {
            res.status(400)
            .json({message: 'Invalid password or email'})
            return;
        }
        const isPasswordValid = await bcrypt.compare(dto.password, user.password);
        
        if(!isPasswordValid) {
            res.status(400)
            .json({message: 'Invalid password or email'});
            return;
        }

        const token = jwt.sign(
            {userId: user.id},
            process.env.JWT_SECRET as string,
            {expiresIn: '7d'}
        );
        res.status(200)
        .json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(400)
        .json({message: 'Login failed', error: error.message});
    }
}