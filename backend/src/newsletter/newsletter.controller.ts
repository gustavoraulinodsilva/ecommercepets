import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { CreateNewsletterDto } from './dto/create-newsletter.dto';
import { UpdateNewsletterDto } from './dto/update-newsletter.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Newsletter } from './entities/newsletter.entity';

@ApiTags('newsletter')
@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Post()
  @ApiOperation({ summary: 'Subscribe to newsletter' })
  @ApiResponse({ status: 201, description: 'Successfully subscribed to the newsletter', type: Newsletter })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid data provided' })
  @ApiResponse({ status: 409, description: 'Conflict - Email already subscribed' })
  create(@Body() createNewsletterDto: CreateNewsletterDto) {
    return this.newsletterService.create(createNewsletterDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all newsletter subscribers' })
  @ApiResponse({ status: 200, description: 'List of all newsletter subscribers', type: [Newsletter] })
  findAll() {
    return this.newsletterService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get newsletter subscriber by ID' })
  @ApiParam({ name: 'id', description: 'Subscriber ID' })
  @ApiResponse({ status: 200, description: 'Subscriber information retrieved successfully', type: Newsletter })
  @ApiResponse({ status: 404, description: 'Subscriber not found' })
  findOne(@Param('id') id: string) {
    return this.newsletterService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update newsletter subscriber information' })
  @ApiParam({ name: 'id', description: 'Subscriber ID' })
  @ApiResponse({ status: 200, description: 'Subscriber information updated successfully', type: Newsletter })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid data provided' })
  @ApiResponse({ status: 404, description: 'Subscriber not found' })
  @ApiResponse({ status: 409, description: 'Conflict - Email already subscribed' })
  update(@Param('id') id: string, @Body() updateNewsletterDto: UpdateNewsletterDto) {
    return this.newsletterService.update(id, updateNewsletterDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove subscriber from newsletter' })
  @ApiParam({ name: 'id', description: 'Subscriber ID' })
  @ApiResponse({ status: 200, description: 'Subscriber removed successfully' })
  @ApiResponse({ status: 404, description: 'Subscriber not found' })
  remove(@Param('id') id: string) {
    return this.newsletterService.remove(id);
  }

  @Post('unsubscribe')
  @ApiOperation({ summary: 'Unsubscribe from newsletter using email' })
  @ApiResponse({ status: 200, description: 'Successfully unsubscribed from the newsletter' })
  @ApiResponse({ status: 404, description: 'Subscription not found for this email' })
  unsubscribe(@Body('email') email: string) {
    return this.newsletterService.unsubscribe(email);
  }
}