import { SetStorage } from '@/data/protocols/cache'
import { LocalstoraAdpater } from '@/infra/cache/local-storage-adapter'

export const makeLocalStorageAdpater = (): SetStorage => {
  return new LocalstoraAdpater()
}
