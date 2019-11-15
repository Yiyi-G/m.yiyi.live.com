<template>
      <div class="">
    <div class="head_div">
      <Header :home="true"></Header>
    </div>
    <div class="list_div">
      <List></List>
    </div>
    <div class="icondiv">
      <AddIcon color="#545c5f"></AddIcon>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "../components/Header.vue";
import List from "../components/List.vue";
import AddIcon from "../components/AddIcon.vue";

@Component( {
    components:{
        Header,
        List,
        AddIcon
    }
})
export default class KeepFitMain extends Vue {}
</script>
<style scoped>
 .head_div {
      width: 100%;
      height: 40px;
      z-index: 10000;
      position: fixed;
    }

    .icondiv {
      right: 10px;
      bottom: 10px;
      z-index: 10000;
      position: fixed;
    }

    .list_div {
      position:relative;
      width: 100%;
      top: 40px;
      overflow:scroll;
    }
</style>