<template>
  <div class="task-assistant sub-page">
    <nav-bar :title="$t('购买任务助手')" :background-color="'#1e1b1f'"></nav-bar>
    <div class="container">
      <div class="info-box">
        <div class="title">{{ $t('任务助手') }}</div>
        <div class="text">{{ $t('一键开启自动完成任务') }}</div>
        <div>
          <span class="time" v-if="isExpire === 1">{{ $t('剩余时间') }}：
            <van-count-down :time="time * 1000"
                            :format="'DD '+ $t('天') + ' HH ' + $t('时') + ' mm ' + $t('分') + ' ss ' + $t('秒')"
                            @finish="handleFinish"/>
          </span>
          <span class="time" v-else>{{ $t('已到期') }}</span>
        </div>
      </div>
      <div class="assistant-box">
        <div class="assistant-item" v-for="item in assistantList" :key="item.id">
          <div class="left-wrap">
            <div class="money">{{item.price}}U</div>
            <div class="desc">{{item.expire}}{{ $t('天任务助手服务') }}</div>
          </div>
          <div class="right-wrap">
            <van-button @click="handleBuy(item)">{{ $t('购买') }}</van-button>
          </div>
        </div>
      </div>
    </div>
    <van-dialog v-model="visible" :show-confirm-button="false">
      <div class="dialog-container">
        <div class="title">{{ $t('支付') }}</div>
        <div class="money">USDT {{ buyingAssistant.price }}</div>
        <div class="text-wrap">
          <div class="text">{{ $t('支付方式：余额') }}</div>
        </div>
        <div class="btn-wrap">
          <van-button @click="handleCancel">{{ $t('取消') }}</van-button>
          <van-button @click="handleConfirm">{{ $t('确认') }}</van-button>
        </div>
      </div>
    </van-dialog>
    <result-dialog :visible.sync="showResult" :result="$t('支付成功')" :btn="true"></result-dialog>
  </div>
</template>

<script>
export default {
  name: "task-assistant",
  data() {
    return {
      visible: false,
      showResult: false,
      time: 0,
      assistantList: [],
      buyingAssistant: {},
      isExpire: 0
    }
  },
  created() {
    this.autoTaskList()
    this.profile()
  },
  methods: {
    async profile () {
      try {
        this.loading = true
        const resp = await this.$api.home.profile();
        if (resp.code === 1) {
          const data = resp.data
          this.time = data.expire_time - data.now_time
          this.isExpire = data.isAutoBuy
        } else {
          this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      } finally {
        this.loading = false
      }
    },
    async autoTaskList() {
      try {
        this.loading = true
        const resp = await this.$api.hall.autoTaskList();
        if (resp.code === 1) {
          const data = resp.data
          this.assistantList = data
        } else {
          this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      } finally {
        this.loading = false
      }
    },
    handleBuy (item) {
      this.buyingAssistant = item
      this.visible = true
    },
    handleCancel() {
      this.visible = false
    },
    async handleConfirm() {
      try {
        const params = {tid: this.buyingAssistant.id}
        const resp = await this.$api.hall.buyAutoTask(params);
        if (resp.code === 1) {
          this.visible = false
          this.showResult = true
          this.profile()
        } else {
          this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      }
    },
    handleFinish () {
      this.isExpire = 0
    }
  },
}
</script>

<style scoped lang="less">
::v-deep .van-nav-bar__text, ::v-deep .van-nav-bar__arrow::before {
  color: #ffffff;
}
.container {
  height: calc(100% - 50px);
  overflow: auto;
  background: #1f1b1f;
  .info-box {
    padding: 15px 25px;
    margin-bottom: 20px;
    height: 122px;
    background: url("../../../assets/hall/task-assiatant-bk-two.png") no-repeat center/cover;
    .title {
      font-family: PingFang-SC-Medium;
      font-size: 24px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #f9c87a;
      line-height: 24px;
      margin-bottom: 10px;
    }
    .text {
      font-family: PingFang-SC-Medium;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #a2824f;
      line-height: 24px;
      margin-bottom: 10px;
    }
    .time {
      padding: 0 5px;
      height: 21px;
      background-color: #f9c87a;
      border-radius: 5px;
      font-family: PingFang-SC-Medium;
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #1d1b1e;
      line-height: 21px;
      text-align: center;
      white-space: nowrap;
      .van-count-down {
        display: inline-block;
      }
    }
  }
  .assistant-box {
    padding: 0 15px;
    .assistant-item {
      //height: 80px;
      background-color: #ffffff;
      border-radius: 10px;
      margin-bottom: 15px;
      padding: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left-wrap {
        .money {
          font-family: PingFang-SC-Bold;
          font-size: 24px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #f0ae16;
          line-height: 24px;
          margin-bottom: 10px;
        }
        .desc {
          font-family: PingFang-SC-Medium;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #666666;
          line-height: 16px;
        }
      }
      .right-wrap {
        .van-button {
          height: 30px;
          background-color: #f9c87a;
          border-color: #f9c87a;
          border-radius: 15px;
          font-family: PingFang-SC-Medium;
          font-size: 14px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #1e1b1f;
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
    margin-bottom: 35px;
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
