import { ApiPropertyOptional } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator'

/**
 * イベント一覧取得クエリオブジェクト。
 * @remarks イベント一覧APIのクエリパラメータを表す。
 */
export class GetEventsQueryDto {
  /** ページ番号（1始まり） */
  @ApiPropertyOptional({ type: Number, default: 1 })
  @Transform(({ value }) => Number.parseInt(value, 10))
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1

  /** 1ページあたりの取得件数（最大100） */
  @ApiPropertyOptional({ type: Number, default: 20 })
  @Transform(({ value }) => Number.parseInt(value, 10))
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit?: number = 20

  /** イベント種別 */
  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  eventType?: string
}
