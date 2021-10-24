import faker from 'faker'
import 'jest-localstorage-mock'

import { LocalstoraAdpater } from './local-storage-adapter'

const makeSut = () => new LocalstoraAdpater()

describe('LocalstoraAdpater', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('Should call localstorage with correct values', () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = faker.random.word()
    sut.set(key, value)

    expect(localStorage.setItem).toHaveBeenCalledWith(key, value)
  })

  test('Should call localstorage with correct values', () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = faker.random.word()
    sut.set(key, value)

    expect(localStorage.setItem).toHaveBeenCalledWith(key, value)
  })
})
