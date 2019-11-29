<template>
  <div>
    <van-row>
      <van-cell-group>
        <van-field
          label="日期"
          @click="showDatePopup"
          placeholder="请选择日期"
          :value="diary.date"
          disabled="true"
        />
        <van-field clearable="true" label="体重" placeholder="请输入体重" v-model="diary.weight"   />
        <van-field
          label="测量时间"
          @click="showTimePopup"
          placeholder="请选择时间"
          readonly="true"
          :value="diary.measure_time"
        />
        <van-field
          :clearable="true"
          label="备注"
          :click="showPopup"
          placeholder="说点什么吧..."
          type="textarea"
          :autosize="{minHeight: 60,maxHeight:240}"
          min
          v-model="diary.remark"
        />
      </van-cell-group>
    </van-row>
    <van-row v-for="food in diary.foods" :key="food.kfid">
      <AddFood :food="food" ></AddFood>
    </van-row>
    
    <van-popup v-model="showDate" :style="{ height: '50%',width:'80%' }">  
      <van-datetime-picker v-model="currentDate" type="date" :min-date="minDate" @confirm="selectDateComfirm" @cancel="selectDateCancel" />
    </van-popup>
    <van-popup v-model="showTime" :style="{ height: '50%',width:'80%' }">
      <van-datetime-picker v-model="currentTime" type="time"   @confirm="selecTimeComfirm" @cancel="selectTimeCancel" />
    </van-popup>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from "vue-property-decorator";
import { Row, Col, DatetimePicker, Popup, Field, Cell } from "vant";
import { HttpClient, NetworkCallback } from "../Util/HttpRequestUtil";
import UpdateDiaryModel, {
  UpdateDailyFoodModel
} from "../models/UpdateDiaryModel";
import DateTimeUtil from "../Util/DateTimeUtil"
import AddFood  from "../components/AddFood.vue"

Vue.use(Row);
Vue.use(Col);
Vue.use(Field);
Vue.use(Cell);
Vue.use(DatetimePicker);
Vue.use(Popup);

@Component({
  components:{AddFood}
})
export default class AddDiary extends Vue {
  private showDate: boolean = false;
  private showTime: boolean = false;
  private currentDate:Date;
  public currentTime:string;
  private diary!: UpdateDiaryModel;
  @Prop({ default: 0 }) kid: number=5;
  
  constructor() {
    super();
    this.LoadData();
    this.currentDate = new Date();
    this.currentTime = DateTimeUtil.GetNowTime(false);
  }
  
  selectDateComfirm():void
  {
      this.diary.date = DateTimeUtil.ConverDate(this.currentDate);
      this.showDate = false;
  }
  selectDateCancel():void
  {
    this.showDate = false;
  }
  selecTimeComfirm():void
  {
      this.diary.measure_time = this.currentTime;
      this.showTime = false; 
  }
  selectTimeCancel():void
  {
    this.showTime = false;
  }
  
  showDatePopup():void {
    this.showDate = true;
  }
  showTimePopup():void {
    this.showTime = true;
  }


  private LoadData() {
    this.diary = new UpdateDiaryModel(
      this.kid,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    );
    if (this.kid > 0) {
      this.GetData();
    }
  }
  GetData(): void {
    let client = new HttpClient("http://localhost:1111");
    let callback = new NetworkCallback(this.PushData);
    var url = `api/KeepFitDetail?id=${this.kid}`;
    client.Get(url, null, true, callback, true);
  }

  PushData(state: any, response: any) {
    let data = response.data;
    setTimeout(() => {
      if (data != null) {
        let day = `减肥第${data.num}天`;
        let foods: UpdateDailyFoodModel[] = [];
        if (data.foods != null) {
          for (let i = 0; i < data.foods.length; i++) {
            let e = data.foods[i];
            if (e != null) {
              foods.push(
                new UpdateDailyFoodModel(
                  e.id,
                  e.kfid,
                  e.title,
                  e.foods,
                  true,
                  e.eat_time,
                  e.imgs
                )
              );
            }
          }
        }
        this.diary = new UpdateDiaryModel(
          data.kid,
          data.weight,
          data.measure_time,
          data.remark,
          data.date,
          data.imgs,
          foods,
          day
        );
      }
    }, 500);
  }
}
</script>