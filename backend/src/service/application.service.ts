import {
    Injectable,
    NotFoundException,
    ServiceUnavailableException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Application, ApplicationDocument } from "../model/application.schema";
import { Project, ProjectDocument } from "../model/project.schema";
import { createReadStream, statSync } from 'fs';
import { join } from 'path';
import { Request, Response } from 'express';

@Injectable()
export class ApplicationService {
    constructor(@InjectModel(Application.name) private applicationModel: Model<ApplicationDocument>,
                @InjectModel(Project.name) private projectModel: Model<ProjectDocument>) { }

    async createApplication(application: Object): Promise<Application> {
        const newApplication = new this.applicationModel(application);
        const data = await this.applicationModel.find({projectId:newApplication.projectId,createdBy:newApplication.createdBy}).exec();
        const projectOwner=(await this.projectModel.findById(newApplication.projectId)).createdBy;
        if(newApplication.createdBy.toString()===projectOwner.toString()){
            throw new Error('Cannot apply to own projects');
        }
        else if(data.length>0){
            throw new Error('Application already exists');
        }
        else{
            return newApplication.save();
        }
    }

    async readOneApplication(id: string) {
        try {
            const data = await this.applicationModel.findById(id).populate({path:"createdBy",select:["name","email","age","occupation","schOrEmployer","purpose","skills"]}).exec();;
            if (!data) {
                throw new NotFoundException(null, 'ApplicationNotFound')
            }
            console.log('retrieved application:',data);
            return data;

        } catch (e) {
            console.error(e)
            throw new ServiceUnavailableException()
        }
    }

    async readUserApplications(userId:string): Promise<any> {
       
        return await this.applicationModel.find({createdBy:userId}).populate({path:"projectId",select:["projectName","type","category","relatedKeywords","briefDescription","progressAndFuture","skills","vacancies","createdBy"]}).populate({path:"projectId",populate:{path:"createdBy",select:['name']}}).exec();
    }

    async readProjectApplications(projectId:string): Promise<any> {
       
        return await this.applicationModel.find({projectId:projectId}).populate({path:"createdBy",select:["name","email","age","occupation","schOrEmployer","purpose","skills"]}).exec();
    }

    async update(id, application: Application): Promise<Application> {
        const currentApplication=await this.applicationModel.findById(id).exec();
        if(!((currentApplication.status.toString()==='NEW'&&application.status.toString()==='OFFERED')||
            (currentApplication.status.toString()==='NEW'&&application.status.toString()==='APPLICATION_REJECTED')||
            (currentApplication.status.toString()==='OFFERED'&&application.status.toString()==='ACCEPTED')||
            (currentApplication.status.toString()==='OFFERED'&&application.status.toString()==='OFFER_REJECTED'))){
            throw new Error('This action is invalid.')
        }
        else{
            const updatedApplication=await this.applicationModel.findByIdAndUpdate(id, application, { new: true }).exec();
            if(application.status.toString()=="ACCEPTED"){
                const projectId=(await this.readOneApplication(id)).projectId;
                await this.projectModel.findByIdAndUpdate(projectId, { $inc: { vacancies: -1 } }, { new: true }).exec();
            }
            return updatedApplication;
        }
        
        //exceptions?
    }
    async delete(id): Promise<any> {
        return await this.applicationModel.findByIdAndRemove(id).exec();
    }
}