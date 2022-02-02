import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class MinLengthValidation implements FieldValidation {
  constructor(readonly fieldName: string, private readonly minLength: number) {}

  validate(input: object): Error {
    const value = input[this.fieldName]
    if (!value) return null
    return value.length >= this.minLength ? null : new InvalidFieldError()
  }
}
