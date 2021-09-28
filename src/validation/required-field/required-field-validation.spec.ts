import faker from 'faker'
import { RequiredFieldError } from '../errors'
import { FieldValidation } from '../protocols/field-validation'

class RequiredFieldValidation implements FieldValidation {
  constructor(readonly fieldName: string) {}

  validate(value: string) {
    return value ? null : new RequiredFieldError()
  }
}

describe('RequiredFieldValidation', () => {
  test('Should return error if field is empty', () => {
    const sut = new RequiredFieldValidation('email')
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })

  test('Should return false if field is not empty', () => {
    const sut = new RequiredFieldValidation('email')
    const error = sut.validate(faker.random.word())
    expect(error).toBeFalsy()
  })
})
