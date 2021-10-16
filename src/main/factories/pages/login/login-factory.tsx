import React from 'react'

import { Login } from '@/presentation/pages'
import { makeLoginValidation } from './login-validation-factory'
import { makeRemoteAuthentication } from '@/main/factories/use-cases/authentication/remote-authentication-factory'

export const makeLogin = () => {
  return <Login authentication={makeRemoteAuthentication()} validation={makeLoginValidation()} />
}
