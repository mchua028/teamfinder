import { Injectable, HttpException, HttpStatus,
    NotFoundException,
    ServiceUnavailableException, } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "../model/user.schema";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }
    async signup(user: User, jwt: JwtService): Promise<any> {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(user.password, salt);
        const reqBody = {
            name: user.name,
            email: user.email,
            password: hash
        }
        const newUser = new this.userModel(reqBody);
        try{
            const savedUser = await newUser.save();
            console.log('saveduser',savedUser);
            const payload = { name: savedUser.name, email: savedUser.email };
                return {
                    token: jwt.sign(payload),
                };
        }
        catch(e){
            if (e.code===11000){
                throw new HttpException(
                    { message: "User already exists" },HttpStatus.BAD_REQUEST
                  );
            }
            else {
                console.log(e);
                throw new HttpException(
                  { message: "Internal Server Error" },HttpStatus.INTERNAL_SERVER_ERROR
                );
                
            }
        }
        
        //add
        // @ApiResponse({
        //     status: 400,
        //     description: "User already exists or invalid input",
        //   })
    }
    async signin(user: User, jwt: JwtService): Promise<any> {
        const foundUser = await this.userModel.findOne({ email: user.email }).exec();
        if (foundUser) {
            console.log("foundUser:",foundUser);
            const { password } = foundUser;
            console.log("correct password:",password);
            console.log("entered password:",user.password);
            // console.log(await bcrypt.compare(user.password, password));
            if (await bcrypt.compare(user.password, password)) {
                console.log('pw correct');

                const payload = { name: foundUser.name, email: user.email };
                return {
                    token: jwt.sign(payload),
                    name: foundUser.name
                };
            }
            console.log('pw wrong');
            throw new HttpException('Incorrect username or password', HttpStatus.UNAUTHORIZED)
        }
        console.log('username wrong');
        throw new HttpException('Incorrect username or password', HttpStatus.UNAUTHORIZED)
    }
    async getOne(email: string): Promise<any> {
        return await this.userModel.findOne({ email }).exec();
    }
    // async update(id, project: Project): Promise<Project> {
    //     return await this.projectModel.findByIdAndUpdate(id, project, { new: true })
    //     //exceptions?
    // }
    async updateProfile(id: string, user: User): Promise<User> {
        console.log('updating profile for '+id);
        return await this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
    }

    async retrieveProfile(id: string) {
        try {
            const data = await this.userModel.findById(id).exec();
            if (!data) {
                throw new NotFoundException(null, 'ProfileNotFound')
            }
            const profile={
                'age':data.age,
                'occupation':data.occupation,
                'schOrEmployer':data.schOrEmployer,
                'purpose':data.purpose,
                'skills':data.skills
            }
            console.log(profile);
            return profile;

        } catch (e) {
            console.error(e)
            throw new ServiceUnavailableException()
        }
    }

}