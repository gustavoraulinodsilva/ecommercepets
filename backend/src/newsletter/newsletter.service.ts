import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNewsletterDto } from './dto/create-newsletter.dto';
import { UpdateNewsletterDto } from './dto/update-newsletter.dto';
import { Newsletter } from './entities/newsletter.entity';

@Injectable()
export class NewsletterService {
  constructor(
    @InjectRepository(Newsletter)
    private newsletterRepository: Repository<Newsletter>,
  ) {}

  async create(createNewsletterDto: CreateNewsletterDto): Promise<Newsletter> {
    try {
      // Check if email already exists
      const existingSubscription = await this.newsletterRepository.findOne({
        where: { email: createNewsletterDto.email }
      });

      if (existingSubscription) {
        throw new ConflictException('This email is already subscribed to our newsletter');
      }

      // Create new subscription
      const newSubscription = this.newsletterRepository.create(createNewsletterDto);
      return await this.newsletterRepository.save(newSubscription);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new BadRequestException(`Failed to subscribe: ${error.message}`);
    }
  }

  async findAll(): Promise<Newsletter[]> {
    try {
      return await this.newsletterRepository.find({
        order: { createdAt: 'DESC' }
      });
    } catch (error) {
      throw new BadRequestException(`Failed to fetch subscriptions: ${error.message}`);
    }
  }

  async findOne(id: string): Promise<Newsletter> {
    try {
      const subscription = await this.newsletterRepository.findOne({
        where: { id }
      });

      if (!subscription) {
        throw new NotFoundException(`Subscription with ID ${id} not found`);
      }

      return subscription;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Failed to fetch subscription: ${error.message}`);
    }
  }

  async update(id: string, updateNewsletterDto: UpdateNewsletterDto): Promise<Newsletter> {
    try {
      const subscription = await this.findOne(id);
      
      // Check email uniqueness if email is being updated
      if (updateNewsletterDto.email && updateNewsletterDto.email !== subscription.email) {
        const existingEmail = await this.newsletterRepository.findOne({
          where: { email: updateNewsletterDto.email }
        });
        
        if (existingEmail) {
          throw new ConflictException('This email is already subscribed to our newsletter');
        }
      }
      
      // Update subscription
      Object.assign(subscription, updateNewsletterDto);
      return await this.newsletterRepository.save(subscription);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ConflictException) {
        throw error;
      }
      throw new BadRequestException(`Failed to update subscription: ${error.message}`);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const subscription = await this.findOne(id);
      await this.newsletterRepository.remove(subscription);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Failed to delete subscription: ${error.message}`);
    }
  }
  
  async unsubscribe(email: string): Promise<void> {
    try {
      const subscription = await this.newsletterRepository.findOne({
        where: { email }
      });
      
      if (!subscription) {
        throw new NotFoundException(`No subscription found for email: ${email}`);
      }
      
      // Remove subscription completely
      await this.newsletterRepository.remove(subscription);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Failed to unsubscribe: ${error.message}`);
    }
  }
}
