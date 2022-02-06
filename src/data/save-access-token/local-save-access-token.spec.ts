import faker from 'faker'

import { SetStorageMock } from '../test'
import { LocalSaveAccessToken } from '@/data/save-access-token/local-save-access-token'
import { UnexpectedError } from '@/domain/errors'

type MakeSut = {
  sut: LocalSaveAccessToken
  setStorage: SetStorageMock
}

const makeSut = (): MakeSut => {
  const setStorage = new SetStorageMock()
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

  it('Should throw if set storage throws', async () => {
    const { sut, setStorage } = makeSut()
    const error = Error()
    jest.spyOn(setStorage, 'set').mockRejectedValueOnce(error)
    const accessToken = faker.datatype.uuid()
    const promisse = sut.save(accessToken)
    await expect(promisse).rejects.toThrow(error)
  })

  it('Should throw if access token is falsy', async () => {
    const { sut } = makeSut()
    const promisse = sut.save(undefined)
    await expect(promisse).rejects.toThrow(new UnexpectedError())
  })
})
