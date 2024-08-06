import { ApiProperty } from '@nestjs/swagger';

export class GetAllResponseDto<T> {
    @ApiProperty({ isArray: true, type: () => Object })
    items: T[];

    @ApiProperty()
    count: number;
}
