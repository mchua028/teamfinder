import { Body, Controller, Delete, Get, HttpStatus, Param, Post, UploadedFiles, Put, Req, Res } from "@nestjs/common";
import { User } from "../model/user.schema";
import { UserService } from "../service/user.service";
import { JwtService } from '@nestjs/jwt';

@Controller('/api/v1/user')
export class UserController {
    constructor(private readonly userService: UserService, private jwtService: JwtService) { }

    @Post('/signup')
    async Signup(@Res() response, @Body() user: User) {
        const token = await this.userService.signup(user, this.jwtService);
        return response.status(HttpStatus.OK).json(token)
    }
    @Post('/login')
    async SignIn(@Res() response, @Body() user: User) {
        const token = await this.userService.signin(user, this.jwtService);
        return response.status(HttpStatus.OK).json(token)
    }
    @Put('/updateProfile')
    async updateProfile(@Res() response, @Req() request, @Body() user: User) {
        const updatedUser = await this.userService.updateProfile(request.user, user);
        return response.status(HttpStatus.OK).json(updatedUser)
    }
    @Get('/retrieveProfile')
    async retrieveProfile(@Res() response, @Req() request) {
        const currentProfile = await this.userService.retrieveProfile(request.user);
        return response.status(HttpStatus.OK).json(currentProfile);
        
    }
}
