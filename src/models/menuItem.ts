export default class MenuItem {
  public id?: number;
  public code?: string;
  public brandId?: number;
  public categoryId?: number;
  public name?: string;
  public description?: string;
  public price?: number;
  public images?: {
    w: number;
    h: number;
    src: string;
  };
}
