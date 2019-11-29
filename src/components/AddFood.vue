<template>
  <div>
    <van-switch-cell v-model="food.is_main" title="是否主食" />
    <van-field :clearable="true" label="标题" placeholder="早餐" v-model="food.titile" />
    <van-field
      :clearable="true"
      label="食物"
      :click="showPopup"
      placeholder="吃了啥涅..."
      type="textarea"
      :autosize="{minHeight: 60,maxHeight:240}"
      v-model="food.foods"
    />
    <van-cell-group>
      <van-cell v-for="fid in food.fids" :key="fid">
        <van-image :src="_ImgUrlHead+fid">
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
      </van-cell>
      <van-cell>
        <van-icon name="add-o" size="80px" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Row, Field, SwitchCell, Col } from "vant";
import { UpdateDailyFoodModel } from "../models/UpdateDiaryModel";

Vue.use(Row)
  .use(Field)
  .use(SwitchCell)
  .use(Col);

@Component
export default class AddFood extends Vue {
  private readonly _ImgUrlHead ="http://localhost:1111/api/Image?fid=";
  @Prop({ default: null }) food: UpdateDailyFoodModel | null = null;
  constructor() {
    super();
    if (this.food == null) {
      this.food = new UpdateDailyFoodModel();
      this.food
    }
  }
}
</script>