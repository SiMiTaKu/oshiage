import { ApiProperty } from '@nestjs/swagger';

export class AccountBootstrapResponseDto {
  @ApiProperty({ type: Number })
  userId!: number;

  @ApiProperty({ type: String })
  cognitoSub!: string;

  @ApiProperty({ type: Boolean })
  created!: boolean;
}
