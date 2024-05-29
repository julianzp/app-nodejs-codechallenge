
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateTransactionDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  status: string;
}