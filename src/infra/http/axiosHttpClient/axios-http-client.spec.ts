import axios from 'axios'

import { mockAxios } from '@/infra/test'
import { mockPostRequest } from '@/data/test'
import { AxiosHttpClient } from './axios-http-client'

jest.mock('axios')
type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const mockedAxios = mockAxios()
  const sut = new AxiosHttpClient()
  return { sut, mockedAxios }
}

describe('axiosHttpClient ', () => {
  test('Should call axios with correct values', async () => {
    const request = mockPostRequest()
    const { sut, mockedAxios } = makeSut()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  test('Should return the correct status code and body', () => {
    const request = mockPostRequest()
    const { sut, mockedAxios } = makeSut()
    const response = sut.post(request)
    expect(response).toEqual(mockedAxios.post.mock.results[0].value)
  })
})
