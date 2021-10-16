import { HttpPostParams, HttpResponse, HttpPostClient } from '@/data/protocols/http'
import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post(params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    let response: AxiosResponse
    try {
      response = await axios.post(params.url, params.body)
    } catch (error) {
      response = error.response
    }
    return {
      statusCode: response.status,
      body: response.data
    }
  }
}
