import { ApiProperty } from "@nestjs/swagger";

export class CreateMessageDto {
    @ApiProperty()
    author: string;
    
    @ApiProperty()
    content: string;
}