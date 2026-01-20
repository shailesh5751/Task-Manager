import { IsOptional, IsString, MaxLength, IsEnum, IsDateString } from 'class-validator';
import { Status, Priority } from './create-task.dto';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @IsOptional()
  @IsEnum(Priority)
  priority?: Priority;

  @IsOptional()
@IsDateString()
dueDate?: string;

}
