import faker from 'faker'

import { FieldValidationSpy } from '@/validation/test'
import { ValidationComposite } from '@/validation/validators'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationsSpy: FieldValidationSpy[]
  fieldName: string
}

const makeSut = (fieldName = faker.database.column()): SutTypes => {
  const fieldValidationsSpy = [new FieldValidationSpy(fieldName), new FieldValidationSpy(fieldName)]

  const sut = ValidationComposite.build(fieldValidationsSpy)
  return {
    sut,
    fieldName,
    fieldValidationsSpy
  }
}

describe('ValidationComposite', () => {
  test('Should return error if any validation fail', () => {
    const errorMessage = faker.random.words()
    const { sut, fieldValidationsSpy, fieldName } = makeSut()

    fieldValidationsSpy[0].error = new Error(errorMessage)
    const error = sut.validate(fieldName, { [fieldName]: faker.random.word() })

    expect(error).toBe(errorMessage)
  })

  test('Should return error if any validation fail', () => {
    const { sut, fieldName } = makeSut()
    const error = sut.validate(fieldName, { [fieldName]: faker.random.word() })

    expect(error).toBeNull()
  })
})
