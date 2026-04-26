import { Injectable } from '@nestjs/common';

import { AccountBootstrapResponseDto } from '../dto/account-bootstrap-response.dto';
import { AccountResponseDto } from '../dto/account-response.dto';
import { UnsubscribeRequestDto } from '../dto/unsubscribe-request.dto';
import { UnsubscribeResponseDto } from '../dto/unsubscribe-response.dto';

@Injectable()
export class AccountService {
  bootstrap(): AccountBootstrapResponseDto {
    return {
      created: false,
      cognitoSub: 'placeholder-sub',
      userId: 1,
    };
  }

  getAccount(): AccountResponseDto {
    return {
      createdAt: new Date().toISOString(),
      displayName: 'MVP User',
      email: 'user@example.com',
      status: 'active',
      updatedAt: new Date().toISOString(),
      userId: 1,
    };
  }

  unsubscribe(request: UnsubscribeRequestDto): UnsubscribeResponseDto {
    if (request.reason) {
      request.reason.trim();
    }

    return {
      unsubscribed: true,
    };
  }
}
