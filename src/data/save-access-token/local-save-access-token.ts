import { SetStorage } from '@/data/protocols/cache'
import { SaveAccessToken } from '@/domain/usecases'

export class LocalSaveAccessToken implements SaveAccessToken {
  constructor(private readonly SetStorage: SetStorage) {}

  async save(accessToken: string) {
    return await this.SetStorage.set('accessToken', accessToken)
  }
}
