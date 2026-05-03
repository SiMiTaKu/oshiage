import { ApiPropertyOptional } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator'

/**
 * GetEventsQueryDto を表すクラス。
 */
export class GetEventsQueryDto {
  @ApiPropertyOptional({ type: Number, default: 1 })
  @Transform(({ value }) => Number.parseInt(value, 10))
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1

  @ApiPropertyOptional({ type: Number, default: 20 })
  @Transform(({ value }) => Number.parseInt(value, 10))
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit?: number = 20

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  eventType?: string
}
