import axios, { AxiosAdapter, AxiosInstance, AxiosResponse } from "axios";

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

  async get<T>(path: string) {
    const res = await this.http.get<T>(path);

    // For demo, add latency manually each request.
    return new Promise<AxiosResponse<T>>((resolve) => {
      setTimeout(() => resolve(res), 200);
    });
  }
}
