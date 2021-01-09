/* eslint-disable @typescript-eslint/camelcase */
import ApiClient from "./apiClient";
import config from "@/config";
import User from "@/models/user";

export default class AuthService {
  public user: User | null;

  constructor(protected apiClient: ApiClient, protected storage: Storage) {}

  public isLoggedIn(): boolean {
    return !!this.user;
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
      
      this.setAuthState(response.data.access_token);

      this.user = await this.currentUser();

      return true;
    } catch (error) {
      console.error('error logging in', error);
      this.user = null;
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
      this.apiClient.setToken(config.token);

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

  public async currentUser(): Promise<User | null> {
    if (this.user) {
      return this.user;
    }

    try {
      const token = this.getAccessToken();
      if (!token) {
        throw new Error(
          "Authorization is required to retrieve current user information."
        );
      }
      this.apiClient.setToken(token);

      const response = await this.apiClient.get(`/v5/storefront/customers/tenants/${config.tenantId}/customers`);

      const user = new User();
      user.id = response.data.data.id;
      user.name = response.data.data.name;

      this.user = user;

      return user;
    } catch (error) {
      return null;
    }
  }

  public logout(): AuthService {
    this.clearAuthState();
    this.user = null;

    return this;
  }

  public getAccessToken(): string | null {
    const accessToken = this.storage.getItem("foodkit:access_token");
    return accessToken;
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
