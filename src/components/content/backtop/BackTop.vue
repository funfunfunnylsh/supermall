<template>
  <div class="back-top" @click="backTop">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name:'BackTop',
    methods:{
      backTop: function (){
        this.$emit('backTop')
      }
    }
  }
</script>

<style scoped>
  .back-top img {
    width: 43px;
    height: 43px;
  }
</style>
