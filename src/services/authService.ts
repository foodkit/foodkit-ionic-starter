/* eslint-disable @typescript-eslint/camelcase */
import ApiClient from "./apiClient";
import config from "@/config";

export default class AuthService {
  public loggedIn = false;

  constructor(protected apiClient: ApiClient, protected storage: Storage) {
    this.loggedIn = this.isTokenStored();
  }

  public isLoggedIn(): boolean {
    return this.loggedIn;
  }

  public async login(username: string, password: string): Promise<boolean> {
    try {
      const response = await this.apiClient.post("/v1/oauth/access_token", {
        grant_type: "customer",
        client_id: config.clientId,
        client_secret: config.clientSecret,
        idp: "password",
        username: username,
        password: password,
      });

      this.loggedIn = true;
      this.setAuthState(response.data.access_token);

      return true;
    } catch (error) {
      this.loggedIn = false;
      return false;
    }
  }

  public async register(
    email: string,
    phoneNumber: string,
    firstName: string,
    lastName: string,
    password: string
  ): Promise<boolean> {
    try {
      this.apiClient.setToken(config.guestToken);

      await this.apiClient.post("/v1/storefront/customers", {
        email,
        phone_number: phoneNumber,
        name: `${firstName} ${lastName}`,
        first_name: firstName,
        last_name: lastName,
        password,
        tenant_id: config.tenantId,
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  public logout(): AuthService {
    this.clearAuthState();
    this.loggedIn = false;

    return this;
  }

  protected isTokenStored(): boolean {
    return this.storage.getItem("foodkit:access_token") !== null;
  }

  protected clearAuthState(): AuthService {
    this.storage.removeItem("foodkit:access_token");

    return this;
  }

  protected setAuthState(accessToken: string): AuthService {
    this.storage.setItem("foodkit:access_token", accessToken);

    return this;
  }
}
