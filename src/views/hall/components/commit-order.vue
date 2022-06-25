<template>
  <div class="commit-order sub-page">
    <div class="container">
      <nav-bar :title="$t('提交订单')" background-color="transparent">
        <template #right>
          <van-image :src="require('@/assets/mine/refresh-icon.png')" @click="handleRefresh"></van-image>
        </template>
      </nav-bar>
      <div class="address-box" @click="handleToAddress">
        <van-image :src="require('@/assets/hall/address-icon.png')" class="address-icon"></van-image>
        <div class="text-wrap">
          <div>
            <span class="tel-text">{{ address.tel }}</span>
            <span>{{ address.name }}</span>
          </div>
          <div>{{ address.address }}</div>
        </div>
        <van-image :src="require('@/assets/hall/right-arrow-icon.png')" class="arrow-icon"></van-image>
      </div>
      <div class="top-info-box">
        <div class="title">
          {{ $t('订单号') }}:{{ id }}
        </div>
        <div class="content">
          <div class="img-wrap">
            <van-image :src="goodsPic"></van-image>
          </div>
          <div class="right-wrap">
            <div class="name">
              {{ goodsName }}
            </div>
            <div class="price">R$ {{ goodsPrice }}</div>
          </div>
        </div>
      </div>
      <div class="bottom-info-box">
        <van-cell-group>
          <van-cell
              v-for="item in cellList"
              :key="item.id"
              :title="item.title"
              :class="{'main-color': item.id === 1 || item.id === 8}"
              :value="item.value"/>
        </van-cell-group>
        <van-slider
            v-model="value"
            bar-height="6px"
            inactive-color="#eeeeee"
            active-color="#ff6c1e"
            disabled
            button-size="0"
            :max="max"/>
      </div>
      <div class="btn-box">
        <van-button block @click="handleCommit">{{ $t('提交订单') }}</van-button>
      </div>
      <div class="complete-box">
        <div class="img-wrap">
          <van-image :src="require('@/assets/hall/complete-icon.png')"></van-image>
        </div>
        <div class="text-wrap">
          <span>{{ $t('当您完成') }}</span>
          <span> {{ max }} </span>
          <span>{{ $t('个订单后，点击“结算佣金”按钮，系统会将您今天的利润添加到您的余额中。') }}</span>
        </div>
        <div class="btn-wrap">
          <van-button block @click="handleComplete">{{ $t('结算佣金') }}</van-button>
        </div>
      </div>
    </div>
    <van-dialog v-model="visible" :show-confirm-button="false">
      <div class="dialog-container">
        <div class="title">{{ $t('确认订单') }}</div>
        <div class="text">{{ $t('我已确认订单信息正确') }}</div>
        <div class="btn-wrap">
          <van-button @click="handleCancel">{{ $t('取消') }}</van-button>
          <van-button @click="handleConfirm">{{ $t('确认') }}</van-button>
        </div>
      </div>
    </van-dialog>
    <result-dialog :visible.sync="showResult" :result="$t('提交成功')" :btn="false" :desc="$t('正在跳转页面...')"></result-dialog>
  </div>
</template>

<script>
export default {
  name: "commit-order",
  data() {
    const cellList = [
      {
        id: 1,
        title: this.$t('类别'),
        value: ''
      },
      {
        id: 2,
        title: this.$t('日利润'),
        value: '0%'
      },
      {
        id: 3,
        title: this.$t('余额'),
        value: '$ 0.00'
      },
      {
        id: 4,
        title: this.$t('计算'),
        value: '$ 0'
      },
      {
        id: 5,
        title: this.$t('一次获利'),
        value: '$ 0.00'
      },
      {
        id: 6,
        title: this.$t('今天未确定的利润'),
        value: '$ 0'
      },
      {
        id: 7,
        title: this.$t('今日设定利润'),
        value: '$ 0'
      },
      {
        id: 8,
        title: this.$t('完成进度条'),
        value: '0/0'
      },
    ]
    return {
      cellList,
      value: 0,
      max: 50,
      loading: false,
      id: '',
      goodsPic: '',
      goodsName: '',
      goodsPrice: '0.00',
      visible: false,
      address: {},
      showResult: false
    }
  },
  computed: {
    cate () {
      return this.$route.query.id
    }
  },
  created() {
    this.init()
  },
  methods: {
    init () {
      this.address = this.$route.query.address
      const data = this.$route.query.info
      this.id = data.id
      this.goodsPic =  'http://47.242.37.172' + data.goods_pic
      this.goodsName = data.goods_name
      this.goodsPrice = data.goods_price
      this.cellList[0].value = data.cate
      this.cellList[1].value = data.rate + '%'
      this.cellList[2].value = 'R$ ' + data.balance
      this.cellList[3].value = data.count
      this.cellList[4].value = 'R$ ' + data.profit
      this.cellList[5].value = 'R$ ' + data.today_unsettled
      this.cellList[6].value = 'R$ ' + data.today_unsettled
      this.cellList[7].value = data.deal_count + '/' + data.total_task
      this.value = data.deal_count
      this.max = data.total_task
    },
    // async grabOrder () {
    //   try {
    //     this.loading = true
    //     const params = { cate: this.cate }
    //     const resp = await this.$api.hall.grabOrder(params);
    //     if (resp.code === 1) {
    //       this.address = resp.data.address
    //       const data = resp.data.info
    //       this.id = data.id
    //       this.goodsPic =  'http://47.242.37.172' + data.goods_pic
    //       this.goodsName = data.goods_name
    //       this.goodsPrice = data.goods_price
    //       this.cellList[0].value = data.cate
    //       this.cellList[1].value = data.rate + '%'
    //       this.cellList[2].value = '$ ' + data.balance
    //       this.cellList[3].value = data.count
    //       this.cellList[4].value = '$ ' + data.profit
    //       this.cellList[5].value = '$ ' + data.today_unsettled
    //       this.cellList[6].value = '$ ' + data.today_unsettled
    //       this.cellList[7].value = data.deal_count + '/' + data.total_task
    //       this.value = data.deal_count
    //       this.max = data.total_task
    //     } else {
    //       this.$toast.fail(resp.msg || resp.message)
    //     }
    //   } catch (e) {
    //     this.$toast.fail(this.$t('发生错误'));
    //   } finally {
    //     this.loading = false
    //   }
    // },
    handleRefresh () {
      this.address = {}
      this.id = ''
      this.goodsPic = ''
      this.goodsName = ''
      this.goodsPrice = '0.00'
      this.cellList[0].value = ''
      this.cellList[1].value = '0' + '%'
      this.cellList[2].value = '$ ' + '0.00'
      this.cellList[3].value = 0
      this.cellList[4].value = '$ ' + 0
      this.cellList[5].value = '$ ' + '0.00'
      this.cellList[6].value = '$ ' + '0.00'
      this.cellList[7].value = 0 + '/' + 0
      this.value = 0
      this.max = 0
      setTimeout(() => {
        this.init();
      }, 500)
    },
    handleCommit () {
      this.visible = true
    },
    handleCancel () {
      this.visible = false
    },
    async handleConfirm () {
      try {
        const params = { goods_id: this.id }
        const resp = await this.$api.hall.buyProduct(params);
        if (resp.code === 1) {
          this.visible = false
          this.showResult = true
          // this.$toast.success(this.$t('提交成功'))
          this.$utils.delayBack()
        } else {
          this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
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
    handleToAddress () {
      this.$router.push({
        name: 'shippingAddress',
        label: '收货地址'
      })
    }
  },
}
</script>

<style scoped lang="less">
.commit-order {
  overflow: auto;
  height: 100vh;
}
.nav-bar  {
  margin-left: -10px;
  margin-right: -10px;
  position: relative;
  top: -11px;
  .van-image {
    width: 20px;
    height: 17px;
  }
}
.container {
  background: url("../../../assets/hall/commit-order-bk.png") no-repeat left top/100% 282px;
  padding: 11px 10px 20px;
  .address-box {
    height: 80px;
    background-color: #ffffff;
    border-radius: 5px;
    display: flex;
    padding: 19px 12px;
    position: relative;
    margin-bottom: 33px;
    .address-icon {
      width: 43px;
      height: 43px;
      margin-right: 15px;
    }
    .text-wrap {
      .tel-text {
        margin-right: 6px;
      }
      div:first-child {
        font-family: PingFang-SC-Medium;
        font-size: 12px;
        line-height: 12px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #333333;
        margin-bottom: 8px;
        margin-top: 6px;
      }
      div:last-child {
        font-family: PingFang-SC-Medium;
        font-size: 12px;
        line-height: 12px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #999999;
      }
    }
    .arrow-icon {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
      width: 6px;
      height: 10px;
    }
  }
  .top-info-box {
    height: 147px;
    background-color: #ffffff;
    margin-bottom: 7px;
    position: relative;
    padding: 15px 15px 20px;
    &::before {
      content: '';
      width: 100%;
      height: 13px;
      background: url("../../../assets/hall/box-desc.png");
      position: absolute;
      top: -13px;
      left: 0;
      right: 0;
    }
    .title {
      font-family: PingFang-SC-Medium;
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #333333;
      line-height: 12px;
      margin-bottom: 16px;
    }
    .content {
      display: flex;
      height: 86px;
      background-color: #f5f5f5;
      border-radius: 5px;
      .img-wrap {
        background-color: #ffffff;
        padding: 3px 11px 4px 9px;
        width: 86px;
        height: 86px;
        .van-image {
          width: 67px;
          height: 80px;
        }
      }
      .right-wrap {
        flex: 1;
        padding: 16px 17px 18px 21px;
        .name {
          font-family: PingFang-SC-Medium;
          font-size: 12px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 18px;
          letter-spacing: 0px;
          color: #333333;
          margin-bottom: 11px;
          overflow: hidden;
          text-overflow: ellipsis;
          line-break: anywhere;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          height: 36px;
        }
        .price {
          font-family: PingFang-SC-Bold;
          font-size: 12px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 12px;
          letter-spacing: 0px;
          color: #e98d00;
        }
      }
    }
  }
  .bottom-info-box {
    height: 371px;
    background: #ffffff;
    margin-bottom: 43px;
    position: relative;
    &::after {
      content: '';
      width: 100%;
      height: 13px;
      background: url("../../../assets/hall/box-desc.png");
      position: absolute;
      bottom: -13px;
      left: 0;
      right: 0;
      transform: rotateX(180deg);
    }
  }
  ::v-deep .van-cell__title {
    flex: unset;
    font-family: PingFang-SC-Medium;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #333333;
  }
  ::v-deep .van-cell__value {
    font-family: PingFang-SC-Medium;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #333333;
  }
  ::v-deep .main-color .van-cell__value {
    color: #e98d00;
  }
  ::v-deep .van-hairline--top-bottom::after {
    border-width: 0;
  }
  .van-slider {
    width: calc(100% - 30px);
    margin: 0 auto;
  }
  .btn-box {
    margin-bottom: 24px;
    .van-button {
      height: 50px;
      background-color: #ff6c1e;
      border-color: #ff6c1e;
      border-radius: 10px;
      font-family: PingFang-SC-Medium;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #ffffff;

    }
  }
  .complete-box {
    height: 255px;
    background-color: #ffffff;
    border-radius: 5px;
    padding-top: 32px;
    .img-wrap {
      text-align: center;
      margin-bottom: 24px;
      .van-image {
        width: 70px;
        height: 60px;
      }
    }
    .text-wrap {
      font-family: PingFang-SC-Medium;
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 18px;
      letter-spacing: 0px;
      color: #333333;
      width: 280px;
      height: 36px;
      text-align: center;
      margin: 0 auto 39px;
    }
    .btn-wrap {
      .van-button {
        width: 215px;
        height: 45px;
        background-color: #ff6c1e;
        border-color: #ff6c1e;
        border-radius: 23px;
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
        margin: 0 auto;
      }
    }
  }
}
.dialog-container {
  width: 325px;
  height: 277px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 54px 20px 17px;
  text-align: center;
  .title {
    font-family: PingFang-SC-Bold;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #333333;
    line-height: 18px;
    margin-bottom: 52px;
  }
  .text {
    height: 14px;
    font-family: PingFang-SC-Medium;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 18px;
    letter-spacing: 0px;
    color: #333333;
    margin-bottom: 72px;
  }
  .btn-wrap {
    display: flex;
    justify-content: space-between;
    .van-button {
      width: 135px;
      height: 50px;
      background-color: #ff6c1e;
      border-color: ;
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