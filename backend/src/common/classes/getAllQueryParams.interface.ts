import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class GetAllQueryParams {
    @IsOptional()
    @IsInt()
    @Min(0)
    @Type(() => Number)
    start?: number;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    limit?: number;

    @IsOptional()
    sort?: string;
}
