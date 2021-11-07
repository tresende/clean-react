import { SaveAccessToken } from '@/domain/usecases'

export class SaveAccessTokenMock implements SaveAccessToken {
  async save(accessToken: string): Promise<void> {
    this.accessToken = accessToken
  }
  accessToken: string
}
