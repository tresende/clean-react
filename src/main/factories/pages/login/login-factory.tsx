import React from 'react'

import { Login } from '@/presentation/pages'
import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client'
import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'
import { ValidationBuilder, ValidationComposite } from '@/validation/validators'

export const makeLogin = () => {
  const url = 'http://fordevs.herokuapp.com/api/login'
  const axiosHttpClient = new AxiosHttpClient()
  const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient)
  const validationComposite = ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').min(5).required().build()
  ])

  return <Login authentication={remoteAuthentication} validation={validationComposite} />
}
