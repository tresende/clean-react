import faker from 'faker'

import {
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation,
  ValidationBuilder as sut
} from '@/validation/validators'

const field = faker.database.column()
const length = faker.datatype.number()

describe('ValidationBuilder', () => {
  test('Should return RequiredFeildValidation', () => {
    const validations = sut.field(field).required().build()
    expect(validations).toEqual([new RequiredFieldValidation(field)])
  })

  test('Should return EmialValidation', () => {
    const validations = sut.field(field).email().build()
    expect(validations).toEqual([new EmailValidation(field)])
  })

  test('Should return MinLengthValidation', () => {
    const validations = sut.field(field).min(length).build()
    expect(validations).toEqual([new MinLengthValidation(field, length)])
  })

  test('Should return a list of validations', () => {
    const validations = sut.field(field).required().min(length).email().build()
    expect(validations).toEqual([
      new RequiredFieldValidation(field),
      new MinLengthValidation(field, length),
      new EmailValidation(field)
    ])
  })
})
