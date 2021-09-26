import React from 'react'
import faker from 'faker'
import { render, fireEvent, cleanup, RenderResult } from '@testing-library/react'

import Login from '.'
import { AccountModel } from '@/domain/models'
import { ValidationStub } from '@/presentation/test'
import { mockAccountModel } from '@/domain/test/mock-account'
import { Authentication, AuthenticationParams } from '@/domain/usecases'

class AuthenticationSpy implements Authentication {
  account = mockAccountModel()
  params: AuthenticationParams

  auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params
    return Promise.resolve(this.account)
  }
}

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
}

const makeSut = (errorMessage?: string): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  validationStub.errorMessage = errorMessage

  const sut = render(<Login validation={validationStub} authentication={authenticationSpy} />)
  return { sut, authenticationSpy }
}

describe('Login Component', () => {
  afterEach(() => {
    cleanup()
  })

  test('Should start with inital state', () => {
    const errorMessage = faker.random.words()
    const { sut } = makeSut(errorMessage)
    const errorWrap = sut.getByTestId('error-wrap')
    const button = sut.getByTestId('submit') as HTMLButtonElement
    const emailStatus = sut.getByTestId('emailStatus')
    const passwordStatus = sut.getByTestId('passwordStatus')

    expect(errorWrap.childElementCount).toBe(0)
    expect(button.disabled).toBe(true)
    expect(emailStatus.title).toBe(errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
    expect(passwordStatus.title).toBe(errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should email error if validation falid', () => {
    const errorMessage = faker.random.words()
    const { sut } = makeSut(errorMessage)
    const emailInput = sut.getByTestId('email')
    const value = faker.internet.email()
    fireEvent.input(emailInput, { target: { value } })
    const emailStatus = sut.getByTestId('emailStatus')

    expect(emailStatus.title).toBe(errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
  })

  test('Should email error if validation succeeds', () => {
    const { sut } = makeSut()

    const emailInput = sut.getByTestId('email')
    const passwordInput = sut.getByTestId('password')

    const emailValue = faker.internet.email()
    fireEvent.input(emailInput, { target: { value: emailValue } })

    const passwordValue = faker.internet.email()
    fireEvent.input(passwordInput, { target: { value: passwordValue } })

    const emailStatus = sut.getByTestId('emailStatus')
    const passwordStatus = sut.getByTestId('passwordStatus')

    expect(emailStatus.title).toBe('Tudo Certo!')
    expect(emailStatus.textContent).toBe('🟢')

    expect(passwordStatus.title).toBe('Tudo Certo!')
    expect(passwordStatus.textContent).toBe('🟢')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    const emailInput = sut.getByTestId('email')
    const passwordInput = sut.getByTestId('password')

    const emailValue = faker.internet.email()
    fireEvent.input(emailInput, { target: { value: emailValue } })

    const passwordValue = faker.internet.email()
    fireEvent.input(passwordInput, { target: { value: passwordValue } })

    const button = sut.getByTestId('submit') as HTMLButtonElement
    expect(button.disabled).toBe(false)
  })

  test('Should show loading on submit', () => {
    const { sut } = makeSut()
    const emailInput = sut.getByTestId('email')
    const passwordInput = sut.getByTestId('password')

    const emailValue = faker.internet.email()
    fireEvent.input(emailInput, { target: { value: emailValue } })

    const passwordValue = faker.internet.email()
    fireEvent.input(passwordInput, { target: { value: passwordValue } })

    const button = sut.getByTestId('submit')
    fireEvent.click(button)

    const spinner = sut.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  test('Should call authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut()
    const emailInput = sut.getByTestId('email')
    const passwordInput = sut.getByTestId('password')

    const email = faker.internet.email()
    fireEvent.input(emailInput, { target: { value: email } })

    const password = faker.internet.password()
    fireEvent.input(passwordInput, { target: { value: password } })

    const button = sut.getByTestId('submit')
    fireEvent.click(button)
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })

    const spinner = sut.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })
})
