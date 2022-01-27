import React from 'react'

import { Login } from '@/presentation/pages'
import { makeLoginValidation } from './login-validation-factory'
import { makeRemoteAuthentication } from '@/main/factories/use-cases/authentication/remote-authentication-factory'
import { makeLocalSaveAccessToken } from '@/main/factories/use-cases/save-access-token/local-save-access-token-factory'

export const makeLogin = () => {
  return (
    <Login
      saveAccessToken={makeLocalSaveAccessToken()}
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
    />
  )
}
