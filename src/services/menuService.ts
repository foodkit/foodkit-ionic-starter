import Menu from "@/models/menu";
import MenuItem from "@/models/menuItem";
import ApiClient from "./apiClient";
import config from "@/config";

export default class MenuService {
  constructor(protected apiClient: ApiClient) {}

  public async get(): Promise<Menu> {
    const timestampResponse = await this.apiClient.get(
      `/v5/storefront/content/tenants/${config.tenantId}/menu/timestamp`
    );

    const response = await this.apiClient.get(timestampResponse.data.url);

    const menu = new Menu();

    const items = response.data.items.map((rawMenuItem: any) => {
      const menuItem = new MenuItem();

      menuItem.id = rawMenuItem.id;
      menuItem.code = rawMenuItem.code;
      menuItem.brandId = rawMenuItem.brand_id;
      menuItem.categoryId = rawMenuItem.category_id;
      menuItem.name = rawMenuItem.locales.en.name;
      menuItem.description = rawMenuItem.locales.en.description || "-";
      menuItem.price = rawMenuItem.price;
      menuItem.images = rawMenuItem.images;

      return menuItem;
    });

    menu.setItems(items);

    return menu;
  }
}
