import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsEnum, IsInt, IsNotEmpty } from 'class-validator'
import { AppealType } from 'src/modules/main/enums/appeal.enum'
import { AgeFromIPN } from 'src/modules/main/validators/age-from-ipn.validator'
import { MinDateISO } from 'src/modules/main/validators/date.validator'
import { IsIPNValid } from 'src/modules/main/validators/ipn.validator'

import { GenericDto } from 'src/core/abstracts/generic.dto'

export class AppealCreateRequestDto extends GenericDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty({ example: '2023-01-15T12:00:00.000Z' })
  @IsNotEmpty()
  @MinDateISO(1)
  finishedAt: Date

  @ApiProperty({ enum: AppealType, example: 'initial' })
  @IsNotEmpty()
  @IsEnum(AppealType)
  type: AppealType

  @ApiProperty({ example: '1234567890' })
  @IsNotEmpty()
  @IsIPNValid()
  ipn: string

  @ApiProperty({ example: 25 })
  @IsNotEmpty()
  @IsInt()
  @AgeFromIPN()
  age: number
}
