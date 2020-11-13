import MenuItem from "./menuItem";

export default class Menu {
  constructor(protected items: Array<MenuItem> = []) {}

  public addItem(menuItem: MenuItem): Menu {
    this.items.push(menuItem);

    return this;
  }

  public setItems(items: Array<MenuItem>): Menu {
    this.items = items;

    return this;
  }

  public getItems(): Array<MenuItem> {
    return this.items;
  }
}
