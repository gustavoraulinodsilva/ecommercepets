import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DogModule } from './dog/dog.module';
import { BreedModule } from './breed/breed.module';
import { BreedcarouselModule } from './breedcarousel/breedcarousel.module';
import { DogcolorsModule } from './dogcolors/dogcolors.module';
import { UsersModule } from './users/users.module';
import { LoginModule } from './login/login.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { LoginGuard } from './login/auth/login.guard';
import { BreedadoptionModule } from './breedadoption/breedadoption.module';
import { DogcategoryModule } from './dogcategory/dogcategory.module';
import { ContactsModule } from './contacts/contacts.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'postgres',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    DogModule,
    BreedModule,
    BreedcarouselModule,
    DogcolorsModule,
    UsersModule,
    LoginModule,
    BreedadoptionModule,
    DogcategoryModule,
    ContactsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: LoginGuard, // Substitua SeuGuard pelo guard que você quer utilizar
    },
  ],
})
export class AppModule {}