<template>
  <div class="account-withdraw sub-page">
    <nav-bar :title="$t('提现')">
      <template #right>
        <span class="recode" @click="handleToRecode">{{ $t('提现记录') }}</span>
      </template>
    </nav-bar>
    <div class="container">
      <div class="withdraw-money-box">
        <div class="title">{{ $t('提现金额') }}</div>
        <van-field
            v-model="money"
            label-width="60px"
            type="number"
            :placeholder="$t('请输入提现金额')">
          <template #extra>
            <span class="unit">
              ≈{{ (+money / +exchangeRate).toFixed(6) || 0.000000 }} {{ unit }}
            </span>
          </template>
        </van-field>
        <div class="settlement-wrap">
          <span class="text">{{ $t('您的余额') }}：</span>
          <span class="value">${{ balance }}</span>
        </div>
      </div>
      <div class="select-type-box">
        <div class="title">{{ $t('选择提现币种') }}</div>
        <div class="content">
          <div
              class="content-item"
              v-for="item in typeList"
              :key="item.name"
              :class="{ 'select-item-active': activeType === item.name }"
              @click="handleChangeType(item)">
            <van-image :src="require('@/assets/home/btc-icon.png')" v-if="item.name === 'BTC'"/>
            <van-image :src="require('@/assets/home/eth-icon.png')" v-else-if="item.name === 'ETH'"/>
            <van-image :src="require('@/assets/home/usdt-icon.png')" v-else/>
            <div class="type">{{ item.name }}</div>
          </div>
        </div>
      </div>
      <div class="btn-box">
        <van-button
            block
            class="withdraw-btn"
            @click="handleShowPassword('wallet')">
          <span>{{ $t('提现') }}</span>
        </van-button>
      </div>
      <div class="withdraw-instructions-box">
        <div class="title">{{ $t('提现说明') }}：</div>
        <div class="content" v-html="instructions"></div>
      </div>
    </div>
    <van-dialog
        v-model="visible"
        width="295px"
        close-on-click-overlay
        :show-confirm-button="false">
      <div class="dialog-container">
        <div class="title">{{ $t('取款密码') }}</div>
        <div class="field-box">
          <van-field v-model="pwd" type="password" :placeholder="$t('请输入取款密码')"/>
        </div>
        <div class="btn-box">
          <van-button
              block
              loading-type="spinner"
              :loading="buttonLoading"
              :loading-text="$t('正在提现...')"
              @click="handleWithdraw">
            <span>{{ $t('确定') }}</span>
          </van-button>
        </div>
      </div>
    </van-dialog>
    <result-dialog
        :visible.sync="showResult"
        :result="$t('提现成功')"
        :btn="true"
    />
  </div>
</template>

<script>
export default {
  name: "AccountWithdraw",
  data() {
    return {
      money: '',
      activeType: 'USDT',
      typeList: [],
      balance: '0.00',
      exchangeRate: 1,
      withdrawType: 'wallet',
      visible: false,
      pwd: '',
      cardId: 1,
      buttonLoading: false,
      instructions: '',
      showResult: false
    }
  },
  computed: {
    unit() {
      return this.activeType.indexOf('USDT') !== -1 ? 'U' : this.activeType
    }
  },
  created() {
    this.withDraw();
    this.profile()
    this.getTopupAdds()
  },
  methods: {
    async withDraw() {
      try {
        const resp = await this.$api.mine.withDraw();
        if (resp.code === 1) {
          const data = resp.data
          this.instructions = data.detail
        } else {
          this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      }
    },
    async profile() {
      try {
        const resp = await this.$api.home.profile();
        if (resp.code === 1) {
          const data = resp.data
          this.balance = data.balance
        } else {
          this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      }
    },
    async getTopupAdds() {
      try {
        const res = await this.$api.mine.getTopupAdds()
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
      }
    },
    handleChangeType(item) {
      this.money = ''
      this.activeType = item.name
      this.exchangeRate = item.exchange_rate
    },
    handleToRecode() {
      this.$router.push({
        name: 'AccountRecode',
        label: '记录',
        query: {
          title: this.$t('提现记录')
        }
      })
    },
    handleShowPassword(type) {
      this.withdrawType = type
      this.visible = true
    },
    async handleWithdraw() {
      if (!this.cardId) return this.$toast(this.$t('请先绑定钱包'))
      if (!this.money) return this.$toast(this.$t('请输入提现金额'))
      if (!this.pwd) return this.$toast(this.$t('请输入支付密码'))
      if (this.activeType === 'USDT-Trc20') this.cardId = 1
      if (this.activeType === 'USDT-Erc20') this.cardId = 2
      if (this.activeType === 'ETH') this.cardId = 3
      if (this.activeType === 'BTC') this.cardId = 4
      if (this.withdrawType === 'card') this.cardId = 5
      const params = {
        id: +this.cardId,
        type: this.cardId,
        amount: +this.money,
        pwd: this.pwd
      }
      try {
        this.buttonLoading = true
        const res = await this.$api.mine.withdrawal(params)
        if (res.code === 1) {
          this.visible = false
          this.showResult = true
        } else {
          this.$toast.fail(res.msg || res.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'))
      } finally {
        this.buttonLoading = false
      }
    }
  },
}
</script>

<style scoped lang="less">
.nav-bar .recode {
  font-family: PingFang-SC-Medium;
  text-decoration: underline;
  font-size: 14px;
  line-height: 19px;
  color: #666666;
}

.container {
  padding-top: 5px;
  height: calc(100% - 50px);
  overflow: auto;

  .withdraw-money-box {
    padding: 22px 15px 10px;
    background: #ffffff;
    margin-bottom: 5px;

    .title {
      font-family: PingFang-SC-Medium;
      font-size: 14px;
      line-height: 14px;
      color: #333333;
      margin-bottom: 10px;
    }

    .van-cell {
      border-radius: 0;
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

    ::v-deep .van-field__body input {
      padding-bottom: 8px;
      border-bottom: unset;
    }

    ::v-deep .van-field__body input::placeholder {
      font-size: 18px;
    }

    .unit {
      font-family: PingFang-SC-Medium;
      font-size: 12px;
      line-height: 45px;
      color: #999999;
    }

    .settlement-wrap {
      font-family: PingFang-SC-Medium;
      font-size: 12px;
      line-height: 12px;
      color: #999999;
    }
  }

  .select-type-box {
    background: #ffffff;
    padding: 13px 6px 6px 15px;

    .title {
      font-family: PingFang-SC-Bold;
      font-size: 18px;
      line-height: 18px;
      color: #333333;
      margin-bottom: 21px;
    }

    .content {
      display: flex;
      flex-wrap: wrap;

      .content-item {
        width: calc((100% - 27px) / 3);
        height: 95px;
        background-color: #f8f8f8;
        border-radius: 5px;
        border: solid 2px #ffffff;
        text-align: center;
        padding-top: 10px;
        margin-bottom: 10px;
        margin-right: 9px;

        .van-image {
          width: 40px;
          height: 40px;
          margin-bottom: 6px;
        }

        .type {
          font-family: PingFang-SC-Medium;
          font-size: 14px;
          line-height: 14px;
          color: #333333;
          margin-bottom: 2px;
        }

        .desc {
          font-family: PingFang-SC-Medium;
          font-size: 9px;
          line-height: 9px;
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

    .tip {
      font-family: PingFang-SC-Medium;
      font-size: 12px;
      line-height: 12px;
      color: #999999;
      text-align: justify;
    }
  }

  .btn-box {
    padding: 20px 15px 0;

    .withdraw-to-card-btn {
      height: 46px;
      background-color: #ffffff;
      border-radius: 10px;
      border: solid 1px #fc6324;
      line-height: 46px;
      font-family: PingFang-SC-Medium;
      font-size: 14px;
      color: #fc6324;
      margin-bottom: 15px;
    }

    .withdraw-btn {
      height: 50px;
      background-color: #fc6324;
      border-radius: 10px;
      font-family: PingFang-SC-Medium;
      font-size: 18px;
      line-height: 50px;
      color: #ffffff;
    }
  }

  .withdraw-instructions-box {
    padding: 22px 15px 77px;

    .title {
      font-family: PingFang-SC-Medium;
      font-size: 14px;
      line-height: 14px;
      color: #333333;
      margin-bottom: 12px;
    }

    .content {
      font-family: PingFang-SC-Medium;
      font-size: 12px;
      line-height: 17px;
      color: #999999;
    }
  }
}

.van-dialog {
  border-radius: 10px;
}

.dialog-container {
  height: 200px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 15px;
  position: relative;

  .title {
    font-family: PingFang-SC-Bold;
    font-size: 16px;
    line-height: 16px;
    color: #333333;
    text-align: center;
    margin-bottom: 25px;
  }

  .close-icon {
    position: absolute;
    right: 15px;
    top: 15px;
    width: 13px;
    height: 13px;
  }

  .field-box {
    padding: 5px 0 10px;

    .title {
      font-family: PingFang-SC-Medium;
      font-size: 14px;
      color: #333333;
      line-height: 14px;
      margin-bottom: 10px;
      text-align: left;
    }

    .van-cell {
      height: 48px;
      background-color: #f5f5f5;
      border-radius: 10px;
    }

    .van-field {
      margin-bottom: 10px;
    }

    .forget-text {
      text-align: right;
      margin-bottom: 9px;

      span {
        font-family: PingFang-SC-Medium;
        text-decoration: underline;
        font-size: 12px;
        color: #999999;
      }
    }
  }

  .btn-box {
    .van-button {
      height: 44px;
      background-color: #fc6324;
      border-radius: 22px;
      font-family: PingFang-SC-Medium;
      font-size: 14px;
      line-height: 12px;
      color: #ffffff;
    }
  }
}
</style>
