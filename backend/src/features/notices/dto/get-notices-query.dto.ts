import { ApiPropertyOptional } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator'

/**
 * お知らせ一覧取得クエリオブジェクト。
 * @remarks お知らせ一覧APIのクエリパラメータを表す。
 */
export class GetNoticesQueryDto {
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

  /** お知らせ種別（specChange / maintenance / incident） */
  @ApiPropertyOptional({ enum: ['specChange', 'maintenance', 'incident'] })
  @IsEnum(['specChange', 'maintenance', 'incident'])
  @IsOptional()
  noticeType?: 'specChange' | 'maintenance' | 'incident'
}
