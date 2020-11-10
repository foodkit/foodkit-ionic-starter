import currencyFormat from "@/helpers/currencyFormat";

export default class MenuItem {
  public id: number;
  public code: string;
  public brandId: number;
  public categoryId: number;
  public name: string;
  public description?: string;
  public price: number;
  public images: Array<{
    w: number;
    h: number;
    src: string;
  }>;

  public formatPrice(): string {
    return currencyFormat(this.price);
  }
}
