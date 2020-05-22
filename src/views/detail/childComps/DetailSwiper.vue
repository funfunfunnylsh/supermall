<template>
  <swiper ref="swiper" class="detail-swiper">
    <swiper-item v-for="(item, index) in topimgs" :key="index" class='swiper-item'>
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "DetailSwiper",
    props: {
      topimgs: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      stopTimer() {
        this.$refs.swiper.stopTimer()
      },
      startTimer() {
        if (this.$refs.swiper) {
          this.$refs.swiper.startTimer()
        }
      }
    }
  }
</script>

<style scoped>
  .detail-swiper{
    height: 300px;
  }
  
</style>
