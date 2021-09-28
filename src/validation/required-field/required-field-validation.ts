import { RequiredFieldError } from '../errors'
import { FieldValidation } from '../protocols/field-validation'

export class RequiredFieldValidation implements FieldValidation {
  constructor(readonly fieldName: string) {}

  validate(value: string) {
    return value ? null : new RequiredFieldError()
  }
}
