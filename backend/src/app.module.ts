import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DogModule } from './dog/dog.module';
import { BreedModule } from './breed/breed.module';
import { BreedcarouselModule } from './breedcarousel/breedcarousel.module';
import { DogcolorsModule } from './dogcolors/dogcolors.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'katucha16',
      database: 'ecommercepets',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    DogModule,
    BreedModule,
    BreedcarouselModule,
    DogcolorsModule,
    UsersModule
  ],
  controllers: [AppController],
})
export class AppModule {}
