import { Module } from '@nestjs/common';
import { ProductcarouselService } from './productcarousel.service';
import { ProductcarouselController } from './productcarousel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Productcarousel } from './entities/productcarousel.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Productcarousel])
  ],
  controllers:[ProductcarouselController],
  providers: [ProductcarouselService],
  exports: [ProductcarouselService],
})
export class ProductcarouselModule {}
