import { JwtService } from '@nestjs/jwt';
import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from './service/user.service';
interface UserRequest extends Request {
    user: any
}
@Injectable()
export class isAuthenticated implements NestMiddleware {
    constructor(private readonly jwt: JwtService, private readonly userService: UserService) { }
    async use(req: UserRequest, res: Response, next: NextFunction) {
        console.log('checking if user is authorized');
        try{

            if (
                req.headers.authorization &&
                req.headers.authorization.startsWith('Bearer')
            ) {
                const token = req.headers.authorization.split(' ')[1];
                const decoded = await this.jwt.verify(token);
                const userName = await this.userService.getOne(decoded.name);
                const userEmail = await this.userService.getOne(decoded.email);
                if (userEmail && userName) {
                    req.user = {name:userName,email:userEmail};
                    next();
                } else {
                    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)

                }
            } else {
                throw new HttpException('No token found', HttpStatus.NOT_FOUND)

            }
        }catch {
         throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
       }
    }
}