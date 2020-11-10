/* eslint-disable @typescript-eslint/camelcase */
import Address from "@/models/address";
import ApiClient from "./apiClient";
import config from "@/config";
import CartService from "./cartService";

export default class CheckoutService {
  constructor(
    protected apiClient: ApiClient,
    protected cartService: CartService
  ) {}

  public async checkout(address: Address): Promise<boolean> {
    try {
      await this.apiClient.post(
        `/v3/storefront/vendors/${config.branchId}/orders`,
        {
          payment_type: "cod",
          products: this.cartService.getItems().map((cartItem) => {
            return {
              id: cartItem.menuItem.id,
              quantity: cartItem.quantity,
            };
          }),
          is_realtime: true,
          latitude: address.latitude,
          longitude: address.longitude,
          address,
        }
      );

      return true;
    } catch (error) {
      return false;
    }
  }
}
