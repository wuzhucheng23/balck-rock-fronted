<template>
  <div class="robot-withdraw sub-page">
    <nav-bar :title="$t('转出')"/>
    <div class="container">
      <div class="money-box">
        <div class="title">{{ $t('从资产余额提现至我的余额') }}</div>
        <div class="content">
          <div class="text">{{ $t('提现到我的余额') }}</div>
          <div class="field">
            <van-field
                v-model="money"
                type="number"
                label="$"
                label-width="25px"
                :placeholder="$t('请输入提现金额')"
            />
          </div>
          <div class="my-money">
            <div>
              <span>{{ $t('您的资产余额') }}：</span>
              <span class="money">${{ balance }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="btn-box">
        <van-button
            block
            loading-type="spinner"
            :loading="buttonLoading"
            :loading-text="$t('正在提现...')"
            @click="handleWithdraw">
          <span>{{ $t('提现') }}</span>
        </van-button>
      </div>
      <div class="tip-box">
        <div class="title">{{ $t('说明') }}：</div>
        <div class="content">
          {{ $t('从资产余额提现至我的余额，提现需收取15 % 手续费。') }}
        </div>
      </div>
    </div>
    <result-dialog
        :visible.sync="showResult"
        :result="$t('转出成功')"
        :btn="false"
        :desc="$t('正在跳转页面...')"
    />
  </div>
</template>

<script>
export default {
  name: "RobotWithdraw",
  data() {
    return {
      money: '',
      balance: '0.00',
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
        const resp = await this.$api.robot.robotList();
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
    async handleWithdraw() {
      if (!this.money) return this.$toast(this.$t('请输入提现金额'))
      try {
        this.buttonLoading = true
        const params = {
          type: 2,
          num: +this.money
        }
        const resp = await this.$api.robot.transfer(params);
        if (resp.code === 1) {
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
      color: #fc6324;
    }

    .content {
      height: 123px;
      background-color: #ffffff;
      padding: 22px 15px 12px;

      .text {
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        line-height: 19px;
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
          line-height: 19px;
          color: #333333;
        }
      }

      .my-money {
        display: flex;
        justify-content: space-between;
        font-family: PingFang-SC-Medium;
        font-size: 12px;
        line-height: 19px;
        color: #999999;

        .money {
          font-family: PingFang-SC-Medium;
          font-size: 12px;
          line-height: 19px;
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
      line-height: 12px;
      color: #ffffff;
    }
  }

  .tip-box {
    padding: 0 15px;
    font-family: PingFang-SC-Medium;
    font-size: 12px;
    line-height: 14px;
    color: #333333;

    .title {
      margin-bottom: 12px;
    }
  }
}
</style>
