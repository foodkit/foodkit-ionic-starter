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
  }

  public setToken(token?: string): ApiClient {
    this.token = token;
    this.setupInterceptor(token);

    return this;
  }

  protected setupInterceptor(token?: string): void {
    this.httpClient.interceptors.request.use((config: AxiosRequestConfig) => {
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      } else {
        delete config.headers["Authorization"];
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
