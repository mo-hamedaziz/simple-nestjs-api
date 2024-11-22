/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cv } from './entities/cv.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Skill } from '../skill/entities/skill.entity';

@Injectable()
export class CvService {
  constructor (
    @InjectRepository(Cv) private cvRepository: Repository<Cv>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Skill) private skillRepository: Repository<Skill>,
  ) {}

  async create(createCvDto: CreateCvDto): Promise<Cv> {
    const { userId, skills, ...cvData } = createCvDto;

    // Fetch the user (if provided)
    let user: User = null;
    if (userId) {
      user = await this.userRepository.findOneBy({ id: userId });
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
    }

    // Fetch skills (if provided)
    let skillEntities: Skill[] = [];
    if (skills && skills.length > 0) {
      skillEntities = await this.skillRepository.findByIds(skills);
      if (skillEntities.length !== skills.length) {
        throw new NotFoundException(`Some skills provided were not found`);
      }
    }

    const newCv = this.cvRepository.create({
      ...cvData,
      user,
      skills: skillEntities,
    });
    
    return await this.cvRepository.save(newCv);
  }

  async findAll(): Promise<Cv[]> {
    return await this.cvRepository.find({
      relations: ['user', 'skills'],
    });
  }

  async findOne(id: number): Promise<Cv> {
    const cv = await this.cvRepository.findOne({
      where: { id },
      relations: ['user', 'skills'],
    });

    if (!cv) {
      throw new NotFoundException(`CV with ID ${id} not found`);
    }
    return cv;
  }

  async update(id: number, updateCvDto: UpdateCvDto): Promise<Cv> {
    const { userId, skills, ...updateData } = updateCvDto;

    // Find the existing CV
    const cv = await this.cvRepository.findOneBy({ id });
    if (!cv) {
      throw new NotFoundException(`CV with ID ${id} not found`);
    }

    // Update the user (if provided)
    if (userId) {
      const user = await this.userRepository.findOneBy({ id: userId });
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
      cv.user = user;
    }

    // Update skills (if provided)
    if (skills && skills.length > 0) {
      const skillEntities = await this.skillRepository.findByIds(skills);
      if (skillEntities.length !== skills.length) {
        throw new NotFoundException(`Some skills provided were not found`);
      }
      cv.skills = skillEntities;
    }

    // Update the other fields
    Object.assign(cv, updateData);

    return await this.cvRepository.save(cv);
  }

  async remove(id: number): Promise<void> {
    const result = await this.cvRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`CV with ID ${id} not found`);
    }
  }
}
