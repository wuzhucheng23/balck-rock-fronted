<template>
  <div class="withdraw-deposit sub-page">
    <nav-bar :title="$t('提取押金')"/>
    <div class="container">
      <div class="pay-box">
        <div class="pay-item"
             v-for="item in cateList"
             :key="item.id">
          <van-image :src="item.cate_pic"/>
          <div class="right-box">
            <div class="left-wrap">
              <div class="deposit-text">
                {{ $t('押金') }}：
                <span>{{ item.recharge }}U</span>
              </div>
              <div class="earn-text">
                {{ $t('任务单价') }}：
                <span>{{ item.bili }}U</span>
              </div>
              <div class="number-text">
                {{ $t('任务次数') }}：
                <span>{{ item.factor }}</span>
              </div>
            </div>
            <div class="right-wrap">
              <van-button
                  @click="handlePay(item)"
                  :disabled="item.r_status !== 1">
                <span v-if="item.r_status === 0">{{ $t('未缴纳') }}</span>
                <span v-else-if="item.r_status === 1">{{ $t('提取') }}</span>
                <span v-else>
                  <van-count-down
                      :time="(item.handle_time - item.now_time) * 1000"
                      @finish="getShowContent"
                  />
                </span>
              </van-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-dialog v-model="visible" :show-confirm-button="false">
      <div class="dialog-container">
        <div class="title">{{ $t('提取押金') }}</div>
        <div class="money">USDT {{ recharge }}</div>
        <div class="text-wrap">
          <div class="text">{{ $t('支付方式：押金') }}</div>
          <div class="text">{{ $t('退款说明：提取到余额') }}</div>
        </div>
        <div class="btn-wrap">
          <van-button @click="visible = false">{{ $t('取消') }}</van-button>
          <van-button
              loading-type="spinner"
              :loading="btnLoading"
              :loading-text="$t('')"
              @click="handleConfirm">
            <span>{{ $t('确认') }}</span>
          </van-button>
        </div>
      </div>
    </van-dialog>
    <result-dialog
        :visible.sync="showDepositResult"
        :result="$t('提取押金成功')"
        :btn="true"
    />
  </div>
</template>

<script>
export default {
  name: "WithdrawDeposit",
  data() {
    return {
      cateList: [],
      recharge: 0,
      id: '',
      visible: false,
      showDepositResult: false,
      btnLoading: false
    }
  },
  created() {
    this.getShowContent()
  },
  methods: {
    async getShowContent() {
      try {
        const resp = await this.$api.home.getShowContent();
        if (resp.code === 1) {
          const data = resp.data
          this.cateList = data.cate.filter(item => item.id !== 13)
        } else {
          this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      }
    },
    handlePay(item) {
      this.id = item.id
      this.recharge = item.recharge
      this.visible = true
    },
    async handleConfirm() {
      const params = {cate: this.id}
      try {
        this.btnLoading = true
        const resp = await this.$api.hall.unSubscribe(params);
        if (resp.code === 1) {
          this.visible = false
          this.showDepositResult = true
          this.getShowContent()
        } else {
          this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      } finally {
        this.btnLoading = false
      }
    },
  },
}
</script>

<style scoped lang="less">
.container {
  height: calc(100% - 50px);
  overflow: auto;
  padding: 15px;

  .pay-box {
    .pay-item {
      height: 100px;
      background-color: #ffffff;
      border-radius: 20px;
      padding: 8px;
      display: flex;
      margin-bottom: 10px;

      .van-image {
        width: 84px;
        height: 84px;
        margin-right: 15px;
        border-radius: 10px;
        overflow: hidden;
      }

      .right-box {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 10px;

        .left-wrap {
          div {
            font-family: PingFang-SC-Bold;
            font-size: 14px;
            line-height: 14px;
            color: #666666;
            margin: 12px 0;

            span {
              color: #f0ae16;
            }
          }
        }

        .right-wrap {
          .van-button {
            width: 75px;
            height: 30px;
            background-color: #f9c87a;
            border-color: #f9c87a;
            border-radius: 15px;
            font-family: PingFang-SC-Medium;
            font-size: 14px;
            color: #1e1b1f;
          }
        }
      }
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
    font-size: 18px;
    color: #333333;
    line-height: 18px;
    margin-bottom: 45px;
  }

  .money {
    font-family: PingFang-SC-Bold;
    font-size: 27px;
    color: #ff6c1e;
    line-height: 27px;
    margin-bottom: 45px;
  }

  .text-wrap {
    font-family: PingFang-SC-Medium;
    font-size: 12px;
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
      color: #ffffff;
    }
  }
}
</style>
