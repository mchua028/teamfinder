import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
export type UserDocument = User & Document;
@Schema()
export class User {
    @Prop({})
    name: string;
    @Prop({ unique:true, lowercase:true})
    email: string;
    @Prop({})
    password: string
    @Prop({})
    age: number
    @Prop({})
    occupation: string
    @Prop({})
    schOrEmployer: string
    @Prop({})
    purpose: string
    @Prop({})
    skills: [number]
}
export const UserSchema = SchemaFactory.createForClass(User)