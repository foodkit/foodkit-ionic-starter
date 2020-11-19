import MenuItem from "./menuItem";

export default class Menu {
    protected timestamp: number;
    protected items: Array<MenuItem> = [];

    public addItem(menuItem: MenuItem): Menu {
        this.items.push(menuItem);

        return this;
    }

    public setTimestamp(timestamp: number): Menu {
        this.timestamp = timestamp;

        return this;
    }

    public getTimestamp(): number {
        return this.timestamp;
    }

    public setItems(items: Array<MenuItem>): Menu {
        this.items = items;

        return this;
    }

    public getItems(): Array<MenuItem> {
        return this.items;
    }
}
