<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" @itemClick="titleClick" :current-index="currentIndex"></detail-nav-bar>
    <scroll class="content"
            ref="scroll"
            @scroll="contentScroll"
            :probe-type="3">
      <detail-swiper :topimgs='topImages' ref="dSwiper"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shopinfo="shop"></detail-shop-info>
      <detail-goods-info :goodsinfo="detailInfo" @imageLoaded="imageLoaded"></detail-goods-info>
      <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <detail-recommend-info ref="recommend" :recommend-list="recommendList" @imageLoaded="imageLoaded"></detail-recommend-info>

    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top v-show="showBackTop" @backTop="backTop" class="back-top">
      <img src="~assets/img/common/top.png" alt="">
    </back-top>
  </div>
</template>

<script>
  import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "network/detail";
  import {imgLoadMixin,backTopMixin} from 'common/mixin'
  import { mapActions } from 'vuex'

  import Scroll from 'components/common/scroll/Scroll'
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailRecommendInfo from './childComps/DetailRecommendInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import BackTop from 'components/content/backtop/BackTop'

  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      Scroll,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailRecommendInfo,
      DetailBottomBar,
      BackTop
    },
    data() {
      return {
        iid: '',
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommendList: [],
        themeTops: [],
        currentIndex: 0
      }
    },
    created() {
      this._getDetailData()
      this._getRecommend()
    },
    mixins:[imgLoadMixin,backTopMixin],
    updated() {
      // 获取需要的四个offsetTop
      this._getOffsetTops()
    },

    methods: {
      ...mapActions(['addCart']),
      _getDetailData() {
        // 1.获取iid
        const iid = this.$route.params.iid
        this.iid = iid

        // 2.请求数据
        getDetail(iid).then(res => {
          // 2.1.获取结果
          const data = res.result;

          // 2.2.获取顶部信息
          this.topImages = data.itemInfo.topImages;

          // 2.3.获取商品信息
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

          // 2.4.获取店铺信息
          this.shop = new Shop(data.shopInfo);

          // 2.5.获取商品信息
          this.detailInfo = data.detailInfo

          // 2.6.保存参数信息
          this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

          // 2.7.保存评论信息
          if (data.rate.list) {
            this.commentInfo = data.rate.list[0];
          }
        })
      },
      _getRecommend() {
        getRecommend().then((res, error) => {
          if (error) return
          this.recommendList = res.data.list
        })
      },
      contentScroll(position) {
        //决定backTop是否显示
        this.showBackTop = -position.y > 1000
        // 监听滚动到哪一个主题,切换tabbar
        this._listenScrollTheme(-position.y)
      },
      addToCart() {
        // 1.创建对象
        const obj = {}
        // 2.对象信息
        obj.iid = this.iid;
        obj.imgURL = this.topImages[0]
        obj.title = this.goods.title
        obj.desc = this.goods.desc;
        obj.newPrice = this.goods.nowPrice;
        // 3.添加到Store中
        // this.$store.dispatch('addCart', obj).then(res=>{
        //   console.log(res)
        // })
        //使用mapActions添加到Store中
        this.addCart(obj).then(res=>{
          console.log(res)
          this.$toast.show(res,2000)
        })

      },
      imageLoaded(){
        this.refresh()
      },
      titleClick(index){
        this.$refs.scroll.scrollTo(0,-this.themeTops[index],100)
      },
      _getOffsetTops() {
        this.themeTops = []
        this.themeTops.push(0)
        this.themeTops.push(this.$refs.param.$el.offsetTop)
        this.themeTops.push(this.$refs.comment.$el.offsetTop)
        this.themeTops.push(this.$refs.recommend.$el.offsetTop)
        this.themeTops.push(Number.MAX_VALUE)
      },
      _listenScrollTheme(positionY){
        let length = this.themeTops.length;
        for (let i = 0; i < length; i++) {
          let iPos = this.themeTops[i];
          if (positionY >= iPos && positionY < this.themeTops[i+1]) {
            if (this.currentIndex !== i) {
              this.currentIndex = i;
            }
            break;
          }
        }
      }
    },
    activated() {
      this.$refs.dSwiper.startTimer()
    },
    deactivated() {
      this.$refs.dSwiper.stopTimer()
    }

  }
</script>

<style scoped>
  #detail {
    height: 100vh;
    position: relative;
    z-index: 1;
    background-color: #fff;
  }
  .detail-nav-bar{
    position: relative;
    z-index: 1;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 60px;
  }

  .back-top {
    position: fixed;
    right: 10px;
    bottom: 65px;
  }
</style>
