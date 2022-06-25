<template>
  <div class="order-recode sub-page">
    <nav-bar :title="$t('订单记录')">
      <template #right>
        <van-image :src="require('@/assets/mine/refresh-icon.png')" @click="handleRefresh"></van-image>
      </template>
    </nav-bar>
    <div class="container">
      <van-loading type="spinner" size="24px" v-if="loading"
                   style="padding: 15px 0;text-align: center">
        {{ $t('加载中...') }}
      </van-loading>
      <van-empty :description="$t('空空如也')" v-if="isEmpty"/>
      <div class="order-box" v-else>
        <div class="order-item" v-for="item in orderList" :key="item.id">
          <div class="left-wrap">
<!--            <van-image :src="require('@/assets/hall/order-icon.png')"></van-image>-->
            <van-image :src="item.goods_pic"></van-image>
            <div class="right-wrap">
              <div class="time">{{ item.goods_name }}</div>
              <div class="name">{{ item.addtime }}</div>
            </div>
          </div>
          <div class="right-wrap">
            <div class="right-wrap">
              <div class="status">{{ item.status }}</div>
              <div class="money">R${{ item.goods_price }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "order-recode",
  data() {
    return {
      orderList: []
    }
  },
  computed: {
    isEmpty() {
      return this.orderList.length === 0 && !this.loading
    }
  },
  created() {
    this.getOrderList()
  },
  methods: {
    handleRefresh() {
      this.getOrderList()
    },
    async getOrderList() {
      try {
        this.loading = true
        const resp = await this.$api.mine.orderList();
        if (resp.code === 1) {
          const data = resp.data
          this.orderList = data
        } else {
          this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped lang="less">
.nav-bar  {
  .van-image {
    width: 20px;
    height: 17px;
  }
}
.container {
  height: calc(100% - 50px);
  overflow: hidden;
  padding: 15px 10px;
  .order-box {
    .order-item {
      padding: 10px 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 63px;
      background-color: #ffffff;
      margin-bottom: 10px;
      .left-wrap {
        display: flex;
        align-items: center;
        .van-image {
          width: 43px;
          height: 43px;
          margin-right: 15px;
        }
        .right-wrap {
          text-align: left;
          .time {
            font-family: PingFang-SC-Medium;
            font-size: 12px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #999999;
            line-height: 12px;
            margin-bottom: 7px;
          }
          .name {
            font-family: PingFang-SC-Medium;
            font-size: 12px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #333333;
            line-height: 12px;
          }
        }
      }
      .right-wrap {
        text-align: right;
        .status {
          font-size: 12px;
          color: #999999;
          margin-bottom: 7px;
        }
        .money {
          font-family: PingFang-SC-Medium;
          font-size: 12px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #f98b65;
          line-height: 12px;
        }
      }
    }
  }
}
</style>