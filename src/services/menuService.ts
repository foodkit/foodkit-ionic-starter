import Menu from "@/models/menu";
import MenuItem from "@/models/menuItem";
import ApiClient from "./apiClient";
import config from "@/config";

export default class MenuService {
    constructor(protected apiClient: ApiClient, protected storage: Storage) {
    }

    public async get(): Promise<Menu> {
        const cachedMenu = this.getFromCache();

        const timestampResponse = await this.apiClient.get(
            `/v5/storefront/content/tenants/${config.tenantId}/menu/timestamp`
        );

        if (cachedMenu && cachedMenu.getTimestamp() === timestampResponse.data.timestamp) {
            console.log('Loading menu from cache.');
            return cachedMenu;
        }

        console.log('Loading menu from API.');
        const response = await this.apiClient.get(timestampResponse.data.url);

        const menu = new Menu();
        menu.setTimestamp(timestampResponse.data.timestamp);
        menu.setItems(this.mapItems(response.data.items));

        this.storeInCache(menu);

        return menu;
    }

    protected mapItems(rawItems: Array<any>): Array<MenuItem> {
        return rawItems.map((rawMenuItem: any) => {
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
    }

    protected storeInCache(menu: Menu): MenuService {
        this.storage.setItem('foodkit:menu', JSON.stringify({
            timestamp: menu.getTimestamp(),
            items: menu.getItems()
        }));

        return this;
    }

    protected getFromCache(): Menu | null {
        const serializedMenu = this.storage.getItem('foodkit:menu');

        if (serializedMenu) {
            const menuDescriptor = JSON.parse(serializedMenu);

            const menu = new Menu();
            menu.setTimestamp(menuDescriptor.timestamp);
            menu.setItems(menuDescriptor.items.map((item: any) => {
                const menuItem = new MenuItem();
                Object.assign(menuItem, item);

                return menuItem;
            }));

            return menu;
        }

        return null;
    }
}
