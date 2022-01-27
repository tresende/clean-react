import { SetStorage } from '@/data/protocols/cache'

export class LocalstoraAdpater implements SetStorage {
  set(key: string, value: string) {
    localStorage.setItem(key, value)
    return Promise.resolve()
  }
}
