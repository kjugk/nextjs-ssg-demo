import axios, { AxiosAdapter, AxiosInstance } from "axios";

export class HttpClient {
  http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: "https://nextjs-demo.microcms.io/api/v1/",
      headers: {
        "X-API-KEY": process.env.CMS_API_KEY,
      },
    });
  }

  get<T>(path: string) {
    return this.http.get<T>(path);
  }
}
