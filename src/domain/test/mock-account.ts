import faker from 'faker'
import { AccountModel } from '../models/AccountModel'

import { AuthenticationParams } from '../usecases/authentication'

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid()
})
