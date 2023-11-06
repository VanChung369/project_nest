import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CerateConversationDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
