<template>
  <div>
    <van-row>
      <van-col span="8">体重：</van-col>
      <van-col span="8">
        <van-field v-model="value" />
      </van-col>
      <van-col span="8">测量时间：</van-col>
      <van-col span="8">
        <van-cell is-link @click="showPopup">展示弹出层</van-cell>
      </van-col>
    </van-row>
    <van-popup :v-model="show">
      <van-datetime-picker v-model="value" type="time" :min-hour="1" :max-hour="24" />
    </van-popup>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import { Row, Col, DatetimePicker, Popup,Field ,Cell} from "vant";

Vue.use(Row)
  .use(Col)
  .use(Field)
  .use(Cell)
  .use(DatetimePicker)
  .use(Popup);
  
@Component
export default class AddDiary extends Vue {
  private show: boolean = false;
  showPopup() {
    this.show = true;
  }
}
</script>