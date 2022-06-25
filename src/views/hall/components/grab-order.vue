<template>
  <div class="grab-order sub-page">
    <nav-bar :title="title"></nav-bar>
    <div class="container">
      <div class="info-box">
        <div class="info-item" v-for="item in infoList" :key="item.id">
          <div class="title">{{ item.title }}</div>
          <div class="value">
            <span v-if="item.id !== 1 && item.id !== 2">BRL</span>
            <span>{{ item.value }}</span>
          </div>
        </div>
      </div>
      <div class="btn-box">
        <van-button block @click="handleGrabOrder" v-if="infoList[0].value < infoList[1].value">{{ $t('立即抢单') }}</van-button>
        <van-button block @click="handleComplete" v-else>{{ $t('结算佣金') }}</van-button>
      </div>
      <div class="instructions-box">
        <div class="title">{{ $t('抢单说明') }}</div>
        <div class="content" v-html="content">
        </div>
      </div>
    </div>
    <result-dialog :visible.sync="showResult" :result="$t('抢单成功')" :btn="false" :desc="$t('正在跳转页面...')"></result-dialog>
  </div>
</template>

<script>
export default {
  name: "grab-order",
  data() {
    const infoList = [
      {
        id: 1,
        title: this.$t('今日抢单数'),
        value: '0'
      },
      {
        id: 2,
        title: this.$t('今日任务次数'),
        value: '0'
      },
      {
        id: 3,
        title: this.$t('今日已抢佣金'),
        value: '0.00'
      },
      {
        id: 4,
        title: this.$t('账户余额'),
        value: '0.00'
      }
    ]
    return {
      infoList,
      content: '',
      showResult: false,
      loading: false,
      goods: {}
    }
  },
  computed: {
    id() {
      return this.$route.query.id
    },
    title() {
      return this.$route.query.title || this.$t('抢单')
    }
  },
  created() {
    this.profile()
    this.grabOrderRule()
  },
  methods: {
    async profile () {
      try {
        this.loading = true
        const resp = await this.$api.home.profile();
        if (resp.code === 1) {
          const data = resp.data
          this.infoList[0].value = data.deal_count
          this.infoList[1].value = data.task
          this.infoList[2].value = data.today_unsettled
          this.infoList[3].value = data.balance
        } else {
          this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      } finally {
        this.loading = false
      }
    },
    async grabOrderRule () {
      try {
        this.loading = true
        const resp = await this.$api.hall.grabOrderRule();
        if (resp.code === 1) {
          const data = resp.data
          this.content = data.detail
        } else {
          this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      } finally {
        this.loading = false
      }
    },
    handleGrabOrder() {
      this.$toast.loading(this.$t('正在抢单'))
      setTimeout(() => {
        // this.showResult = true
        // this.$utils.delayPush('commitOrder', '提交订单', {
        //   id: this.id
        // })
        this.grabOrder()
      }, 2000)
    },
    async grabOrder () {
      try {
        this.loading = true
        const params = { cate: this.id }
        const resp = await this.$api.hall.grabOrder(params);
        if (resp.code === 1) {
          this.showResult = true
          this.$utils.delayPush('commitOrder', '提交订单', {
            address: resp.data.address,
            info: resp.data.info
          })
          // this.address = resp.data.address
          // const data = resp.data.info
          // this.id = data.id
          // this.goodsPic =  'http://47.242.37.172' + data.goods_pic
          // this.goodsName = data.goods_name
          // this.goodsPrice = data.goods_price
          // this.cellList[0].value = data.cate
          // this.cellList[1].value = data.rate + '%'
          // this.cellList[2].value = '$ ' + data.balance
          // this.cellList[3].value = data.count
          // this.cellList[4].value = '$ ' + data.profit
          // this.cellList[5].value = '$ ' + data.today_unsettled
          // this.cellList[6].value = '$ ' + data.today_unsettled
          // this.cellList[7].value = data.deal_count + '/' + data.total_task
          // this.value = data.deal_count
          // this.max = data.total_task
        } else {
          this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      } finally {
        this.loading = false
      }
    },
    async handleComplete () {
      try {
        const params = { goods_id: this.id }
        const resp = await this.$api.hall.settlement(params);
        if (resp.code === 1) {
          this.$toast.success(this.$t('结算成功'))
        } else {
          this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      }
    },
  },
}
</script>

<style scoped lang="less">
.container {
  padding: 20px 15px;
  height: calc(100% - 50px);
  overflow: auto;
  .info-box {
    height: 160px;
    background: url("../../../assets/hall/grab-order-bk.png") no-repeat center/cover;
    display: flex;
    padding: 25px 20px;
    justify-content: space-between;
    flex-wrap: wrap;
    align-content: space-between;
    margin-bottom: 30px;
    .info-item {
      text-align: center;
      min-width: 90px;
      width: calc((100% - 10px) / 2);
      .title {
        height: 12px;
        font-family: PingFang-SC-Medium;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 12px;
        letter-spacing: 0px;
        color: #ffffff;
        margin-bottom: 16px;
      }
      .value {
        font-family: PingFang-SC-Bold;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 16px;
        letter-spacing: 0px;
        color: #ffffff;
      }
    }
  }
  .btn-box {
    margin-bottom: 25px;
    .van-button {
      height: 48px;
      background-color: #fc6324;
      border-color: #fc6324;
      border-radius: 10px;
      font-family: PingFang-SC-Medium;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 12px;
      letter-spacing: 0px;
      color: #ffffff;
    }
  }
  .instructions-box {
    height: 185px;
    font-family: PingFang-SC-Medium;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 14px;
    letter-spacing: 0px;
    color: #999999;
    .title {
      margin-bottom: 15px;
    }
  }
}
</style>