import faker from 'faker'
import { RequiredFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols/field-validation'

class RequiredFieldValidation implements FieldValidation {
  constructor(readonly fieldName: string) {}

  validate(value: string) {
    return value ? null : new RequiredFieldError()
  }
}

const makeSut = () => new RequiredFieldValidation(faker.database.collation())

describe('RequiredFieldValidation', () => {
  test('Should return error if field is empty', () => {
    const sut = makeSut()
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })

  test('Should return false if field is not empty', () => {
    const sut = makeSut()
    const error = sut.validate(faker.random.word())
    expect(error).toBeFalsy()
  })
})
