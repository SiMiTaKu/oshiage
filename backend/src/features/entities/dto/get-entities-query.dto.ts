import { ApiPropertyOptional } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator'

/**
 * エンティティ一覧取得クエリオブジェクト。
 * @remarks エンティティ一覧APIのクエリパラメータを表す。
 */
export class GetEntitiesQueryDto {
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

  /** エンティティカテゴリ（individual / group） */
  @ApiPropertyOptional({ enum: ['individual', 'group'] })
  @IsEnum(['individual', 'group'])
  @IsOptional()
  category?: 'individual' | 'group'

  /** 活動ステータス（active / retired / inactive） */
  @ApiPropertyOptional({ enum: ['active', 'retired', 'inactive'] })
  @IsEnum(['active', 'retired', 'inactive'])
  @IsOptional()
  activeStatus?: 'active' | 'retired' | 'inactive'
}
