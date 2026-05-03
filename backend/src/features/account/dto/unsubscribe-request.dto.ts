import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString, MaxLength } from 'class-validator'

/**
 * UnsubscribeRequestDto を表すクラス。
 */
export class UnsubscribeRequestDto {
  @ApiPropertyOptional({ maxLength: 1000 })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  reason?: string
}
