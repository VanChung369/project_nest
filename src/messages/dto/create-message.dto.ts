import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateMessageDto {
  @IsNumber()
  @IsNotEmpty()
  conversationId: number;

  @IsNotEmpty()
  @IsString()
  content: string;
}
