import { RequiredFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class RequiredFieldValidation implements FieldValidation {
  constructor(readonly fieldName: string) {}

  validate(value: string) {
    return value ? null : new RequiredFieldError()
  }
}
