import Menu from "@/models/menu";
import MenuItem from '@/models/menuItem';
import ApiClient from "./apiClient";

export default class MenuService {
  constructor(protected apiClient: ApiClient) {}

  public async get(tenantId: number): Promise<Menu> {
    const response = await this.apiClient.get(`/v5/storefront/content/tenants/${tenantId}/menu.json`);

    const menu = new Menu();

    const items = response.data.items.map(rawMenuItem => {
        let menuItem = new MenuItem();
        
        menuItem.id = rawMenuItem.id;
        menuItem.brandId = rawMenuItem.brand_id;
        menuItem.categoryId = rawMenuItem.category_id;
        menuItem.code = rawMenuItem.code;
        menuItem.price = rawMenuItem.price;

        return menuItem;
    });

    menu.setItems(items);

    return menu;
  }
}
