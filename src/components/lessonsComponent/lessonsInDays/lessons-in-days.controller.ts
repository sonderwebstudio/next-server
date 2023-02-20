import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { ValidationPipe } from '../../../pipes/validation.pipe';
import { ROLES } from '../../../constants/roles.constants';
import { RolesGuards } from '../../../decorators/roles-guards.decorator';
import { CreateLessonsInDaysDto } from './dto/create-lessons-in-days.dto';
import { LessonsInDays } from './models/lessons-in-days.model';
import { LessonsInDaysService } from './lessons-in-days.service';
import { UpdateLessonsInDaysDto } from './dto/update-lessons-in-days.dto';

@Controller('/api/lessons-in-days')
export class LessonsInDaysController {
  constructor(private service: LessonsInDaysService) {}

  @RolesGuards([ROLES.USER])
  @UsePipes(ValidationPipe)
  @Post()
  async create(
    @Body() dto: CreateLessonsInDaysDto,
  ): Promise<{ response: LessonsInDays; statusCode: HttpStatus.CREATED }> {
    return {
      statusCode: HttpStatus.CREATED,
      response: await this.service.create(dto),
    };
  }

  @RolesGuards([ROLES.USER])
  @Get()
  async findAll(): Promise<{
    response: LessonsInDays[];
    statusCode: number;
  }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.findAll(),
    };
  }

  @RolesGuards([ROLES.USER])
  @Get('/:id')
  async findByPk(
    @Param('id') id: number,
  ): Promise<{ response: LessonsInDays; statusCode: number }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.findByPk(id),
    };
  }

  @RolesGuards([ROLES.USER])
  @UsePipes(ValidationPipe)
  @Put()
  async update(
    @Body() dto: UpdateLessonsInDaysDto,
  ): Promise<{ response: number[]; statusCode: number }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.update(dto),
    };
  }

  @RolesGuards([ROLES.ADMIN])
  @Delete('/:id')
  async destroy(
    @Param('id') id: number,
  ): Promise<{ response: number; statusCode: number }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.destroy(id),
    };
  }
}
