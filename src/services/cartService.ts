import CartItem from "@/models/cartItem";
import MenuItem from "@/models/menuItem";

export default class CartService {
  protected items: Array<CartItem> = [];

  public getItems(): Array<CartItem> {
    return this.items;
  }

  public add(menuItem: MenuItem, quantity = 1): CartService {
    const index = this.items.findIndex((cartItem: CartItem) => {
      return cartItem.menuItem.id === menuItem.id;
    });

    if (index === -1) {
      const cartItem = new CartItem();
      cartItem.menuItem = menuItem;
      cartItem.quantity = quantity;

      this.items.push(cartItem);
    } else {
      this.items[index].quantity++;
    }

    return this;
  }

  public remove(menuItem: MenuItem): CartService {
    const index = this.items.findIndex((cartItem: CartItem) => {
      return cartItem.menuItem.id === menuItem.id;
    });
    if (index !== -1) {
      this.items.splice(index, 1);
    }
    return this;
  }

  public total(): number {
    let total = 0;

    this.items.forEach((cartItem) => {
      total += cartItem.menuItem.price || 0 * cartItem.quantity;
    });

    return total;
  }
}
