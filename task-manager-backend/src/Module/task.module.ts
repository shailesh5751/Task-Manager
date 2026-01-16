import { Module } from '@nestjs/common';
import { TaskService } from '../Service/task.service';
import { TaskController } from '../Controller/task.controller';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
