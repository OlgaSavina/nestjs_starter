import { ValidationArguments, registerDecorator } from 'class-validator'

function isValidISODate(value: any): boolean {
    return !isNaN(Date.parse(value)) && new Date(value).toISOString() === value
  }
  

export function MinDateISO(minYears: number): (object: object, propertyName: string) => void {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      name: 'minDateISO',
      target: object.constructor,
      propertyName,
      constraints: [minYears],
      validator: {
        validate(value: any, args: ValidationArguments): boolean {
          try {
            const [constraintMinYears] = args.constraints
            const currentDate = new Date()
            const minDate = new Date(currentDate)
            const objectInstance = args.object as { type: string }
            const type = objectInstance.type

            if (!isValidISODate(value)) {
              return false
            }

            if (type === 'revalidation') {
              minDate.setFullYear(currentDate.getFullYear() - (constraintMinYears + 1))
            } else {
              minDate.setFullYear(currentDate.getFullYear() - constraintMinYears)
            }

            return new Date(value).toISOString() >= minDate.toISOString()
          } catch (error) {
            throw new Error(`Error in MinDateISO validator: ${error}`)
          }
        },
        defaultMessage(args: ValidationArguments): string {
          const [constraintMinYears] = args.constraints
          const objectInstance = args.object as { type: string }
          const type = objectInstance.type

          if (!isValidISODate(args.value)) {
            return `Invalid ISO date format`
          } else if (type === 'revalidation') {
            return `Date must be at least ${constraintMinYears + 1} years ago`
          } else {
            return `Date must be at least ${constraintMinYears} year ago`
          }
        },
      },
    })
  }
}

