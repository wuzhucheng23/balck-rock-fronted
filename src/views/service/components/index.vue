<template>
  <div class="index main-page">
    <div class="container">
      <div class="service-box">
        <div class="title">{{ $t('客服') }}</div>
        <div class="text">{{ $t('如果您有任何问题，请联系在线客户服务为您解决。') }}</div>
        <div class="content">
          <div class="content-item vip" @click="handleToVip">
            <div class="top-text">{{ $t('贵宾服务') }}</div>
            <div class="bottom-text">{{ $t('VIP专属客服') }}</div>
            <div class="img">
              <van-image :src="require('@/assets/service/vip-service.png')"></van-image>
            </div>
          </div>
          <div class="content-item online" @click="handleToOnline">
            <div class="top-text">{{ $t('在线服务') }}</div>
            <div class="bottom-text">{{ $t('24小时在线') }}</div>
            <div class="img">
              <van-image :src="require('@/assets/service/online-service.png')"></van-image>
            </div>
          </div>
        </div>
      </div>
      <div class="question-box">
        <div class="title">{{ $t('常见问题') }}</div>
        <div class="content">
          <van-collapse v-model="activeNames">
            <van-collapse-item :title="item.title"
                               :name="item.title"
                               v-for="item in questionList"
                               :key="item.title">
              <div v-html="item.detail"></div>
            </van-collapse-item>
          </van-collapse>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      activeNames: [],
      questionList: [],
      serviceList: [],
    }
  },
  created() {
    this.getFaq()
    this.getCustomer()
  },
  methods: {
    async getFaq() {
      try {
        this.loading = true
        const resp = await this.$api.service.getFaq();
        if (resp.code === 1) {
          const data = resp.data
          this.questionList = data
        } else {
          this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      } finally {
        this.loading = false
      }
    },
    async getCustomer() {
      try {
        this.loading = true
        const resp = await this.$api.service.getCustomer();
        if (resp.code === 1) {
          const data = resp.data
          this.serviceList = data
        } else {
          this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      } finally {
        this.loading = false
      }
    },
    handleToVip () {
      window.open(this.serviceList.find(item => item.username === '贵宾服务VIP').url)
    },
    handleToOnline () {
      window.open(this.serviceList.find(item => item.username === '在线服务').url)
    },
  },
}
</script>

<style scoped lang="less">
.container {
  .service-box {
    height: 255px;
    background: url("../../../assets/service/service-bk.png") no-repeat center/cover;
    padding: 56px 15px 0;
    margin-bottom: 130px;
    .title {
      padding-left: 2px;
      margin-bottom: 13px;
      font-family: PingFang-SC-Bold;
      font-size: 22px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #333333;
      line-height: 22px;
    }
    .text {
      height: 36px;
      width: 180px;
      padding-left: 3px;
      font-family: PingFang-SC-Medium;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #333333;
      line-height: 18px;
      margin-bottom: 83px;
    }
    .content {
      display: flex;
      justify-content: space-between;
      .content-item {
        width: calc((100% - 15px) / 2);
        height: 163px;
        background-color: #f6f8f7;
        border-radius: 5px;
        padding: 18px 9px;
        .top-text {
          font-family: PingFang-SC-Bold;
          font-size: 12px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #333333;
          line-height: 12px;
          margin-bottom: 5px;
          padding-left: 2px;
        }
        .bottom-text {
          font-family: PingFang-SC-Bold;
          font-size: 11px;
          line-height: 11px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #999999;
          margin-bottom: 21px;
          padding-left: 1px;
        }
        .van-image {
          width: 100%;
          height: 80px;
          background-color: #ebd099;
          border-radius: 5px;
          overflow: hidden;
        }
      }
      .vip {
        background: #f6f8f7 url("../../../assets/service/phone-icon.png") no-repeat right 9px top 14px/34px 34px;
      }
      .online {
        background: #f6f8f7 url("../../../assets/service/message-icon.png") no-repeat right 9px top 14px/34px 34px;
      }
    }
  }
  .question-box {
    padding: 0 15px;
    margin-bottom: 17px;
    .title {
      font-family: PingFang-SC-Medium;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 14px;
      letter-spacing: 0px;
      color: #333333;
      margin-bottom: 18px;
    }
    ::v-deep {
      .van-collapse-item {
        margin-bottom: 8px;
        background-color: #f6f8f7;
        border-radius: 10px;
        overflow: hidden;
      }


      .van-cell {
        height: 48px;
        background-color: #f6f8f7;
        border-radius: 10px;
        &::after {
          display: none;
        }
      }

      .van-hairline--top-bottom::after {
        border-width: 0;
      }
      .van-collapse-item--border::after {
        display: none;
      }

    .van-collapse-item__content {
        background-color: #f6f8f7;
        font-family: PingFang-SC-Medium;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 17px;
        letter-spacing: 0px;
        color: #999999;
        padding-top: 0;
      }

      .van-cell__title {
        font-family: PingFang-SC-Medium;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        line-height: 28px;
        color: #333333;
      }
    }
  }
}
</style>