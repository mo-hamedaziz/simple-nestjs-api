/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['auth-user'] as string;

    if (!authHeader) {
      throw new UnauthorizedException('Access denied! Token is missing.');
    }

    try {
      const jwtSecret = this.configService.get<string>('JWT_SECRET');
      const decoded = jwt.verify(authHeader, jwtSecret) as { userId: string };
      if (!decoded.userId) {
        throw new UnauthorizedException('Invalid token. No userId found.');
      }
      req['userId'] = decoded.userId;
      next();
    } catch (error) {
      console.log('Error', error);
      throw new UnauthorizedException('Invalid or expired token.');
    }
  }
}