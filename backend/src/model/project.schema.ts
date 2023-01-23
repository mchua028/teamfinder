import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { User } from "./user.schema";  

export type ProjectDocument = Project & Document;
@Schema()
export class Project {
    @Prop()
    title: string;
    @Prop()
    briefDescription: string;
    @Prop()
    coverImage: string;
    @Prop({ default: Date.now() })
    createDate: Date
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    createdBy: User
}
export const ProjectSchema = SchemaFactory.createForClass(Project)