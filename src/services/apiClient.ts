import axios, { AxiosResponse } from "axios";

export default class ApiClient {

    //TODO: use token
    //TODO: add base client and config with api url

  public async get(path: string): Promise<AxiosResponse> {
    return await axios.get(path);
  }

  public async post(path: string, data: any): Promise<AxiosResponse> {
    return await axios.post(path, data);
  }

  public async patch(path: string, data: any): Promise<AxiosResponse> {
    return await axios.patch(path, data);
  }
}
