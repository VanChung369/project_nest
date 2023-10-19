import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CerateConversationDto {
  @IsNumber()
  @IsNotEmpty()
  recipientId: number;

  @IsNotEmpty()
  @IsString()
  message: string;
}
