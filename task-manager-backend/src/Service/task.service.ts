import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../Service/prisma.service';
import { CreateTaskDto, Status } from '../DTO/create-task.dto';
import { UpdateTaskDto } from '../DTO/update-task.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateTaskDto) {
    try {
      return await this.prisma.task.create({ data });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async findAll(status?: Status, page = 1, limit = 10) {
    try {
      return await this.prisma.task.findMany({
        where: status ? { status } : {},
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      });
    } catch {
      throw new InternalServerErrorException('Failed to fetch tasks');
    }
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async update(id: number, data: UpdateTaskDto) {
    try {
      return await this.prisma.task.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }

      this.handlePrismaError(error);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.task.delete({
        where: { id },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }

      this.handlePrismaError(error);
    }
  }

  async getCounts() {
    try {
      const [pending, inProgress, completed] = await Promise.all([
        this.prisma.task.count({ where: { status: Status.PENDING } }),
        this.prisma.task.count({ where: { status: Status.IN_PROGRESS } }),
        this.prisma.task.count({ where: { status: Status.COMPLETED } }),
      ]);

      return { pending, inProgress, completed };
    } catch {
      throw new InternalServerErrorException('Failed to fetch task counts');
    }
  }

  private handlePrismaError(error: unknown): never {
    if (error instanceof Prisma.PrismaClientValidationError) {
      throw new BadRequestException('Invalid request data');
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002':
          throw new BadRequestException('Duplicate value not allowed');
        case 'P2003':
          throw new BadRequestException('Invalid reference value');
        case 'P2025':
          throw new NotFoundException('Record not found');
      }
    }

    throw new InternalServerErrorException('Unexpected database error');
  }
}
