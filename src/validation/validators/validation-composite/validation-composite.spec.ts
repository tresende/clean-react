import faker from 'faker'

import { FieldValidationSpy } from '../test/mock-field-validation'
import { ValidationComposite } from './validation-composite'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationsSpy: FieldValidationSpy[]
  fieldName: string
}

const makeSut = (fieldName = faker.database.column()): SutTypes => {
  const fieldValidationsSpy = [new FieldValidationSpy(fieldName), new FieldValidationSpy(fieldName)]

  const sut = new ValidationComposite(fieldValidationsSpy)
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
    const error = sut.validate(fieldName, faker.random.word())

    expect(error).toBe(errorMessage)
  })

  test('Should return error if any validation fail', () => {
    const { sut, fieldName } = makeSut()
    const error = sut.validate(fieldName, faker.random.word())

    expect(error).toBeNull()
  })
})
