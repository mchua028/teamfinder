import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { User } from "./user.schema";  

export type ProjectDocument = Project & Document;
@Schema({timestamps: true})
export class Project {
    @Prop()
    projectName: string;
    @Prop()
    type: string;
    @Prop()
    category: string;
    @Prop()
    relatedKeywords: [string];
    @Prop()
    briefDescription: string;
    @Prop()
    progressAndFuture: string;
    @Prop()
    skills: [string];
    @Prop()
    vacancies: number;

    @Prop()
    filledVacancies: number;
    @Prop()
    coverImage: string;
    @Prop()
    isOpen: boolean;
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    createdBy: User
    @Prop()
    createdAt?: Date
    @Prop()
    updatedAt?: Date
}
export const ProjectSchema = SchemaFactory.createForClass(Project)