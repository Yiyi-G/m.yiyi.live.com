<template>
<div>
  <van-nav-bar title="Live" left-text="返回" :left-arrow="!home">
    <van-icon name="wap-home-o" slot="left" v-if="home" size="20px"/>
    <van-icon name="search" slot="right" size="20px" v-show="showSearchIcon" @click="onClick"/>
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      slot="right"
      :show-action="true"
      v-show="showSearchItem"
      @search="onSearch"
      @cancel="onCancel"
    />
  </van-nav-bar>
</div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import { NavBar } from "vant";
import { Icon } from "vant";
import { Toast } from "vant";
import { Search } from "vant";

Vue.use(NavBar);
Vue.use(Icon);
Vue.use(Toast);
Vue.use(Search);

@Component
export default class Header extends Vue {
  @Prop({default:false}) home!:boolean 
  showSearchIcon = true;
  showSearchItem = false;

  onClick(): void {
    this.showSearchIcon = false;
    this.showSearchItem = true;
  }
  onCancel(): void {
    this.showSearchIcon = true;
    this.showSearchItem = false;
  }
  onSearch(): void {
  }
}
</script>