<template>
  <div class="robot-withdraw sub-page">
    <nav-bar :title="$t('转出')"></nav-bar>
    <div class="container">
      <div class="money-box">
        <div class="title">{{ $t('从机器人余额提现至我的余额') }}</div>
        <div class="content">
          <div class="text">{{ $t('提现到我的余额') }}</div>
          <div class="field">
            <van-field v-model="money" type="number" :placeholder="$t('请输入提现金额')" label="R$" label-width="25px"></van-field>
          </div>
          <div class="my-money">
            <div>{{ $t('您的机器人余额') }}：<span class="money">R${{ balance }}</span></div>
          </div>
        </div>
      </div>
      <div class="btn-box">
        <van-button block @click="handleWithdraw" :loading="buttonLoading"
                    loading-type="spinner" :loading-text="$t('正在提现...')">{{ $t('提现') }}</van-button>
      </div>
      <div class="tip-box">
        <div class="title">{{ $t('说明') }}：</div>
        <div class="content">{{ $t('从机器人余额提现至我的余额，提现需收取15 % 手续费。') }}</div>
      </div>
    </div>
    <result-dialog :visible.sync="showResult" :result="$t('转出成功')" :btn="false" :desc="$t('正在跳转页面...')"></result-dialog>
  </div>
</template>

<script>
export default {
  name: "robot-withdraw",
  data() {
    return {
      money: '',
      balance: '0.00',
      loading: false,
      buttonLoading: false,
      showResult: false
    }
  },
  created() {
    this.getRobotList()
  },
  methods: {
    async getRobotList() {
      try {
        this.loading = true
        const resp = await this.$api.robot.robotList();
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
    async handleWithdraw() {
      if (!this.money) return  this.$toast(this.$t('请输入提现金额'))
      try {
        this.buttonLoading = true
        const params = {
          type: 2,
          num: +this.money
        }
        const resp = await this.$api.robot.transfer(params);
        if (resp.code === 1) {
          // this.$toast.success(this.$t('转出成功'))
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
        display: flex;
        justify-content: space-between;
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