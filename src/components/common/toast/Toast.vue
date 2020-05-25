<template>
  <div class="toast" v-show="isShow">
    {{message}}
  </div>
</template>

<script>
  export default{
    name:'Toast',
    data() {
      return {
        message : '',
        isShow : false
      }
    },
    methods:{
      show(message,duration = 2000){
        console.log('-------------')

        this.message = message;
        this.isShow = true;

        setTimeout(() => {
          this.isShow = false;
          this.message = ''
        },duration)
      }
    }
  }
</script>

<style scoped="scoped">
  .toast{
    position: fixed;
    background-color: rgba(0,0,0,.8);
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 5px 10px;
    color: #fff;
    z-index: 999;
  }
</style>
