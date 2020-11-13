/* eslint-disable @typescript-eslint/camelcase */
import Address from "@/models/address";
import ApiClient from "./apiClient";
import config from "@/config";
import CartService from "./cartService";
import AuthService from "./authService";

export default class CheckoutService {
  constructor(
    protected apiClient: ApiClient,
    protected authService: AuthService,
    protected cartService: CartService
  ) {}

  public async checkout(address: Address): Promise<number | null> {
    const token = this.authService.getAccessToken();
    if (!token) {
      throw new Error("Authorization is required to perform the checkout");
    }

    try {
      this.apiClient.setToken(token);

      const response = await this.apiClient.post(
        `/v3/storefront/vendors/${config.branchId}/orders`,
        {
          type: "delivery",
          payment_type: "cod",
          products: this.cartService.getItems().map((cartItem) => {
            return {
              id: cartItem.menuItem.id,
              quantity: cartItem.quantity,
              extra_items: [],
            };
          }),
          is_realtime: true,
          latitude: address.latitude,
          longitude: address.longitude,
          address,
        }
      );

      this.cartService.clear();

      return response.data.data.id;
    } catch (error) {
      return null;
    }
  }
}
