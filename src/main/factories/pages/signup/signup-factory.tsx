import React from 'react'

import { Signup } from '@/presentation/pages'
import { makeSignupValidation } from './signup-validation-factory'
import { makeLocalSaveAccessToken } from '@/main/factories/use-cases/save-access-token/local-save-access-token-factory'
import { makeRemoteAddAccount } from '@/main/factories/use-cases/add-account/add-account-factory'

export const makeSignup = () => {
  return (
    <Signup
      addAccount={makeRemoteAddAccount()}
      saveAccessToken={makeLocalSaveAccessToken()}
      validation={makeSignupValidation()}
    />
  )
}
