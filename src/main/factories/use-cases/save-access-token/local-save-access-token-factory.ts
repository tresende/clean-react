import { SaveAccessToken } from '@/domain/usecases'
import { LocalSaveAccessToken } from '@/data/save-access-token/local-save-access-token'
import { makeLocalStorageAdpater } from '@/main/factories/cache/local-storage-adapter-factory'

export const makeLocalSaveAccessToken = (): SaveAccessToken => {
  return new LocalSaveAccessToken(makeLocalStorageAdpater())
}
