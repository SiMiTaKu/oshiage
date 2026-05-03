import { Body, Controller, Get, HttpCode, Post, Version } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'

import { AccountService } from '../services/account.service'
import { AccountBootstrapResponseDto } from '../dto/account-bootstrap-response.dto'
import { AccountResponseDto } from '../dto/account-response.dto'
import { UnsubscribeRequestDto } from '../dto/unsubscribe-request.dto'
import { UnsubscribeResponseDto } from '../dto/unsubscribe-response.dto'

/**
 * アカウント関連の API を提供するコントローラー。
 */
@ApiTags('account')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  /**
   * ログイン直後のアカウント初期化情報を返す。
   *
   * @returns ブートストラップ結果
   */
  @Post('bootstrap')
  @Version('1')
  @ApiOperation({ summary: '認証済みアカウントを初期化する' })
  @ApiCreatedResponse({ type: AccountBootstrapResponseDto })
  bootstrap(): AccountBootstrapResponseDto {
    return this.accountService.bootstrap()
  }

  /**
   * 現在ユーザーのプロフィール情報を返す。
   *
   * @returns アカウントプロフィール
   */
  @Get()
  @Version('1')
  @ApiOperation({ summary: '現在のアカウントプロフィールを取得する' })
  @ApiOkResponse({ type: AccountResponseDto })
  getAccount(): AccountResponseDto {
    return this.accountService.getAccount()
  }

  /**
   * アカウント退会処理を実行する。
   *
   * @param request - 退会リクエスト
   * @returns 退会処理結果
   */
  @Post('unsubscribe')
  @Version('1')
  @HttpCode(200)
  @ApiOperation({ summary: '現在のアカウントを退会処理する' })
  @ApiOkResponse({ type: UnsubscribeResponseDto })
  unsubscribe(@Body() request: UnsubscribeRequestDto): UnsubscribeResponseDto {
    return this.accountService.unsubscribe(request)
  }
}
