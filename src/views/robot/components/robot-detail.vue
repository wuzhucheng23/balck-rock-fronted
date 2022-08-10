<template>
  <div class="robot-detail sub-page">
    <nav-bar :title="title"></nav-bar>
    <div class="container">
      <div class="info-box">
        <div class="title">{{ robotInfo.name }}</div>
        <div class="content">
          <div class="top-wrap">
            <div class="left">
              <div class="top-text">{{ $t('总收益') }}</div>
              <div class="bottom-text total-earning">{{ (robotInfo.bili * 100).toFixed(0) }}%</div>
            </div>
            <div class="right">
              <div class="top-text">{{ $t('存放时间') }}</div>
              <div class="bottom-text">{{ robotInfo.day }}{{ $t('天') }}</div>
            </div>
          </div>
          <div class="bottom-wrap">
            <div class="left">
              <div class="top-text">{{ $t('最低买入') }}</div>
              <div class="bottom-text">${{ robotInfo.min_num }}</div>
            </div>
            <div class="right">
              <div class="top-text">{{ $t('最高买入') }}</div>
              <div class="bottom-text">${{ robotInfo.max_num }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="btn-box">
        <van-button block @click="handleToBuy">{{ $t('购买') }}</van-button>
      </div>
      <div class="tip-box">
        <div class="title">{{ $t('购买说明') }}：</div>
        <div class="content" v-html="detail">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "robot-detail",
  data() {
    return {
      robotInfo: {},
      detail: ''
    }
  },
  computed: {
    id() {
      return this.$route.query.id
    },
    title() {
      return this.$route.query.title
    }
  },
  created() {
    this.getRobotList()
    this.getRobotDesc()
  },
  methods: {
    handleToBuy() {
      this.$router.push({
        name: 'robotBuy',
        label: '机器买入',
        query: {
          id: this.id
        }
      })
    },
    async getRobotDesc() {
      try {
        this.loading = true
        const resp = await this.$api.robot.getRobotDesc();
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
    async getRobotList() {
      try {
        this.loading = true
        const resp = await this.$api.robot.robotList();
        if (resp.code === 1) {
          const data = resp.data
          this.robotInfo = data.list.find(item => item.id == this.id)
        } else {
          this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped lang="less">
.container {
  height: calc(100% - 50px);
  overflow: auto;
  .info-box {
    height: 200px;
    background: #f6d79b url("../../../assets/robot/robot-detail-bk.png") no-repeat center/cover;
    overflow: visible;
    margin-bottom: 120px;
    padding: 60px 15px 0;
    .title {
      padding-left: 27px;
      font-family: PingFang-SC-Bold;
      font-size: 20px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #333333;
      line-height: 20px;
      margin-bottom: 46px;
    }
    .content {
      height: 165px;
      background-color: #ffffff;
      border-radius: 10px;
      padding: 25px 15px 20px;
      .top-wrap {
        height: 41px;
        margin-bottom: 20px;
        display: flex;
        justify-content: space-around;
        text-align: center;
        position: relative;
        .top-text {
          font-family: PingFang-SC-Medium;
          font-size: 12px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 12px;
          letter-spacing: 0px;
          color: #333333;
          margin-bottom: 16px;
        }
        .bottom-text {
          font-family: PingFang-SC-Bold;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 16px;
          letter-spacing: 0px;
          color: #333333;
        }
        .total-earning {
          color: #fc6324!important;
        }
        &::before {
          content: '';
          display: block;
          width: 1px;
          height: 40px;
          background-color: #f1f1f1;
          border-radius: 1px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .bottom-wrap {
        height: 65px;
        background-color: #2f2e33;
        border-radius: 10px;
        display: flex;
        justify-content: space-between;
        text-align: center;
        padding: 13px 36px;
        font-family: PingFang-SC-Medium;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 12px;
        letter-spacing: 0px;
        color: #f6d79b;
        position: relative;
        .top-text {
          margin-bottom: 13px;
        }
        .bottom-text {
          font-size: 16px;
          line-height: 16px;
        }
        &::before {
          content: '';
          display: block;
          width: 20px;
          height: 1px;
          background-color: #f6d79b;
          border-radius: 1px;
          position: absolute;
          left: 50%;
          bottom: 20px;
          transform: translateX(-50%);
        }
      }
    }
  }
  .btn-box {
      padding: 0 15px;
      margin-bottom: 20px;
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
    padding: 0 15px 15px;
    font-family: PingFang-SC-Medium;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 16px;
    letter-spacing: 0px;
    color: #333333;
    .title {
      margin-bottom: 12px;
    }
  }
}
</style>