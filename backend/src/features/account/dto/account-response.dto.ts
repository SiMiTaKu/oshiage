import { ApiProperty } from '@nestjs/swagger'

/**
 * アカウント情報レスポンスオブジェクト。
 * @remarks ログイン中のユーザーのアカウントプロフィール情報を表す。
 */
export class AccountResponseDto {
  /** ユーザーID */
  @ApiProperty({ type: Number })
  userId!: number

  /** メールアドレス */
  @ApiProperty({ type: String })
  email!: string

  /** 表示名 */
  @ApiProperty({ type: String })
  displayName!: string

  /** アカウントステータス */
  @ApiProperty({ type: String })
  status!: string

  /** アカウント作成日時（ISO 8601形式） */
  @ApiProperty({ type: String })
  createdAt!: string

  /** アカウント最終更新日時（ISO 8601形式） */
  @ApiProperty({ type: String })
  updatedAt!: string
}
