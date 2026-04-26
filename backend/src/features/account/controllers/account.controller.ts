import { Body, Controller, Get, Post, Version } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'

import { AccountService } from '../services/account.service'
import { AccountBootstrapResponseDto } from '../dto/account-bootstrap-response.dto'
import { AccountResponseDto } from '../dto/account-response.dto'
import { UnsubscribeRequestDto } from '../dto/unsubscribe-request.dto'
import { UnsubscribeResponseDto } from '../dto/unsubscribe-response.dto'

@ApiTags('account')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('bootstrap')
  @Version('1')
  @ApiOperation({ summary: 'Bootstrap an authenticated account.' })
  @ApiCreatedResponse({ type: AccountBootstrapResponseDto })
  bootstrap(): AccountBootstrapResponseDto {
    return this.accountService.bootstrap()
  }

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get the current account profile.' })
  @ApiOkResponse({ type: AccountResponseDto })
  getAccount(): AccountResponseDto {
    return this.accountService.getAccount()
  }

  @Post('unsubscribe')
  @Version('1')
  @ApiOperation({ summary: 'Unsubscribe the current account.' })
  @ApiOkResponse({ type: UnsubscribeResponseDto })
  unsubscribe(@Body() request: UnsubscribeRequestDto): UnsubscribeResponseDto {
    return this.accountService.unsubscribe(request)
  }
}
