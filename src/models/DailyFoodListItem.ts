export default class DailyFoodListItem {
    id: number;
    kfid: number;
    title: string;
    foods: string;
    is_main: boolean;
    eat_time: string;
    imgs: string[];
    constructor(
      id: number,
      kfid: number,
      title: string,
      foods: string,
      is_main: boolean,
      eat_time: string,
      imgs: string[]
    ) {
      this.id = id;
      this.kfid = kfid;
      this.title = title;
      this.foods = foods;
      this.is_main = is_main;
      this.eat_time = eat_time;
      this.imgs = imgs;
    }
  }