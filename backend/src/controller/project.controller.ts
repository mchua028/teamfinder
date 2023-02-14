import { Body, Controller, Delete, Get, HttpStatus, Param, Post, UseInterceptors, UploadedFiles, Put, Req, Res, Query } from "@nestjs/common";
import { Project } from "../model/project.schema"
import { ProjectService } from "../service/project.service";
import { FileFieldsInterceptor, FilesInterceptor } from "@nestjs/platform-express";

@Controller('/api/v1/project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService){}

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'cover', maxCount: 1 },
    ]))
    //passed through middleware
    async createProject(@Res() response, @Req() request, @Body() project: Project, @UploadedFiles() files: { cover?: Express.Multer.File[] }) {
        const requestBody = { createdBy: request.user, projectName: project.projectName, type:project.type,category:project.category,
            relatedKeywords:project.relatedKeywords, briefDescription: project.briefDescription, progressAndFuture: project.progressAndFuture,
            skills: project.skills, vacancies: project.vacancies };
        const newProject = await this.projectService.createProject(requestBody);
        return response.status(HttpStatus.CREATED).json({
            newProject
        })
    }
    @Get()
    async readAll(@Res() response, @Req() request): Promise<Object> {
        const projects = await this.projectService.readAllProjects();
        return response.status(HttpStatus.OK).json(projects);

    }

    @Get()
    async readMyProjects(@Res() response, @Req() request): Promise<Object> {
        const myProjects = await this.projectService.readMyProjects(request.user);
        return response.status(HttpStatus.OK).json(myProjects);
    }
    
    @Get('/:id')
    async readOne(@Param('id') id, @Res() response, @Req() request) {
        return this.projectService.readOneProject(id, response, request);
    }
    @Put('/:id')
    async update(@Res() response, @Param('id') id, @Body() project: Project) {
        const updatedProject = await this.projectService.update(id, project);
        return response.status(HttpStatus.OK).json(updatedProject)
    }
    //handle exceptions?
    @Delete('/:id')
    async delete(@Res() response, @Param('id') id) {
        await this.projectService.delete(id);
        return response.status(HttpStatus.OK).json({
            user: null
        })
    }
}