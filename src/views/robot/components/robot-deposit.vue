<template>
  <div class="robot-robot-deposit sub-page">
    <nav-bar :title="$t('转入')"></nav-bar>
    <div class="container">
      <div class="money-box">
        <div class="title">{{ $t('从我的余额转入机器人余额') }}</div>
        <div class="content">
          <div class="text">{{ $t('转入金额') }}</div>
          <div class="field">
            <van-field v-model="money" type="number" :placeholder="$t('请输入转入金额')" label="R$" label-width="25px"></van-field>
          </div>
          <div class="my-money">{{ $t('您的余额') }}：<span class="money">R${{ balance }}</span></div>
        </div>
      </div>
      <div class="btn-box">
        <van-button block @click="handleDeposit" :loading="buttonLoading"
                    loading-type="spinner" :loading-text="$t('正在转入...')">{{ $t('转入') }}</van-button>
      </div>
      <div class="tip-box">
        <div class="title">{{ $t('说明') }}：</div>
        <div class="content">{{ $t('从我的余额转入机器人余额，用于购买机器，机器人余额可提现至我的余额。') }}</div>
      </div>
    </div>
    <result-dialog :visible.sync="showResult" :result="$t('转入成功')" :btn="false" :desc="$t('正在跳转页面...')"></result-dialog>
  </div>
</template>

<script>
export default {
  name: "robot-deposit",
  data() {
    return {
      money: '',
      balance: '0.00',
      loading: false,
      showResult: false
    }
  },
  created() {
    this.profile()
  },
  methods: {
    async profile () {
      try {
        this.loading = true
        const resp = await this.$api.home.profile();
        if (resp.code === 1) {
          const data = resp.data
          this.balance = data.balance
        } else {
          this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      } finally {
        this.loading = false
      }
    },
    async handleDeposit() {
      if (!this.money) return  this.$toast(this.$t('请输入转入金额'))
      try {
        this.buttonLoading = true
        const params = {
          type: 1,
          num: +this.money
        }
        const resp = await this.$api.robot.transfer(params);
        if (resp.code === 1) {
          // this.$toast.success(this.$t('转入成功'))
          this.showResult = true
          this.$utils.delayBack()
        } else {
          this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      } finally {
        this.buttonLoading = false
      }
    }
  },
}
</script>

<style scoped lang="less">
.container {
  height: calc(100% - 50px);
  overflow: auto;

  .money-box {
    margin-bottom: 30px;

    .title {
      padding-left: 15px;
      line-height: 50px;
      font-family: PingFang-SC-Medium;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #fc6324;
    }

    .content {
      height: 123px;
      background-color: #ffffff;
      padding: 22px 15px 12px;

      .text {
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 19px;
        letter-spacing: 0px;
        color: #333333;
        margin-bottom: 12px;
      }

      .field {
        margin-bottom: 12px;

        .van-cell {
          padding: 0 0 5px;
          border-bottom: 1px solid #f6f6f6;
        }

        ::v-deep .van-field__label {
          font-family: PingFang-SC-Medium;
          font-size: 18px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 19px;
          letter-spacing: 0px;
          color: #333333;
        }
      }

      .my-money {
        font-family: PingFang-SC-Medium;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 19px;
        letter-spacing: 0px;
        color: #999999;

        .money {
          font-family: PingFang-SC-Medium;
          font-size: 12px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 19px;
          letter-spacing: 0px;
          color: #fc6324;
        }
      }
    }
  }

  .btn-box {
    padding: 0 15px;
    margin-bottom: 30px;

    .van-button {
      height: 48px;
      background-color: #fc6324;
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

  .tip-box {
    padding: 0 15px;
    font-family: PingFang-SC-Medium;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 14px;
    letter-spacing: 0px;
    color: #333333;

    .title {
      margin-bottom: 12px;
    }
  }
}
</style>