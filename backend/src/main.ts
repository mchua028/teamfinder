import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  //change to PRODUCTION, 5000
  const port = process.env.NODE_ENV === 'PRODUCTION' ? (process.env.PORT || 5000) : 3002;
  await app.listen(port);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
