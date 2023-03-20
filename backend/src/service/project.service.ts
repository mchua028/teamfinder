import {
    Injectable,
    NotFoundException,
    ServiceUnavailableException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Project, ProjectDocument } from "../model/project.schema";
import { createReadStream, statSync } from 'fs';
import { join } from 'path';
import { Request, Response } from 'express';

@Injectable()
export class ProjectService {
    constructor(@InjectModel(Project.name) private projectModel: Model<ProjectDocument>) { }

    async createProject(project: Object): Promise<Project> {
        const newProject = new this.projectModel(project);
        return newProject.save();
    }

    async readMyProjects(id:string): Promise<any> {
        console.log('reading my projects...')
        return await this.projectModel.find({createdBy:id}).exec();
    }

    async readAllProjects(): Promise<any> {
        const projectData = await this.projectModel.find({isOpen:true,vacancies:{ $gt: 0 }}).populate({path:"createdBy",select:["name"]}).exec();
        // if (!projectData || projectData.length == 0) {
        //     throw new NotFoundException('Projects data not found!');
        // }
        return projectData;
    }

    async readProjectsByCategory(category:string): Promise<any> {
        const projectData = await this.projectModel.find({category:category,isOpen:true,vacancies:{ $gt: 0 }}).populate({path:"createdBy",select:["name"]}).exec();
        // if (!projectData || projectData.length == 0) {
        //     throw new NotFoundException('Projects data not found!');
        // }
        return projectData;
    }

    async readOneProject(id: string, response: Response, request: Request) {
        try {
            const data = await this.projectModel.findById(id).populate({path:"createdBy",select:["name"]}).exec();
            if (!data) {
                throw new NotFoundException(null, 'ProjectNotFound')
            }
            console.log('retrieved project:',data);
            return data;

        } catch (e) {
            console.error(e)
            throw new ServiceUnavailableException()
        }
    }

    async update(id, project: Project): Promise<Project> {
        return await this.projectModel.findByIdAndUpdate(id, project, { new: true }).exec();
        //exceptions?
    }
    async delete(id): Promise<any> {
        return await this.projectModel.findByIdAndRemove(id).exec();
    }
}