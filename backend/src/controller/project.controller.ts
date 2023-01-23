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
        const requestBody = { createdBy: request.user.name, title: project.title, briefDescription: project.briefDescription, coverImage: files.cover[0].filename }
        const newProject = await this.projectService.createProject(requestBody);
        return response.status(HttpStatus.CREATED).json({
            newProject
        })
    }
    @Get()
    async readAll(@Query() id): Promise<Object> {
        return await this.projectService.readAllProjects(id);
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