import { ApiProperty } from '@nestjs/swagger'

/**
 * アカウント初期化レスポンスオブジェクト。
 * @remarks ログイン直後のブートストラップ処理結果を表す。
 */
export class AccountBootstrapResponseDto {
  /** ユーザーID */
  @ApiProperty({ type: Number })
  userId!: number

  /** Cognito ユーザープールのサブジェクト識別子 */
  @ApiProperty({ type: String })
  cognitoSub!: string

  /** 今回のブートストラップで新規アカウントが作成されたかどうか */
  @ApiProperty({ type: Boolean })
  created!: boolean
}
