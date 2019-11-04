<template>
  <van-nav-bar title="Live" left-text="返回" left-arrow @click-right="onClickRight">
    <van-icon name="search" slot="right" v-show="showSearchIcon" />
    <van-search

      placeholder="请输入搜索关键词"
      slot="right"
      show-action
      @search="onSearch"
      @cancel="onCancel"
      v-show="showSearchItem"
    />
  </van-nav-bar>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import { NavBar } from "vant";
import "vant/lib/nav-bar/style";
import { Icon } from "vant";
import "vant/lib/icon/style";
import { Toast } from "vant";
import "vant/lib/toast/style";
import { Search } from "vant";
import "vant/lib/search/style";

Vue.use(NavBar);
Vue.use(Icon);
Vue.use(Toast);
Vue.use(Search);

@Component
export default class Header extends Vue {
  showSearchIcon = true;
  showSearchItem = false;

  onClickRight(): void {
    this.showSearchIcon = false;
    this.showSearchItem = true;
  }
  onCancel(): void {
    Toast("kk");
    this.showSearchIcon = true;
    this.showSearchItem = false;
  }
  onSearch(): void {
      this.showSearchIcon = true;
    this.showSearchItem = false;
  }
}
</script>