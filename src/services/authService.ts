/* eslint-disable @typescript-eslint/camelcase */
import ApiClient from "./apiClient";

export default class AuthService {
  constructor(protected apiClient: ApiClient, protected storage: Storage) {}

  public isLoggedIn(): boolean {
    return this.storage.getItem("foodkit:auth.state") !== null;
  }

  public async login(username: string, password: string): Promise<boolean> {
    try {
      const response = await this.apiClient.post("/v1/oauth/access_token", {
        grant_type: "customer",
        client_id: "store-front-web-snp", //TODO: set your client id from admin panel
        client_secret: "ua9CdVq6n8tMpbqgPMrAO8OfjhEYoQJBvy", //TODO: set your client secret from admin panel
        idp: "password",
        username: username,
        password: password,
      });

      this.setAuthState({
        accessToken: response.data.access_token,
      });

      return true;
    } catch (error) {
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
      const response = await this.apiClient.post("/v1/storefront/customers", {
        email,
        phone_number: phoneNumber,
        name: `${firstName} ${lastName}`,
        first_name: firstName,
        last_name: lastName,
        password,
        tenant_id: this.apiClient.getTenantId(),
      });

      console.log(response.data);

      return true;
    } catch (error) {
      return false;
    }
  }

  public logout(): AuthService {
    this.clearAuthState();

    return this;
  }

  protected clearAuthState(): AuthService {
    this.storage.removeItem("foodkit:auth.state");

    return this;
  }

  protected setAuthState(state: any): AuthService {
    this.storage.setItem("foodkit:auth.state", JSON.stringify(state));

    return this;
  }
}
