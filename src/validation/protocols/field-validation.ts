export interface FieldValidation {
  fieldName: string
  validate(input: Object): Error
}
