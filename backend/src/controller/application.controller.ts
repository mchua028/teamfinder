import { Body, Controller, Delete, Get, HttpStatus, Param, Post, UseInterceptors, UploadedFiles, Put, Req, Res, Query } from "@nestjs/common";
import { Application } from "../model/application.schema"
import { ApplicationService } from "../service/application.service";
import { FileFieldsInterceptor, FilesInterceptor } from "@nestjs/platform-express";


//how much of the project and user information should be able to be retrieved? same thing to think about 
//for the project details page



@Controller('/api/v1/application')
export class ApplicationController {
    constructor(private readonly applicationService: ApplicationService){}

    @Post('/addApplication')
    //passed through middleware
    async createApplication(@Res() response, @Req() request, @Body() application: Application) {
        console.log('request.user',request.user);
        const requestBody = {projectId: application.projectId, status: application.status, createdBy: request.user };
        const newApplication = await this.applicationService.createApplication(requestBody);
        return response.status(HttpStatus.CREATED).json({
            newApplication
        })
    }
    // @Get()
    // async readAll(@Res() response, @Req() request): Promise<Object> {
    //     const applications = await this.applicationService.readAllApplications();
    //     return response.status(HttpStatus.OK).json(applications);

    // }

    @Get('/project/:projectId')
    async readProjectApplications(@Param('projectId') projectId, @Res() response, @Req() request): Promise<Object> {
        const myApplications = await this.applicationService.readProjectApplications(projectId);
        return response.status(HttpStatus.OK).json(myApplications);
    }

    @Get('/user')
    async readUserApplications(@Res() response, @Req() request): Promise<Object> {
        const myApplication=await this.applicationService.readUserApplications(request.user);
        return response.status(HttpStatus.OK).json(myApplication);
    }

    @Get('/:id')
    async readOne(@Param('id') id, @Res() response, @Req() request): Promise<Object> {
        const myApplication=await this.applicationService.readOneApplication(id);
        return response.status(HttpStatus.OK).json(myApplication);
    }

    

    @Put('/:id')
    async update(@Res() response, @Param('id') id, @Body() application: Application) {
        
        const updatedApplication = await this.applicationService.update(id, application);
        
        return response.status(HttpStatus.OK).json(updatedApplication)
    }
    //handle exceptions?
    // @Delete('/:id')
    // async delete(@Res() response, @Param('id') id) {
    //     await this.applicationService.delete(id);
    //     return response.status(HttpStatus.OK).json({
    //         user: null
    //     })
    // }
}