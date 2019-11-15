<template>
  <div class="content">
    <img src="../assets/head.jpeg"/>
    <h3>404 Not Found</h3>
    <h4>{{message}}</h4>
  </div>
</template>

<script>
  export default{
      data(){
          return {
            message:'您访问的内容大概去火星了o(╯□╰)o'
          }
      }
  }
</script>

<style scoped lang="scss">

  .content{
    margin-top: 60px;
  }
  body{
    background-color: tomato;
  }

  .content img{
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
</style>
