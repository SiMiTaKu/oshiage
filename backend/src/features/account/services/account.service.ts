import dayjs from 'dayjs'
import { Injectable } from '@nestjs/common'

import { AccountBootstrapResponseDto } from '../dto/account-bootstrap-response.dto'
import { AccountResponseDto } from '../dto/account-response.dto'
import { UnsubscribeRequestDto } from '../dto/unsubscribe-request.dto'
import { UnsubscribeResponseDto } from '../dto/unsubscribe-response.dto'

/**
 * アカウント関連のユースケースを提供するサービス。
 */
@Injectable()
export class AccountService {
  /**
   * ログイン直後のアカウント初期化処理を実行する。
   * @returns ブートストラップ結果
   */
  bootstrap(): AccountBootstrapResponseDto {
    return {
      created: false,
      cognitoSub: 'placeholder-sub',
      userId: 1,
    }
  }

  /**
   * ログイン中のアカウント情報を取得する。
   * @returns アカウント情報
   */
  getAccount(): AccountResponseDto {
    return {
      createdAt: dayjs().toDate().toISOString(),
      displayName: 'MVP User',
      email: 'user@example.com',
      status: 'active',
      updatedAt: dayjs().toDate().toISOString(),
      userId: 1,
    }
  }

  /**
   * アカウントを退会させる。
   * @param dto - 退会リクエスト（退会理由を含む）
   * @returns 退会処理結果
   */
  unsubscribe(_dto: UnsubscribeRequestDto): UnsubscribeResponseDto {
    return {
      unsubscribed: true,
    }
  }
}
