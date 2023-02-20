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
import { CreateLessonsInWeeksDto } from './dto/create-lessons-in-weeks.dto';
import { LessonsInWeeks } from './models/lessons-in-weeks.model';
import { LessonsInWeeksService } from './lessons-in-weeks.service';
import { UpdateLessonsInWeeksDto } from './dto/update-lessons-in-weeks.dto';

@Controller('/api/lessons-in-weeks')
export class LessonsInWeeksController {
  constructor(private service: LessonsInWeeksService) {}

  @RolesGuards([ROLES.USER])
  @UsePipes(ValidationPipe)
  @Post()
  async create(
    @Body() dto: CreateLessonsInWeeksDto,
  ): Promise<{ response: LessonsInWeeks; statusCode: HttpStatus.CREATED }> {
    return {
      statusCode: HttpStatus.CREATED,
      response: await this.service.create(dto),
    };
  }

  @RolesGuards([ROLES.USER])
  @Get()
  async findAll(): Promise<{
    response: LessonsInWeeks[];
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
  ): Promise<{ response: LessonsInWeeks; statusCode: number }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.findByPk(id),
    };
  }

  @RolesGuards([ROLES.USER])
  @UsePipes(ValidationPipe)
  @Put()
  async update(
    @Body() dto: UpdateLessonsInWeeksDto,
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
