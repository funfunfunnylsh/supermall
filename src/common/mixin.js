import {POP, NEW, SELL} from "./constant";
import {debonce} from 'common/util'


export const imgLoadMixin = {
  data() {
    return {
      imgListener :null,
      refresh : null
    }
  },
  mounted() {
    this.refresh = debonce(this.$refs.scroll.refresh(),100)
    this.$bus.$on('imageLoaded',()=>{
      console.log('我是混入的内容')
    })

    this.imgListener = ()=>{
      console.log('我是混入的内容3')
      this.refresh()
    }

  },
  destroyed() {
    this.$bus.$off('imageLoaded',this.imgListener)
  }
}


export const backTopMixin = {
  data() {
    return {
      showBackTop: false
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 300);
    }
  }

}
