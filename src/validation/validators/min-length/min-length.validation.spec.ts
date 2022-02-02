import faker from 'faker'

import { InvalidFieldError } from '@/validation/errors'
import { MinLengthValidation } from './min-length-validation'

const makeSut = (fieldName: string) => new MinLengthValidation(fieldName, 5)

describe('MinLengthValidation', () => {
  test('Should return error if field is invalid', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.random.alphaNumeric(3) })
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return null if field is valid', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.random.alphaNumeric(5) })
    expect(error).toBeFalsy()
  })

  test('Should return null if field does not exists', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [faker.database.column()]: faker.random.alphaNumeric(5) })
    expect(error).toBeFalsy()
  })
})
