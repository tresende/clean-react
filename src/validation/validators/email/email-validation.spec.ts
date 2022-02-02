import faker from 'faker'

import { InvalidFieldError } from '@/validation/errors'
import { EmailValidation } from './email-validation'

const makeSut = (field: string) => new EmailValidation(field)

describe('EmailValidation', () => {
  test('Should return error if field is invalid', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.random.word() })
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return null if field is invalid', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.internet.email() })
    expect(error).toBeNull()
  })
})
