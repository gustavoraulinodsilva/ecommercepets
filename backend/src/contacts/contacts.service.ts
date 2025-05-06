import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
  ) {}

  async create(createContactDto: CreateContactDto): Promise<Contact> {
    try {
      // Validate required fields
      if (!createContactDto.email || !createContactDto.name) {
        throw new BadRequestException('Email and name are required fields');
      }
      
      // Create and save the new contact
      const contact = this.contactRepository.create(createContactDto);
      return await this.contactRepository.save(contact);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Failed to create contact: ${error.message}`);
    }
  }

  async findAll(): Promise<Contact[]> {
    try {
      return await this.contactRepository.find({
        order: {
          createdAt: 'DESC', // Assumes Contact entity has a createdAt field
        },
      });
    } catch (error) {
      throw new BadRequestException(`Failed to fetch contacts: ${error.message}`);
    }
  }

  async findOne(id: string): Promise<Contact> {
    try {
      const contact = await this.contactRepository.findOne({
        where: { id },
      });

      if (!contact) {
        throw new NotFoundException(`Contact with ID ${id} not found`);
      }

      return contact;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Failed to fetch contact: ${error.message}`);
    }
  }

  async update(id: string, updateContactDto: UpdateContactDto): Promise<Contact> {
    try {
      // First check if contact exists
      const contact = await this.findOne(id);
      
      // Update contact properties
      Object.assign(contact, updateContactDto);
      
      return await this.contactRepository.save(contact);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Failed to update contact: ${error.message}`);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const contact = await this.findOne(id);
      await this.contactRepository.remove(contact);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Failed to delete contact: ${error.message}`);
    }
  }
}
