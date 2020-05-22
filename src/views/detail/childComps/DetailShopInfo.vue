<template>
  <div class="shop-info">
    <div class="info-top">
      <img :src="shopinfo.logo" />
      <div class="title">{{shopinfo.name}}</div>
    </div>
    <div class="info-middle">
      <div class="middle-left">
        <div class="info-sells">
          <div class="sells-count">
            {{shopinfo.sells | sellCountFilter}}
          </div>
          <div class="sells-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">
            {{shopinfo.goodsCount}}
          </div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>

      <div class="middle-right">
        <table>
          <tr v-for="(item, index) in shopinfo.score" :key="index">
            <td>{{item.name}}</td>
            <td class="score" :class="{'score-better': item.isBetter}">{{item.score}}</td>
            <td class="better" :class="{'better-more': item.isBetter}"><span>{{item.isBetter ? '高':'低'}}</span></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
  export default{
    name:'DetailShopInfo',
    props:{
      shopinfo:{
        type : Object
      }
    },
    filters: {
      sellCountFilter: function (value) {
        if (value < 10000) return value;
        return (value/10000).toFixed(1) + '万'
      }
    }
  }
</script>

<style scoped>
  .shop-info{
    padding: 25px 8px;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-top{
    display: flex;
    align-items: center;
  }

  .info-top img{
    width: 45px;
    height: 45px;
    border-radius: 50%;

  }
  .info-top .title{
    font-size: 14px;
  }

  .info-middle{
    margin-top: 15px;
    display: flex;
    align-items: center;
  }

  .middle-left{
    flex: 1;
    display: flex;
    text-align: center;
    border-right: 1px solid rgba(0,0,0,.1);
  }

  .middle-left .info-sells{
    flex: 1;
  }

  .middle-left .info-goods{
    flex: 1;
  }

  .sells-count, .goods-count {
      font-size: 18px;
  }
  .sells-text, .goods-text {
    margin-top: 5px;
    font-size: 12px;
  }

  .middle-right{
    flex: 1;
    font-size: 13px;
  }

  .middle-right table {
    width: 120px;
    margin: 0 auto;
  }

  .middle-right table td {
    padding: 5px 0;
  }
  .middle-right .score {
    color: #5ea732;
  }

  .middle-right .score-better {
    color: #f13e3a;
  }

  .middle-right .better span {
    background-color: #5ea732;
    color: #fff;
    text-align: center;
  }

  .middle-right .better-more span {
    background-color: #f13e3a;
  }

  .shop-bottom {
    margin-top: 10px;
  }

  .enter-shop {
    margin: 0 auto;
    font-size: 14px;
    background-color: #f2f5f8;
    width: 150px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 10px;
  }

</style>
