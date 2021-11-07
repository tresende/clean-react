import { AddAccountParams, AuthenticationParams } from '@/domain/usecases'
import { AccountModel } from '../models'
import faker from 'faker'

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid()
})

export const mockAddAccount = (): AddAccountParams => {
  const password = faker.internet.password()
  return { name: faker.name.findName(), email: faker.internet.email(), password, passwordConfirmation: password }
}
