import axios, { AxiosAdapter, AxiosInstance, AxiosResponse } from "axios";

export class HttpClient {
  http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: process.env.CMS_API_URL,
      headers: {
        "X-API-KEY": process.env.CMS_API_KEY,
      },
    });
  }

  get<T>(path: string) {
    return this.http.get<T>(path);
  }
}
