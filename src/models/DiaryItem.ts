import DailyFoodListItem from "./DailyFoodListItem"

export default class DiaryItem {
    kid: number;
    weight: number;
    measure_time: string;
    remark: string;
    date: string;
    imgs: string[];
    foods: DailyFoodListItem[];
    day: string;
  
    private readonly _ImgUrlHead ="http://localhost:1111/api/Image?fid=";
  
    constructor(
      kid: number,
      weight: number,
      measure_time: string,
      remark: string,
      date: string,
      imgs: string[],
      foods: DailyFoodListItem[],
      day: string
    ) {
      this.kid = kid;
      this.weight = weight;
      this.measure_time = measure_time;
      this.remark = remark;
      this.date = date;
      this.imgs = [];
      this.day = day;
      if (imgs != null && imgs != undefined) {
        imgs.forEach(element => {
          this.imgs.push(`${this._ImgUrlHead+ element}`);
        });
      }
      this.foods = foods;
      if (foods != null && foods != null) {
        foods.forEach(e => {
          if (e.imgs != null && e.imgs != undefined) {
            e.imgs.forEach(element => {
              this.imgs.push(`${this._ImgUrlHead+ element}`);
            });
          }
        });
      }
    }
  }