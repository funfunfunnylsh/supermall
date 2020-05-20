<template>
  <div class="recommend">
    <div class="recommend-item" v-for="item in recommends">
      <a :href="item.link">
        <img :src="item.image" alt=""/>
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props:{
      recommends:{
        type : Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style>
  .recommend{
    display: flex;
    text-align: center;
    font-size: 12px;
    width: 100%;
    padding: 10px 0px 20px 0;
    border-bottom: 10px solid #eee;
  }

  .recommend-item{
    flex: 1;
  }

  .recommend-item img{
    flex: 1;
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
  }


</style>
