<template>
  <div ref='wrapper'>
    <div class="content">
       <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default{
    name:'Scroll',
    props:{
      data :{
        type : Array,
        default: () =>{
          return []
        }
      },
      probeType :{
        type : Number,
        default : 1
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return {
        scroll: {}
      }
    },
    mounted() {
      setTimeout(this.__initScroll(),20)
    },
    methods:{
      __initScroll(){
        // 1.初始化BScroll对象
        if (!this.$refs.wrapper) return
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: true,
          pullUpLoad: this.pullUpLoad
        })

        // 2.将监听事件回调
        this.scroll.on('scroll', pos => {
          this.$emit('scroll', pos)
        })

        // 3.监听上拉到底部
        this.scroll.on('pullingUp', () => {
          console.log('上拉加载');
          this.$emit('pullingUp')
        })
      },
      refresh(){
        this.scroll && this.scroll.refresh && this.scroll.refresh()
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      scrollTo(x, y, time) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      getScrollY(){
         this.scroll ? this.scroll.y : 0
      }
    },
    // watch: {
    //   data() {
    //     setTimeout(this.refresh, 20)
    //   }
    // }
  }

</script>

<style scoped>
</style>
