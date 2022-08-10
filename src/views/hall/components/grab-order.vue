<template>
  <div class="grab-order sub-page">
    <nav-bar :title="title">
<!--      <template #right>-->
<!--        <span class="money-rule" @click="handleToMoneyRule">{{ $t('押金规则') }}</span>-->
<!--      </template>-->
    </nav-bar>
    <div class="container">
      <div class="brand-info-box">
        <van-image :src="img"></van-image>
        <div class="right-wrap">
          <div class="title">{{ title }}</div>
<!--          <div class="price">-->
<!--            <span>${{ recharge }}</span>-->
<!--            <van-button @click="handleDepositMoney">{{ $t('前往缴纳押金') }}</van-button>-->
<!--          </div>-->
        </div>
      </div>
      <div class="info-box">
        <div class="info-item" v-for="item in infoList" :key="item.id">
          <div class="title">{{ item.title }}</div>
          <div class="value">
            <span v-if="item.id !== 1 && item.id !== 2">USDT </span>
            <span>{{ item.value }}</span>
          </div>
        </div>
      </div>
      <div class="btn-box">
        <van-button block @click="handleGrabOrder">{{ $t('领取任务') }}</van-button>
<!--        <van-button block @click="handleComplete">{{ $t('结算佣金') }}</van-button>-->
      </div>
<!--      <div class="instructions-box">-->
<!--        <div class="title">{{ $t('点赞说明') }}：</div>-->
<!--        <div class="content" v-html="content">-->
<!--        </div>-->
<!--      </div>-->
    </div>
    <van-dialog v-model="visible" :show-confirm-button="false">
      <div class="dialog-container">
        <div class="title">{{ $t('支付押金') }}</div>
        <div class="money">USDT {{ recharge }}</div>
        <div class="text-wrap">
          <div class="text">{{ $t('支付方式：余额') }}</div>
          <div class="text">{{ $t('押金说明：随时可提' )}}</div>
        </div>
        <div class="btn-wrap">
          <van-button @click="handleCancel">{{ $t('取消') }}</van-button>
          <van-button @click="handleConfirm">{{ $t('确认') }}</van-button>
        </div>
      </div>
    </van-dialog>
    <result-dialog :visible.sync="showResult" :result="$t('获取任务成功')" :btn="false" :desc="$t('正在跳转页面...')"></result-dialog>
    <result-dialog :visible.sync="showDepositResult" :result="$t('押金支付成功')" :btn="true"></result-dialog>
  </div>
</template>

<script>
export default {
  name: "grab-order",
  data() {
    const infoList = [
      {
        id: 1,
        title: this.$t('点赞任务数'),
        value: '0'
      },
      {
        id: 2,
        title: this.$t('剩余任务数'),
        value: '0'
      },
      {
        id: 3,
        title: this.$t('今日已赚佣金'),
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
      goods: {},
      visible: false,
      showDepositResult: false
    }
  },
  computed: {
    id() {
      return this.$route.query.id
    },
    title() {
      return this.$route.query.title || this.$t('获取任务')
    },
    img () {
      return this.$route.query.img
    },
    recharge () {
      return this.$route.query.recharge
    },
    open () {
      return this.$route.query.open
    }
  },
  created() {
    this.profile()
    // this.grabOrderRule()
    this.cateItem()
  },
  methods: {
    async cateItem () {
      try {
        this.loading = true
        const params = { cate: this.id }
        const resp = await this.$api.hall.cateItem(params);
        if (resp.code === 1) {
          const data = resp.data
          this.infoList[0].value = data.todayTask
          this.infoList[1].value = data.allTask - data.todayTask
        } else {
          this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      } finally {
        this.loading = false
      }
    },
    async profile () {
      try {
        this.loading = true
        const resp = await this.$api.home.profile();
        if (resp.code === 1) {
          const data = resp.data
          this.infoList[2].value = data.today_settled
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
    // async grabOrderRule () {
    //   try {
    //     this.loading = true
    //     const resp = await this.$api.hall.grabOrderRule();
    //     if (resp.code === 1) {
    //       const data = resp.data
    //       this.content = data.detail
    //     } else {
    //       this.$toast.fail(resp.msg || resp.message)
    //     }
    //   } catch (e) {
    //     this.$toast.fail(this.$t('发生错误'));
    //   } finally {
    //     this.loading = false
    //   }
    // },
    handleGrabOrder() {
      this.$toast.loading(this.$t('正在获取任务'))
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
            info: resp.data.info
          })
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
    handleToMoneyRule () {
      this.$router.push({
        name: 'moneyRule',
        label: '押金规则',
        query: {
          id: this.id
        }
      })
    },
    handleDepositMoney () {
      // this.visible = true
      this.$router.push({
        name: 'payDeposit',
        label: '缴纳押金'
      })
    },
    handleCancel() {
      this.visible = false
    },
    async handleConfirm() {
      try {
        const params = {cate: this.id}
        const resp = await this.$api.hall.subscribe(params);
        if (resp.code === 1) {
          this.visible = false
          this.showDepositResult = true
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
.money-rule {
  font-family: PingFang-SC-Medium;
  text-decoration: underline;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #666666;
}
.container {
  padding: 20px 15px;
  height: calc(100% - 50px);
  overflow: auto;
  .brand-info-box {
    display: flex;
    margin-bottom: 20px;
    padding: 0 20px;
    align-items: center;
    .van-image {
      width: 65px;
      height: 65px;
      margin-right: 20px;
    }
    .right-wrap {
      flex: 1;
      .price {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        .van-button {
          padding: 0 10px;
          height: 20px;
          line-height: 20px;
          border-radius: 5px;
          background: #fc6324;
          border-color: #fc6324;
          color: #ffffff;
          font-size: 12px;
        }
      }
    }
  }
  .info-box {
    height: 160px;
    background: url("../../../assets/hall/grab-order-bk.png") no-repeat center/cover;
    display: flex;
    padding: 25px 20px;
    justify-content: space-between;
    flex-wrap: wrap;
    align-content: space-between;
    margin-bottom: 30px;
    border-radius: 10px;
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

.dialog-container {
  width: 325px;
  height: 277px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 17px 20px;
  text-align: center;

  .title {
    font-family: PingFang-SC-Bold;
    font-family: PingFang-SC-Bold;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #333333;
    line-height: 18px;
    margin-bottom: 45px;
  }

  .money {
    font-family: PingFang-SC-Bold;
    font-size: 27px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ff6c1e;
    line-height: 27px;
    margin-bottom: 45px;
  }

  .text-wrap {
    font-family: PingFang-SC-Medium;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #666666;
    text-align: left;
    margin-bottom: 20px;
    line-height: 20px;
  }

  .btn-wrap {
    display: flex;
    justify-content: space-between;

    .van-button {
      width: 135px;
      height: 50px;
      background-color: #ff6c1e;
      border-color: #ff6c1e;
      border-radius: 10px;
      font-family: PingFang-SC-Bold;
      font-size: 18px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #ffffff;
    }
  }
}
</style>