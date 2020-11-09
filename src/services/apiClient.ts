import Axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { AxiosResponse } from "axios";

export default class ApiClient {
  httpClient: AxiosInstance;
  token?: string;
  tenantId = 4; //TODO: replace with your tenant ID

  constructor() {
    this.httpClient = Axios.create({
      baseURL: "http://localhost:9999/api", //TODO: replace with staging/production url
    });
  }

  public setToken(token?: string): ApiClient {
    this.token = token;
    this.setupInterceptor(token);

    return this;
  }

  public getTenantId(): number {
    return this.tenantId;
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
