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

    async readAllProjects(id): Promise<any> {
        if (id.id) {
            return this.projectModel.findOne({ _id: id.id }).populate("createdBy").exec();
        }
        return this.projectModel.find().populate("createdBy").exec();
    }

    async readOneProject(id: string, response: Response, request: Request) {
        try {
            const data = await this.projectModel.findOne({ _id: id })
            if (!data) {
                throw new NotFoundException(null, 'ProjectNotFound')
            }
            return data;
            // const { range } = request.headers;
            // if (range) {
            //     const { video } = data;
            //     const videoPath = statSync(join(process.cwd(), `./public/${video}`))
            //     const CHUNK_SIZE = 1 * 1e6;
            //     const start = Number(range.replace(/\D/g, ''));
            //     const end = Math.min(start + CHUNK_SIZE, videoPath.size - 1);
            //     const videoLength = end - start + 1;
            //     response.status(206)
            //     response.header({
            //         'Content-Range': `bytes ${start}-${end}/${videoPath.size}`,
            //         'Accept-Ranges': 'bytes',
            //         'Content-length': videoLength,
            //         'Content-Type': 'video/mp4',
            //     })
            //     const vidoeStream = createReadStream(join(process.cwd(), `./public/${video}`), { start, end });
            //     vidoeStream.pipe(response);
            // } else {
            //     throw new NotFoundException(null, 'range not found')
            // }

        } catch (e) {
            console.error(e)
            throw new ServiceUnavailableException()
        }
    }

    async update(id, project: Project): Promise<Project> {
        return await this.projectModel.findByIdAndUpdate(id, project, { new: true })
        //exceptions?
    }
    async delete(id): Promise<any> {
        return await this.projectModel.findByIdAndRemove(id);
    }
}