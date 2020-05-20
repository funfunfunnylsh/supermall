<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control v-show="isTabFixed" class="tab-cont" @itemClick="tabClick"
                 :titles="['流行', '新款', '精选']" ref="tabControl2"></tab-control>
   <scroll class="content"
     ref="scroll"
     @scroll="contentScroll"
     @pullingUp="loadMore"
     :data="showGoodsList"
     :pull-up-load="true"
     :probe-type="3">
     <home-swiper :banners="banners" ref="hSwiper"></home-swiper>
     <recommend-view :recommends="recommends" />
     <feature-view />
     <tab-control @itemClick="tabClick"
                  :titles="['流行', '新款', '精选']"
                  ref="tabControl"></tab-control>
     <goods-list :goods-list="showGoodsList"/>
   </scroll>
   <back-top v-show="showBackTop" @backTop="backTop" class="back-top">
     <img src="~assets/img/common/top.png" alt="">
   </back-top>
  </div>
</template>

<script>
  import {getHomeMultidata , getProductData, RECOMMEND, BANNER} from 'network/home';
  import {NEW,POP,SELL,BACKTOP_DISTANCE} from "common/constant";
  import {debonce} from 'common/util'

  import Scroll from 'components/common/scroll/Scroll'
  import NavBar from 'components/common/navbar/NavBar'
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'
  import TabControl from 'components/content/tabcontrol/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import BackTop from 'components/content/backtop/BackTop'

  export default {
    name: "Home",
    components: {
      NavBar,
      Scroll,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goodsList: {
          'pop': {
            page: 1,
            list: []
          },
          'new': {
            page: 1,
            list: []
          },
          'sell': {
            page: 1,
            list: []
          }
        },
        currentType: POP,
        isTabFixed: false,
        tabOffsetTop: 0,
        showBackTop: false
      }
    },
    computed: {
      showGoodsList() {
        return this.goodsList[this.currentType].list
      }
    },
    created() {
      // 1.请求多个数据
      this.getMultiData()

      // 2.请求商品数据
      this.getHomeProducts(POP)
      this.getHomeProducts(NEW)
      this.getHomeProducts(SELL)
    },
    mounted() {
      const refresh = debonce(this.$refs.scroll.refresh(),100)

      this.$bus.$on('imageLoaded',()=>{
        refresh()
      })
    },
     activated: function () {
       this.$refs.hSwiper.startTimer()
     },
     deactivated: function () {
       this.$refs.hSwiper.stopTimer()
     },
     updated() {
       this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
       // console.log(this.tabOffsetTop);
     },
    methods: {
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = POP
            break
          case 1:
            this.currentType = NEW
            break
          case 2:
            this.currentType = SELL
            break
        }
        this.$refs.tabControl.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      contentScroll(position) {
        // 1.决定tabFixed是否显示
        this.isTabFixed = position.y < -this.tabOffsetTop
        // 2.决定backTop是否显示
        this.showBackTop = -position.y > 1000
      },
      loadMore() {
        this.getHomeProducts(this.currentType)
      },
      backTop() {
        this.$refs.scroll.scrollTo(0, 0, 300)
      },
      getMultiData() {
        getHomeMultidata().then(res => {
          this.banners = res.data[BANNER].list
          this.recommends = res.data[RECOMMEND].list
        })
      },
      getHomeProducts(type) {
        getProductData(type, this.goodsList[type].page).then(res => {
          const goodsList = res.data.list;
          this.goodsList[type].list.push(...goodsList)
          this.goodsList[type].page += 1

          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    height: 100vh;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .home-nav {
    color: #fff;
    background-color: #FF8198;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
  }

  .tab-cont {
   position: fixed;
   top: 44px;
   left: 0;
   right: 0;
  }

  .back-top {
    position: fixed;
    right: 10px;
    bottom: 60px;
  }
</style>
