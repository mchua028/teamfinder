import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { User } from "./user.schema"; 
import { Project } from "./project.schema";  

export type ApplicationDocument = Application & Document;
@Schema({timestamps: true})
export class Application {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Project" })
    projectId: string;
    // @Prop()
    // projectOwnedBy: string;
    @Prop({type: String})
    status: {
        type: string,
        enum: ["NEW","OFFERED","ACCEPTED","OFFER_REJECTED","APPLICATION_REJECTED"]
    };
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    createdBy: User
    @Prop()
    createdAt?: Date
    @Prop()
    updatedAt?: Date
}
export const ApplicationSchema = SchemaFactory.createForClass(Application)