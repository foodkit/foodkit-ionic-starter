/* eslint-disable @typescript-eslint/camelcase */
import ApiClient from "./apiClient";
import config from "@/config";
import AuthService from "./authService";

export default class OrdersService {
  constructor(
    protected apiClient: ApiClient,
    protected authService: AuthService
  ) {}

  public async status(id: number): Promise<string | null> {
    const token = this.authService.getAccessToken();
    if (!token) {
      throw new Error("Authorization is required to perform the checkout");
    }

    try {
      this.apiClient.setToken(token);

      const customer = await this.authService.currentUser();

      if (!customer) {
        throw new Error("Unable to retireve customer information.");
      }

      const response = await this.apiClient.get(
        `/v4/storefront/customers/brands/${config.brandId}/customers/${customer.id}/orders/${id}/track`
      );

      return response.data.data.state_human_readable;
    } catch (error) {
      return null;
    }
  }
}
