import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
  ) {}

  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    try {
      // Check if blog with same title already exists
      const existingBlog = await this.blogRepository.findOne({
        where: { title: createBlogDto.title }
      });

      if (existingBlog) {
        throw new ConflictException(`A blog post with the title "${createBlogDto.title}" already exists`);
      }

      // Create and save the new blog post
      const blog = this.blogRepository.create(createBlogDto);
      return await this.blogRepository.save(blog);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new BadRequestException(`Failed to create blog post: ${error.message}`);
    }
  }

  async findAll(): Promise<Blog[]> {
    try {
      return await this.blogRepository.find({
        order: { createdAt: 'DESC' } // Assuming you have a createdAt field in your entity
      });
    } catch (error) {
      throw new BadRequestException(`Failed to fetch blog posts: ${error.message}`);
    }
  }

  async findOne(id: string): Promise<Blog> {
    try {
      const blog = await this.blogRepository.findOne({
        where: { id }
      });

      if (!blog) {
        throw new NotFoundException(`Blog post with ID ${id} not found`);
      }

      return blog;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Failed to fetch blog post: ${error.message}`);
    }
  }

  async findByTag(tag: string): Promise<Blog[]> {
    try {
      return await this.blogRepository.find({
        where: { tag },
        order: { createdAt: 'DESC' }
      });
    } catch (error) {
      throw new BadRequestException(`Failed to fetch blog posts by tag: ${error.message}`);
    }
  }

  async update(id: string, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    try {
      const blog = await this.findOne(id);
      
      // Check for title uniqueness if title is being updated
      if (updateBlogDto.title && updateBlogDto.title !== blog.title) {
        const existingBlog = await this.blogRepository.findOne({
          where: { title: updateBlogDto.title }
        });

        if (existingBlog) {
          throw new ConflictException(`A blog post with the title "${updateBlogDto.title}" already exists`);
        }
      }

      // Update blog properties
      Object.assign(blog, updateBlogDto);
      
      return await this.blogRepository.save(blog);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ConflictException) {
        throw error;
      }
      throw new BadRequestException(`Failed to update blog post: ${error.message}`);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const blog = await this.findOne(id);
      await this.blogRepository.remove(blog);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Failed to delete blog post: ${error.message}`);
    }
  }
}
