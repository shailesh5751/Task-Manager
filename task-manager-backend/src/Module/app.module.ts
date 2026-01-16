import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module';
import { TaskModule } from './task.module';

@Module({
  imports: [PrismaModule,TaskModule],
})
export class AppModule { }
