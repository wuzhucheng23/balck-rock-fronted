<template>
  <div class="money-rule sub-page">
    <nav-bar :title="$t('押金规则')"></nav-bar>
    <div class="container">
      <!--      <div class="top-tip-box">-->
      <!--        <div class="text">{{ $t('已支付押金') }}：{{ money }} USDT</div>-->
      <!--        <van-button class="money-back" @click="handleMoneyBack" :disabled="isBuy === 2">-->
      <!--          <span v-if="isBuy === 1">{{ $t('退押金') }}</span>-->
      <!--          <span v-else>{{ $t('退还中') }}</span>-->
      <!--        </van-button>-->
      <!--      </div>-->
      <div class="rule-box">
        <div class="title">
          {{ $t('押金规则') }}：
        </div>
        <br>
        <div class="content" v-html="detail"></div>
      </div>
    </div>
    <van-dialog v-model="visible" :show-confirm-button="false">
      <div class="dialog-container">
        <div class="title">{{ $t('退押金') }}</div>
        <div class="money">USDT {{ money }}</div>
        <div class="text-wrap">
          <div class="text">{{ $t('支付方式：押金') }}</div>
          <div class="text">{{ $t('提取说明：提取到余额') }}</div>
        </div>
        <div class="btn-wrap">
          <van-button @click="handleCancel">{{ $t('取消') }}</van-button>
          <van-button @click="handleConfirm">{{ $t('确认') }}</van-button>
        </div>
      </div>
    </van-dialog>
    <result-dialog :visible.sync="showResult" :result="$t('申请退还成功')" :btn="true"></result-dialog>
  </div>
</template>

<script>
export default {
  name: "money-rule",
  data() {
    return {
      detail: '',
      money: '0.00',
      isBuy: 1,
      visible: false,
      showResult: false
    }
  },
  computed: {
    id() {
      return this.$route.query.id
    }
  },
  created() {
    this.depositCont()
    this.getSubItem()
  },
  methods: {
    async depositCont() {
      try {
        this.loading = true
        const resp = await this.$api.hall.depositCont();
        if (resp.code === 1) {
          const data = resp.data
          this.detail = data.detail
        } else {
          this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      } finally {
        this.loading = false
      }
    },
    async getSubItem() {
      try {
        this.loading = true
        const params = {
          cate: this.id
        }
        const resp = await this.$api.hall.getSubItem(params);
        if (resp.code === 1) {
          const data = resp.data
          this.money = data.recharge
          this.isBuy = data.isBuy
        } else {
          this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      } finally {
        this.loading = false
      }
    },
    handleMoneyBack() {
      this.visible = true
    },
    handleCancel() {
      this.visible = false
    },
    async handleConfirm() {
      try {
        const params = {cate: this.id}
        const resp = await this.$api.hall.unSubscribe(params);
        if (resp.code === 1) {
          this.visible = false
          this.showResult = true
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
  height: calc(100% - 50px);

  .top-tip-box {
    height: 40px;
    background-color: #ffd4c2;
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .text {
      font-family: PingFang-SC-Medium;
      font-size: 15px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #fc6324;
    }

    .money-back {
      //width: 68px;
      height: 24px;
      padding: 0 10px;
      line-height: 24px;
      background-color: #fc6324;
      border-color: #fc6324;
      border-radius: 12px;
      font-family: PingFang-SC-Medium;
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #ffffff;
    }
  }

  .rule-box {
    padding: 20px 15px;
    font-family: PingFang-SC-Medium;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 14px;
    letter-spacing: 0px;
    color: #999999;
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
