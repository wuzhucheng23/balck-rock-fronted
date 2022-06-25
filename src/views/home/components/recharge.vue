<template>
  <div class="recharge sub-page">
    <nav-bar :title="$t('充值')">
      <template #right>
        <span class="recode" @click="handleToRecode">{{ $t('充值记录') }}</span>
      </template>
    </nav-bar>
    <div class="container">
      <div class="recharge-money-box">
        <div class="title">{{ $t('雷亚尔') }}</div>
        <van-field v-model="money"
                   :placeholder="$t('请输入雷亚尔')"
                   label-width="60px"
                   @blur="handleBlur"
                   type="number">
          <template #extra>
            <span class="unit">≈{{ (+money / +exchangeRate).toFixed(6) || 0.000000 }} {{ unit }}</span>
          </template>
        </van-field>
        <div class="settlement-wrap">
          <span class="text">{{ $t('平台结算货币') }}:≈R$</span>
<!--          <span class="value">{{ (+money * +exchangeRate).toFixed(6) || 0.000000 }}</span>-->
          <span class="value">{{ money }}</span>
        </div>
<!--        <div class="select-wrap">-->
<!--          <div class="select-item"-->
<!--               v-for="item in moneySelectList"-->
<!--               :key="item"-->
<!--               :class="{'select-item-active': item === activeMoney}"-->
<!--               @click="handleChangeMoney(item)">-->
<!--            {{ item }}-->
<!--          </div>-->
<!--        </div>-->
      </div>
      <div class="select-type-box">
        <div class="title">{{ $t('选择充值币种') }}</div>
        <div class="content">
          <div class="content-item"
               v-for="item in typeList"
               :key="item.name"
               :class="{ 'select-item-active': activeType === item.name }"
               @click="handleChangeType(item)">
            <van-image :src="require('@/assets/home/btc-icon.png')" v-if="item.name === 'BTC'"></van-image>
            <van-image :src="require('@/assets/home/eth-icon.png')" v-else-if="item.name === 'ETH'"></van-image>
            <van-image :src="require('@/assets/home/usdt-icon.png')" v-else></van-image>
            <div class="type">{{ item.name }}</div>
          </div>
        </div>
      </div>
      <div class="recharge-instructions-box">
        <div class="title">{{ $t('充值说明') }}：</div>
        <div class="content">
          <div class="detail" v-html="instructions"></div>
        </div>
      </div>
    </div>
    <div class="btn">
      <van-button block @click="handleToConfirm">{{ $t('立即充值') }}</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "recharge",
  data() {
    return {
      money: '',
      moneySelectList: [10, 100, 1000, 5000, 10000, 100000],
      activeMoney: '',
      activeType: 'USDT',
      exchangeRate: 1,
      typeList: [],
      loading: false,
      instructions: '',
    }
  },
  computed: {
    address() {
      return this.typeList.find(item => item.name === this.activeType).address
    },
    unit() {
      return this.activeType.indexOf('USDT') !== -1 ? 'U' : this.activeType
    }
  },
  created() {
    this.recharge()
    this.getTopupAdds()
  },
  methods: {
    handleChangeMoney(money) {
      this.money = money
      this.activeMoney = money
    },
    handleChangeType(item) {
      this.money = ''
      this.activeType = item.name
      this.exchangeRate = item.exchange_rate
    },
    handleToRecode () {
      this.$router.push({
        name: 'recode',
        label: '记录',
        query: {
          title: this.$t('充值记录')
        }
      })
    },
    async recharge () {
      try {
        this.loading = true
        const resp = await this.$api.home.recharge();
        if (resp.code === 1) {
          const data = resp.data
          this.instructions = data.detail
        } else {
          this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      } finally {
        this.loading = false
      }
    },
    async getTopupAdds() {
      try {
        this.loading = true
        const res = await this.$api.home.getTopupAdds()
        if (res.code === 1) {
          const data = res.data
          this.typeList = data
          this.activeType = data[0].name
          this.exchangeRate = data[0].exchange_rate
        } else {
          this.$toast.fail(res.msg || res.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      } finally {
        this.loading = false
      }
    },
    handleToConfirm () {
      if (!this.money) return this.$toast(this.$t('请输入货币数量'))

      // if ((+this.money * +this.exchangeRate).toFixed(6) < 20) return this.$toast(this.$t('存款金额不能低于20'))
      this.$router.push({
        name: 'rechargeConfirm',
        label: '充值确定',
        query: {
          type: this.activeType,
          money: this.money,
          address: this.address,
          account: (+this.money / +this.exchangeRate).toFixed(6) || 0.000000
        }
      })
    },
    handleBlur () {
      this.activeMoney = this.money
    }
  },
}
</script>

<style scoped lang="less">
.nav-bar .recode {
  font-family: PingFang-SC-Medium;
  text-decoration: underline;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 19px;
  letter-spacing: 0px;
  color: #666666;
}
.container {
  padding-top: 5px;
  height: calc(100% - 126px);
  overflow: auto;
  .recharge-money-box {
    padding: 22px 15px 10px;
    background: #ffffff;
    margin-bottom: 5px;
    .title {
      font-family: PingFang-SC-Medium;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 14px;
      letter-spacing: 0px;
      color: #333333;
      margin-bottom: 10px;
    }

    .van-cell {
      border-radius: 0px;
      padding: 0;
      line-height: 31px;
      font-size: 31px;
      color: #333333;
      margin-bottom: 12px;
    }

    ::v-deep .van-cell::after {
      left: 0;
      right: 0;
      color: #f6f6f6;
    }

    ::v-deep .van-field__body input{
      padding-bottom: 8px;
      border-bottom: unset;
    }

    ::v-deep .van-field__body input::placeholder {
      font-size: 18px;
    }

    .unit {
      font-family: PingFang-SC-Medium;
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 45px;
      letter-spacing: 0px;
      color: #999999;
    }

    .settlement-wrap {
      //margin-bottom: 19px;
      .text {
        font-family: PingFang-SC-Medium;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 12px;
        letter-spacing: 0px;
        color: #999999;
        margin-right: 6px;
      }
      .value {
        font-family: PingFang-SC-Medium;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 12px;
        letter-spacing: 0px;
        color: #f57e0a;
      }
    }
    //.select-wrap {
    //  display: flex;
    //  flex-wrap: wrap;
    //  justify-content: space-between;
    //  .select-item {
    //    width: calc((100vw - 48px) / 3);
    //    height: 40px;
    //    background-color: #f8f8f8;
    //    border-radius: 5px;
    //    margin-bottom: 10px;
    //    font-family: PingFang-SC-Medium;
    //    font-size: 14px;
    //    font-weight: normal;
    //    font-stretch: normal;
    //    line-height: 40px;
    //    letter-spacing: 0px;
    //    color: #999999;
    //    text-align: center;
    //    border: solid 1px #ffffff;
    //  }
    //  .select-item-active {
    //    border: solid 1px #fc6324;
    //  }
    //}
  }
  .select-type-box {
    background: #ffffff;
    padding: 13px 15px 15px;
    .title {
      font-family: PingFang-SC-Bold;
      font-size: 18px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 18px;
      letter-spacing: 0px;
      color: #333333;
      margin-bottom: 21px;
    }
    .content {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .content-item {
        width: calc((100% - 18px) / 3);
        height: 95px;
        background-color: #f8f8f8;
        border-radius: 5px;
        border: solid 2px #ffffff;
        text-align: center;
        padding-top: 10px;
        margin-bottom: 10px;
        .van-image {
          width: 40px;
          height: 40px;
          margin-bottom: 6px;
        }
        .type {
          font-family: PingFang-SC-Medium;
          font-size: 14px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 14px;
          letter-spacing: 0px;
          color: #333333;
          margin-bottom: 2px;
        }
        .desc {
          font-family: PingFang-SC-Medium;
          font-size: 9px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 9px;
          letter-spacing: 0px;
          color: #999999;
          transform: scale(0.8);
        }
      }
      .select-item-active {
        border: solid 2px #fc6324;
        background-color: #ffefe9;
        position: relative;

        &::after {
          content: '';
          display: block;
          position: absolute;
          left: -1px;
          top: -1px;
          width: 23px;
          height: 23px;
          background: url("../../../assets/home/select-icon.png") no-repeat top center/100% 100%;
        }
      }
    }
  }
  .recharge-instructions-box {
    padding: 34px 15px 21px;
    .title {
      font-family: PingFang-SC-Medium;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 14px;
      letter-spacing: 0px;
      color: #333333;
      margin-bottom: 12px;
    }
    .content {
      font-family: PingFang-SC-Medium;
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 17px;
      letter-spacing: 0px;
      color: #999999;
      text-align: justify;
    }
  }
}
.btn {
  padding: 12px 15px 20px;
  height: 76px;
  background-color: #ffffff;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  .van-button {
    height: 44px;
    background-color: #fc6324;
    border-radius: 10px;
    font-family: PingFang-SC-Medium;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
  }
}
</style>