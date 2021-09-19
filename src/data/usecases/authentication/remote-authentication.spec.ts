import faker from 'faker'

import { AccountModel } from '@/domain/models/AccountModel'
import { RemoteAuthentication } from './remote-authentication'
import { HttpPostClientSpy } from '@/data/test/mock-http-client'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { HttpStatusCode } from '@/data/protocols/http/http-response'
import { AuthenticationParams } from '@/domain/usecases/authentication'
import { mockAuthentication, mockAccountModel } from '@/domain/test/mock-account'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AuthenticationParams, AccountModel>()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)
  return { httpPostClientSpy, sut }
}

describe('RemoteAuthentication ', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    //System Under Test
    const url = faker.internet.url()
    const { httpPostClientSpy, sut } = makeSut(url)
    await sut.auth(mockAuthentication())
    expect(httpPostClientSpy.url).toBe(url)
  })

  test('Should call HttpPostClient with correct body', async () => {
    const authenticationParams = mockAuthentication()
    const { httpPostClientSpy, sut } = makeSut()
    await sut.auth(authenticationParams)
    expect(httpPostClientSpy.body).toBe(authenticationParams)
  })

  test('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const authenticationParams = mockAuthentication()
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promisse = sut.auth(authenticationParams)
    await expect(promisse).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    const authenticationParams = mockAuthentication()
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unathorized
    }
    const promisse = sut.auth(authenticationParams)
    await expect(promisse).rejects.toThrow(new InvalidCredentialsError())
  })

  test('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const authenticationParams = mockAuthentication()
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promisse = sut.auth(authenticationParams)
    await expect(promisse).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const authenticationParams = mockAuthentication()
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promisse = sut.auth(authenticationParams)
    await expect(promisse).rejects.toThrow(new UnexpectedError())
  })

  test('Should return an Anccount when HttpPostClient returns 200', async () => {
    const authenticationParams = mockAuthentication()
    const httpResult = mockAccountModel()
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const account = await sut.auth(authenticationParams)
    await expect(account).toEqual(httpResult)
  })
})
