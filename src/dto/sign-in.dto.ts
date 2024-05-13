import { ApiProperty } from "@nestjs/swagger";

export class SignInDTO {
    @ApiProperty()
    name: string;
    
    @ApiProperty()
    password: string;
}