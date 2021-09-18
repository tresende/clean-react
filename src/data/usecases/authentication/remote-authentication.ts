import { HttpPostClient } from '@/data/protocols/http/http-post-client'

export class RemoteAuthentication {
  constructor(private readonly url: string, private readonly httpPostClient: HttpPostClient) {}

  async auth() {
    this.httpPostClient.post(this.url)
    return Promise.resolve()
  }
}
