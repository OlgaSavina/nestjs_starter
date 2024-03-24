import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator'

@ValidatorConstraint({ name: 'ipnValid', async: false })
export class IPNValidator implements ValidatorConstraintInterface {
  validate(ipn: string): boolean {
    if (ipn.length !== 10) {
      return false
    }

    const weights = [-1, 5, 7, 9, 4, 6, 10, 5, 7]
    let sum = 0

    for (let i = 0; i < 9; i++) {
      sum += parseInt(ipn.charAt(i)) * weights[i]
    }

    const remainder = sum % 11
    const controlNumber = remainder === 10 ? 0 : remainder
    const lastDigit = parseInt(ipn.charAt(9))

    return controlNumber === lastDigit
  }

  defaultMessage(): string {
    return 'Invalid IPN'
  }
}

export function IsIPNValid(validationOptions?: ValidationOptions): (object: object, propertyName: string) => void {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      name: 'isIPNValid',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IPNValidator,
    })
  }
}
