import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator'

function calculateBirthDateFromIPN(ipn: string): Date {
  const daysSince1900 = parseInt(ipn.substring(0, 5))
  const referenceDate = new Date('1900-01-01')
  const birthDate = new Date(referenceDate.getTime() + daysSince1900 * 24 * 60 * 60 * 1000)

  return birthDate
}

@ValidatorConstraint({ name: 'AgeFromIPN', async: false })
export class AgeFromIPNConstraint implements ValidatorConstraintInterface {
  validate(value: number, args: ValidationArguments): boolean {
    const object: { ipn?: string } = args.object
    const ipn = object.ipn

    if (!ipn) {
      return false
    }

    const birthDate = calculateBirthDateFromIPN(ipn)

    if (!birthDate) {
      return false
    }

    const currentDate = new Date()
    const age = currentDate.getFullYear() - birthDate.getFullYear()

    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())
    ) {
      return value === age - 1
    } else {
      return value === age
    }
  }

  defaultMessage(): string {
    return `Age calculated from IPN does not match provided age`
  }
}

export function AgeFromIPN(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string): void {
    registerDecorator({
      name: 'AgeFromIPN',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: AgeFromIPNConstraint,
    })
  }
}
