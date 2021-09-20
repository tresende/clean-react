/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'

import { HttpPostClient, HttpPostParams, HttpResponse } from '@/data/protocols/http'

//adapter
//AxiosHttpClient faz a adptação para o HttpPostParams e HttpResponse
//se quiser trocar pelo fetch é só reemplementar aqui dentrop
export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post(params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    const response = await axios.post(params.url, params.body)
    return {
      statusCode: response.status,
      body: response.data
    }
  }
}
