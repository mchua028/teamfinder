import { Module, RequestMethod, MiddlewareConsumer } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

// import { FirebaseModule } from "./firebase/firebase.module";
// import { UsersModule } from "./users/users.module";
// import { TryModule } from './try/try.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { secret } from './utils/constants';

import { ServeStaticModule } from '@nestjs/serve-static';
import { ProjectController } from './controller/project.controller';
import { ProjectService } from './service/project.service';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { ApplicationService } from "./service/application.service";
import { ApplicationController } from "./controller/application.controller";
import { Project, ProjectSchema } from './model/project.schema';
import { User, UserSchema } from './model/user.schema';
import { Application, ApplicationSchema } from './model/application.schema'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { isAuthenticated } from './app.middleware';

require('dotenv').config();

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    
    // MulterModule.register({
    //   storage: diskStorage({
    //     destination: './public',
    //     filename: (req, file, cb) => {
    //       const ext = file.mimetype.split('/')[1];
    //       cb(null, `${uuidv4()}-${Date.now()}.${ext}`);
    //     },
    //   })
    // }),
    JwtModule.register({
      secret,
      signOptions: { expiresIn: '2h' },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
    MongooseModule.forFeature([{ name: Application.name, schema: ApplicationSchema }]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],

  controllers: [AppController, ProjectController, UserController,ApplicationController],
  providers: [AppService, ProjectService, UserService,ApplicationService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(isAuthenticated)
      .exclude(
        'api/v1/user/login',
        'api/v1/user/signup',
      )
      .forRoutes(UserController,ProjectController,ApplicationController);
  }
}