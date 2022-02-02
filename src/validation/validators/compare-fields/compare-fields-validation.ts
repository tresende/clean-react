import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class CompareFieldsValidation implements FieldValidation {
  constructor(readonly fieldName: string, private readonly fieldToCompare: string) {}

  validate(input: object): Error {
    const value = input[this.fieldName]
    const valueToCompare = input[this.fieldToCompare]

    return value !== valueToCompare ? new InvalidFieldError() : null
  }
}
