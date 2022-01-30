import { mockAccountModel } from '@/domain/test'
import { AddAccount, AddAccountParams } from '@/domain/usecases'

export class AddAccountSpy implements AddAccount {
  account = mockAccountModel()
  params: AddAccountParams
  callsCount = 0

  async add(params: AddAccountParams) {
    this.params = params
    this.callsCount++
    return this.account
  }
}
