
export default class UpdateDiaryModel {
    kid: number|null;
    weight: number|null;
    measure_time: string|null;
    remark: string|null;
    date: string|null;
    fids: string[]|null;
    foods: UpdateDailyFoodModel[];
    day: string|null;
  
    private readonly _ImgUrlHead ="http://localhost:5000/api/Image?fid=";
  
    constructor(
      kid: number|null,
      weight: number|null,
      measure_time: string|null,
      remark: string|null,
      date: string|null,
      fids: string[]|null,
      foods: UpdateDailyFoodModel[]|null,
      day: string|null
    ) {
      this.kid = kid;
      this.weight = weight;
      this.measure_time = measure_time;
      this.remark = remark;
      this.date = date;
      if(foods==null)
        this.foods = [];
      else
        this.foods = foods;
        if(fids==null)
        this.fids = [];
        else
        this.fids = fids;
      this.day = day;
      this.foods = [];
      if (foods != null && foods != null) {
        foods.forEach(e => {
          this.foods.push(
            new UpdateDailyFoodModel(
              e.id,
              e.kfid,
              e.title,
              e.foods,
              e.is_main,
              e.eat_time,
              e.fids
            )
          );
        });
      }
    }
  }

  export  class UpdateDailyFoodModel {
    id: number|null;
    kfid: number|null;
    title: string|null;
    foods: string|null;
    is_main: boolean|null;
    eat_time: string|null;
    fids: string[];
    constructor(
      id: number|null=0,
      kfid: number|null=0,
      title: string|null="",
      foods: string|null="",
      is_main: boolean|null=true,
      eat_time: string|null="",
      fids: string[]|null=[]
    ) {
      this.id = id;
      this.kfid = kfid;
      this.title = title;
      this.foods = foods;
      this.is_main = is_main;
      this.eat_time = eat_time;
      if(fids==null)
      this.fids = [];
      else
      this.fids = fids;
    }
  }