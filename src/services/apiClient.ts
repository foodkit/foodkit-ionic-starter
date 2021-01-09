import Axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { AxiosResponse } from "axios";
import config from "@/config";

export default class ApiClient {
  httpClient: AxiosInstance;
  token?: string;

  constructor() {
    this.httpClient = Axios.create({
      baseURL: config.apiUrl,
    });
    this.setupInterceptor();
  }

  public setToken(token?: string): ApiClient {
    this.token = token;
    return this;
  }

  protected setupInterceptor(): void {
    this.httpClient.interceptors.request.use((config: AxiosRequestConfig) => {
      if (this.token) {
        config.headers["Authorization"] = `Bearer ${this.token}`;
      }
      return config;
    });
  }

  public async get(path: string): Promise<AxiosResponse> {
    return await this.httpClient.get(path);
  }

  public async post(path: string, data: any): Promise<AxiosResponse> {
    return await this.httpClient.post(path, data);
  }

  public async patch(path: string, data: any): Promise<AxiosResponse> {
    return await this.httpClient.patch(path, data);
  }
}
