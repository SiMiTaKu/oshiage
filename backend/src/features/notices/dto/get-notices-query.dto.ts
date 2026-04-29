import { ApiPropertyOptional } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator'

export class GetNoticesQueryDto {
  @ApiPropertyOptional({ type: Number, default: 1 })
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1

  @ApiPropertyOptional({ type: Number, default: 20 })
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit?: number = 20

  @ApiPropertyOptional({ enum: ['specChange', 'maintenance', 'incident'] })
  @IsEnum(['specChange', 'maintenance', 'incident'])
  @IsOptional()
  noticeType?: 'specChange' | 'maintenance' | 'incident'
}
