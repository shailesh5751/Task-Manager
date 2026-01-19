import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    Query,
    ParseIntPipe,
    Options,Res
} from '@nestjs/common';
import { TaskService } from '../Service/task.service';
import { CreateTaskDto, Status } from '../DTO/create-task.dto';
import { UpdateTaskDto } from '../DTO/update-task.dto';

@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Post()
    create(@Body() dto: CreateTaskDto) {
        return this.taskService.create(dto);
    }

    @Get()
    findAll(
        @Query('status') status?: Status,
        @Query('page') page = 1,
        @Query('limit') limit = 10,
    ) {
        return this.taskService.findAll(status, Number(page), Number(limit));
    }

    @Get('counts')
    getCounts() {
        return this.taskService.getCounts();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.taskService.findOne(id);
    }

    @Get('/')
    healthCheck() {
        return { status: 'Backend is running' };
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateTaskDto, body:any
    ) {
        return this.taskService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.taskService.remove(id);
    }

  }
