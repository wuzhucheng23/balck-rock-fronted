<template>
  <div class="robot-buy sub-page">
    <nav-bar :title="$t('方案买入')"/>
    <div class="container">
      <div class="info-box">
        <div class="title">{{ $t('买入') }}</div>
        <div class="content">
          <div class="top-wrap">
            <div class="left">
              <div class="top-text">{{ $t('最低买入') }}</div>
              <div class="bottom-text">${{ robotInfo.min_num }}</div>
            </div>
            <div class="right">
              <div class="top-text">{{ $t('最高买入') }}</div>
              <div class="bottom-text">${{ robotInfo.max_num }}</div>
            </div>
          </div>
          <div class="field-wrap">
            <div class="text">{{ $t('买入金额') }}</div>
            <van-field
                v-model="money"
                type="number"
                label="$"
                label-width="25px"
                :placeholder="$t('请输入购买金额')"
            />
          </div>
          <div class="money-wrap">
            <div class="left">
              <span>{{ $t('您的资产余额') }}：</span>
              <span class="money">${{ balance }}</span>
            </div>
            <div class="right">
              <span>{{ $t('手续费') }}：</span>
              <span class="money">
                ${{ (money * robotInfo.shouxu).toFixed(2) }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="btn-box">
        <van-button
            block
            loading-type="spinner"
            :loading="buttonLoading"
            :loading-text="$t('正在购买...')"
            @click="handleBuy">
          <span>{{ $t('购买') }}</span>
        </van-button>
      </div>
      <div class="tip-box">
        <div class="title">{{ $t('购买说明') }}：</div>
        <div class="content" v-html="detail">
        </div>
      </div>
    </div>
    <result-dialog
        :visible.sync="showResult"
        :result="$t('购买成功')"
        :btn="false"
        :desc="$t('正在跳转页面...')"
    />
  </div>
</template>

<script>
export default {
  name: "RobotBuy",
  data() {
    return {
      money: '',
      balance: '0.00',
      robotInfo: {
        shouxu: 0
      },
      detail: '',
      buttonLoading: false,
      showResult: false
    }
  },
  computed: {
    id() {
      return this.$route.query.id
    }
  },
  created() {
    this.getRobotDesc()
    this.getRobotList()
  },
  methods: {
    async getRobotDesc() {
      try {
        const resp = await this.$api.robot.getRobotDesc();
        if (resp.code === 1) {
          const data = resp.data
          this.detail = data.detail
        } else {
          this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      }
    },
    async getRobotList() {
      try {
        const resp = await this.$api.robot.robotList();
        if (resp.code === 1) {
          const data = resp.data
          this.balance = data.balance
          this.robotInfo = data.list.find(item => item.id == this.id)
        } else {
          this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      }
    },
    async handleBuy() {
      if (!this.money) return this.$toast(this.$t('请输入购买金额'))
      try {
        this.buttonLoading = true
        const params = {
          robot_id: +this.id,
          num: +this.money
        }
        const resp = await this.$api.robot.addRobot(params);
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
  background: #f6d79b;
  padding: 15px;

  .info-box {
    .title {
      font-family: PingFang-SC-Bold;
      font-size: 20px;
      color: #333333;
      line-height: 20px;
      margin-top: 15px;
      margin-bottom: 25px;
      text-align: center;
    }

    .content {
      height: 203px;
      background-color: #ffffff;
      border-radius: 10px;
      margin-bottom: 20px;
      padding: 15px 20px;

      .top-wrap {
        height: 65px;
        background-color: #f6f6f6;
        border-radius: 10px;
        padding: 13px 36px;
        display: flex;
        justify-content: space-between;
        text-align: center;
        margin-bottom: 20px;

        .top-text {
          font-family: PingFang-SC-Medium;
          font-size: 12px;
          line-height: 12px;
          color: #666666;
          margin-bottom: 13px;
        }

        .bottom-text {
          font-family: PingFang-SC-Bold;
          font-size: 16px;
          line-height: 12px;
          color: #333333;
        }
      }

      .field-wrap {
        margin-bottom: 10px;

        .text {
          font-family: PingFang-SC-Medium;
          font-size: 14px;
          line-height: 14px;
          color: #333333;
          margin-bottom: 12px;
        }

        .van-cell {
          padding: 0 0 5px;
          border-bottom: 1px solid #f6f6f6;
        }

        ::v-deep .van-field__label {
          font-family: PingFang-SC-Medium;
          font-size: 18px;
          line-height: 19px;
          letter-spacing: 0px;
          color: #333333;
        }
      }

      .money-wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left, .right {
          font-family: PingFang-SC-Medium;
          font-size: 12px;
          line-height: 12px;
          color: #999999;

          .money {
            font-family: PingFang-SC-Medium;
            font-size: 12px;
            line-height: 12px;
            color: #fc6324;
          }
        }

        .right {
          .van-button {
            width: 59px;
            height: 20px;
            background-color: #f0d3a2;
            border-radius: 10px;
            font-family: PingFang-SC-Medium;
            font-size: 11px;
            color: #333333;
            border-color: #f0d3a2;
          }
        }
      }
    }
  }

  .btn-box {
    margin-bottom: 20px;

    .van-button {
      height: 48px;
      background-color: #fc6324;
      border-radius: 10px;
      font-family: PingFang-SC-Medium;
      font-size: 14px;
      line-height: 12px;
      color: #ffffff;
      border-color: #fc6324;
    }
  }

  .tip-box {
    font-family: PingFang-SC-Medium;
    font-size: 12px;
    line-height: 16px;
    color: #333333;

    .title {
      margin-bottom: 12px;
    }
  }
}
</style>
