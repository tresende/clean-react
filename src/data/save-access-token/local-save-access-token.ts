import { SetStorage } from '@/data/protocols/cache'
import { UnexpectedError } from '@/domain/errors'
import { SaveAccessToken } from '@/domain/usecases'

export class LocalSaveAccessToken implements SaveAccessToken {
  constructor(private readonly SetStorage: SetStorage) {}

  async save(accessToken: string) {
    if (!accessToken) throw new UnexpectedError()
    return await this.SetStorage.set('accessToken', accessToken)
  }
}
