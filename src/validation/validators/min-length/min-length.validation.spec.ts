import faker from 'faker'

import { InvalidFieldError } from '@/validation/errors'
import { MinLengthValidation } from './min-length-validation'

const makeSut = () => new MinLengthValidation(faker.database.collation(), 5)

describe('MinLengthValidation', () => {
  test('Should return error if field is invalid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.random.alphaNumeric(3))
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return null if field is valid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.random.alphaNumeric(5))
    expect(error).toBeNull()
  })

  test('Should return null if field is empy', () => {
    const sut = makeSut()
    const error = sut.validate('')
    expect(error).toBeNull()
  })
})
