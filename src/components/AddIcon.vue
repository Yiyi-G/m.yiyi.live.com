<template>
    <van-icon name="add" :click="Onlick" size="80" :color="color" />
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import {Icon} from "vant"

Vue.use(Icon)

@Component
export default class AddIcon extends Vue
{
    @Prop({default:"red"}) color!:string ;
    Onlick():void{
    }
}

</script>