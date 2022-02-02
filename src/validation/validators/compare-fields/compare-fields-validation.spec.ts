import faker from 'faker'
import { InvalidFieldError } from '@/validation/errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (field: string, fieldToCompare: string) => new CompareFieldsValidation(field, fieldToCompare)

describe('CompareFieldsValidation', () => {
  test('Should return error if compare is invalid', () => {
    const field = faker.database.collation()
    const fieldToCompare = faker.database.collation()
    const sut = makeSut(field, fieldToCompare)
    const error = sut.validate({
      [field]: faker.random.word(),
      [fieldToCompare]: faker.random.word()
    })
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return false if compare is valid', () => {
    const field = faker.database.collation()
    const fieldToCompare = faker.database.collation()
    const sut = makeSut(field, fieldToCompare)
    const value = faker.random.word()

    const error = sut.validate({
      [field]: value,
      [fieldToCompare]: value
    })

    expect(error).toBeFalsy()
  })
})
