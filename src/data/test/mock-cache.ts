import { SetStorage } from '../protocols/cache'

export class SetStorageMock implements SetStorage {
  key: string
  value: string

  set(key: string, value: string) {
    this.key = key
    this.value = value
    return Promise.resolve()
  }
}
