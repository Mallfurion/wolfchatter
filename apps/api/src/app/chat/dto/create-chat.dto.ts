import { ApiProperty } from "@nestjs/swagger";

export class CreateChatDto {
    @ApiProperty()
    lat: number;

    @ApiProperty()
    lng: number;
}
