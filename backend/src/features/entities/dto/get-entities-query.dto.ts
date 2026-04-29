import { ApiPropertyOptional } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator'

export class GetEntitiesQueryDto {
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

  @ApiPropertyOptional({ enum: ['individual', 'group'] })
  @IsEnum(['individual', 'group'])
  @IsOptional()
  category?: 'individual' | 'group'

  @ApiPropertyOptional({ enum: ['active', 'retired', 'inactive'] })
  @IsEnum(['active', 'retired', 'inactive'])
  @IsOptional()
  activeStatus?: 'active' | 'retired' | 'inactive'
}
