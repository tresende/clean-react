import { FieldValidation } from '@/validation/protocols/field-validation'
import { CompareFieldsValidation } from '../compare-fields/compare-fields-validation'
import { EmailValidation, MinLengthValidation, RequiredFieldValidation } from '@/validation/validators'

export class ValidationBuilder {
  private constructor(private readonly field: string, private readonly validations: FieldValidation[] = []) {}

  static field(fieldName: string) {
    return new ValidationBuilder(fieldName)
  }

  required() {
    this.validations.push(new RequiredFieldValidation(this.field))
    return this
  }

  email() {
    this.validations.push(new EmailValidation(this.field))
    return this
  }

  min(length: number) {
    this.validations.push(new MinLengthValidation(this.field, length))
    return this
  }

  sameAs(fieldToCompare: string) {
    this.validations.push(new CompareFieldsValidation(this.field, fieldToCompare))
    return this
  }

  build() {
    return this.validations
  }
}
