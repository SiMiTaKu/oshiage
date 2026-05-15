import { Injectable } from '@nestjs/common'

import { AccountBootstrapResponseDto } from '../dto/account-bootstrap-response.dto'
import { AccountResponseDto } from '../dto/account-response.dto'
import { UnsubscribeResponseDto } from '../dto/unsubscribe-response.dto'

/**
 * アカウント関連のユースケースを提供するサービス。
 */
@Injectable()
export class AccountService {
  bootstrap(): AccountBootstrapResponseDto {
    return {
      created: false,
      cognitoSub: 'placeholder-sub',
      userId: 1,
    }
  }

  getAccount(): AccountResponseDto {
    return {
      createdAt: new Date().toISOString(),
      displayName: 'MVP User',
      email: 'user@example.com',
      status: 'active',
      updatedAt: new Date().toISOString(),
      userId: 1,
    }
  }

  unsubscribe(): UnsubscribeResponseDto {
    return {
      unsubscribed: true,
    }
  }
}
