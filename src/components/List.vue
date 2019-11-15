<template>
  <van-list
    v-model="loading"
    :error="error"
    :finished="finished"
    loading-text="火速加载中..."
    finished-text="没有更多啦！"
    error-text="出错啦~"
    @load="OnLoadData()"
  >
    <template>
      <van-panel>
        <div v-for="item in list" :key="item.kid">
          <van-cell-group>
            <van-cell :title="item.date" :value="item.day" />
            <van-cell title="体重" :value="item.measure_time">
              <template slot="title">
                体重:
                <span style="color:rgba(13, 109, 208, 0.39)">{{item.weight}}</span>
              </template>
            </van-cell>
            <van-cell
              v-for="food in item.foods"
              :key="food.kfid"
              :title="food.title"
              :value="food.foods"
              label
            />
            <van-cell title :label="item.remark" v-if="item.remark!=''" />
          </van-cell-group>
          <van-image
            v-for="imgitem in item.imgs"
            :key="imgitem"
            width="100"
            height="100"
            :src="imgitem"
            alt="图片"
          />
          <van-divider />
        </div>
      </van-panel>
    </template>
  </van-list>
</template>
<script lang='ts'>
import { Component, Prop, Vue, ProvideReactive } from "vue-property-decorator";
import { List, Cell, Divider, Image, Panel, CellGroup } from "vant";
import {HttpClient,NetworkCallback} from "../Util/HttpRequestUtil";

Vue.use(List);
Vue.use(Cell);
Vue.use(Divider);
Vue.use(Image);
Vue.use(Panel);
Vue.use(CellGroup);

@Component
export default class DiaryList extends Vue {
  loading = false;
  finished = false;
  error = false;
  start =0;
  limit = 10;
  @Prop() list: DiaryItem[] = [];

  OnLoadData(): void {
    this.GetData();
  }
  GetData(): void {
    let jsonData = {
      playerId: "10",
      playerName: "10",
      passWord: "10"
    }; 
    let client = new HttpClient("http://localhost:5000");

    let callback = new NetworkCallback(this.PushData);
    var url = `api/KeepFit?start=${this.start}&limit=${this.limit}`;
    client.Get(url, null, true, callback, true);
  }

  PushData(state: any, response: any) {
    let data = response.data;
    setTimeout(() => {
      for (let i = 0; i < data.length; i++) {
        let day = `减肥第${ data[i].num}天`;
        this.list.push(
          new DiaryItem(
            data[i].kid,
            data[i].weight,
            `测量时间：${data[i].measure_time}`,
            `${data[i].remark}`,
            `${data[i].date}`,
            data[i].imgs as string[],
            [new DailyFoodListItem(1, 1, "早餐", "鸡蛋，粥", true, "8:00", [])],
           day
          )
        );
      }
      this.start+=data.length;
      // 加载状态结束
      this.loading = false;
      this.error = false;
      // 数据全部加载完成
      if (data.length==0) {
        this.finished = true;
      }
      // if (this.list.length==3) {
      //   this.finished = true;
      // }
    }, 500);
  }

    PushStaticData() {
    setTimeout(() => {
      for (let i = 0; i < 10; i++) {
        let day = `减肥第${41 - this.list.length}天`;
        this.list.push(
          new DiaryItem(
            this.list.length + 1,
            106.5,
            "测量时间：23:00",
            "加油",
            "2019-11-5",
            [
              "https://img.yzcdn.cn/vant/cat.jpeg",
              "https://img.yzcdn.cn/vant/cat.jpeg",
              "https://img.yzcdn.cn/vant/cat.jpeg",
              "https://img.yzcdn.cn/vant/cat.jpeg"
            ],
            [new DailyFoodListItem(1, 1, "早餐", "鸡蛋，粥", true, "8:00", [])],
            day
          )
        );
      }
      // 加载状态结束
      this.loading = false;
      this.error = false;
      // 数据全部加载完成
      if (this.list.length >= 40) {
        this.finished = true;
      }
    }, 500);
  }
  
}

class DailyFoodListItem {
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
class DiaryItem {
  kid: number;
  weight: number;
  measure_time: string;
  remark: string;
  date: string;
  imgs: string[];
  foods: DailyFoodListItem[];
  day: string;

  private readonly _ImgUrlHead ="http://localhost:5000/api/Image?fid=";

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
    this.foods = foods;
    this.imgs = [];
    this.day = day;
    if (imgs != null && imgs != undefined) {
      imgs.forEach(element => {
        this.imgs.push(`${this._ImgUrlHead+ element}`);
      });
    }
    this.foods = [];
    if (foods != null && foods != null) {
      foods.forEach(e => {
        this.foods.push(
          new DailyFoodListItem(
            e.id,
            e.kfid,
            e.title,
            e.foods,
            e.is_main,
            e.eat_time,
            e.imgs
          )
        );
        if (e.imgs != null && e.imgs != undefined) {
          e.imgs.forEach(element => {
            this.imgs.push(`${this._ImgUrlHead+ element}`);
          });
        }
      });
    }
  }
}
</script>
