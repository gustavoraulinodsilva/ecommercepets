import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  if (process.env.NODE_ENV !== 'test') {
    // Configure Swagger
    const config = new DocumentBuilder()
      .setTitle('Pet E-commerce API')
      .setDescription('API documentation for pet e-commerce platform')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    console.log(`📚 Swagger documentation available at http://localhost:${process.env.PORT || 3000}/api`);
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
