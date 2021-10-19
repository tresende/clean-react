import faker from 'faker'

import { SetStorageSpy } from '../test'
import { LocalSaveAccessToken } from './local-save-access-token'

type MakeSut = {
  sut: LocalSaveAccessToken
  setStorage: SetStorageSpy
}

const makeSut = (): MakeSut => {
  const setStorage = new SetStorageSpy()
  const sut = new LocalSaveAccessToken(setStorage)
  return {
    sut,
    setStorage
  }
}

describe('LocalSaveAccessToken', () => {
  it('Should call set storage with correct value', async () => {
    const { sut, setStorage } = makeSut()
    const accessToken = faker.datatype.uuid()
    await sut.save(accessToken)
    expect(setStorage.key).toBe('accessToken')
    expect(setStorage.value).toBe(accessToken)
  })
})
