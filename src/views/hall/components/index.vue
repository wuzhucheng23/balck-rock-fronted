<template>
  <div class="index main-page">
    <div class="container">
      <div class="btn-box" @click="handleToGrab">
        <div class="start-text">{{ $t('开始') }}</div>
        <div class="get-money-text">{{ $t('获得佣金') }}</div>
      </div>
      <div class="info-box">
        <div class="info-item" v-for="item in infoList" :key="item.title">
          <div class="left-wrap">
            <div class="title">{{ item.title }}</div>
            <div class="value">{{ item.value }}</div>
          </div>
          <van-image :src="item.icon"></van-image>
        </div>
      </div>
      <div class="step-box">
        <div class="title">{{ $t('任务步骤') }}</div>
        <div class="content">
          <div class="content-one">
            <div class="text">{{ $t('1、点击“开始”下单。') }}</div>
            <div class="text">{{ $t('2、订单完成后将获得佣金') }}</div>
          </div>
          <div class="content-two" @click="handleToGrab" v-for="item in  goodsList" :key="item.id">
            <van-image :src="item.goods_pic"></van-image>
            <div class="text">{{ item.goods_name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    const infoList = [
      {
        title: this.$t('今日订单'),
        value: '0/50',
        icon: require('@/assets/hall/info-right-icon.png')
      },
      {
        title: this.$t('余额'),
        value: '0.00',
        icon: require('@/assets/hall/info-right-icon.png')
      },
      {
        title: this.$t('今日未结算'),
        value: '$0.00',
        icon: require('@/assets/hall/info-right-icon.png')
      },
      {
        title: this.$t('今日已结算'),
        value: '$0.00',
        icon: require('@/assets/hall/info-right-icon.png')
      }
    ]
    return {
      infoList,
      goodsList: [],
      loading: false,
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.profile()
      this.getShowContent();
    },
    async getShowContent() {
      try {
        this.loading = true
        const resp = await this.$api.home.getShowContent();
        if (resp.code === 1) {
          const data = resp.data
          this.goodsList = data.goods
        } else {
          this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      } finally {
        this.loading = false
      }
    },
    async profile() {
      try {
        this.loading = true
        const resp = await this.$api.home.profile();
        if (resp.code === 1) {
          const data = resp.data
          this.infoList[0].value = data.deal_count + '/' + data.task
          this.infoList[1].value = data.balance
          this.infoList[2].value = data.today_unsettled
          this.infoList[3].value = data.today_settled
        } else {
          this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      } finally {
        this.loading = false
      }
    },
    handleToGrab() {
      this.$router.push({
        name: 'grabOrder',
        label: '抢单'
      })
    },
    handleToRecode() {
      this.$router.push({
        name: 'orderRecode',
        label: '订单记录'
      })
    }
  },
}
</script>

<style scoped lang="less">
.index {
  background: #f1cc95;
}

.container {
  background: #f1cc95 url("../../../assets/hall/hall-bk.png") no-repeat left top/100% 255px;
  padding-top: 219px;

  .btn-box {
    text-align: center;
    width: calc(100% - 68px);
    height: 69px;
    margin: 0 auto 22px;
    padding-top: 12px;
    background: url("../../../assets/hall/start-btn.png") no-repeat center top/100% 69px;

    .start-text {
      font-family: PingFang-SC-Bold;
      font-size: 18px;
      line-height: 18px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #f6e1bc;
      margin-bottom: 6px;
    }

    .get-money-text {
      font-family: PingFang-SC-Medium;
      font-size: 11px;
      line-height: 11px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 1px;
      color: #f6e1bc;
    }
  }

  .info-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin-bottom: 13px;

    .info-item {
      width: calc((100% - 45px) / 2);
      height: 62px;
      background: #fff;
      border-radius: 5px;
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 12px;

      .left-wrap {
        .title {
          font-family: PingFang-SC-Bold;
          font-size: 12px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #999999;
          margin-bottom: 4px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .value {
          font-family: PingFang-SC-Bold;
          font-size: 15px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #dc9110;
        }
      }

      .van-image {
        width: 41px;
        height: 41px;
      }
    }
  }

  .step-box {
    padding: 0 15px 33px;

    .title {
      font-family: PingFang-SC-Bold;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 18px;
      letter-spacing: 0px;
      color: #333333;
      margin-bottom: 17px;
    }

    .content-one {
      height: 98px;
      background-color: #2b2925;
      border-radius: 10px;
      margin-bottom: 15px;
      padding-top: 18px;
      padding-left: 16px;

      .text {
        font-family: PingFang-SC-Medium;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 17px;
        letter-spacing: 0px;
        color: #d7a07e;
        margin-bottom: 10px;
      }
    }

    .content-two {
      height: 100px;
      background-color: #ffffff;
      border-radius: 10px;
      padding: 7px 8px;
      display: flex;
      align-items: center;
      margin-bottom: 15px;

      .van-image {
        width: 84px;
        height: 86px;
        border-radius: 10px;
        overflow: hidden;
        margin-right: 9px;
      }

      .text {
        font-family: PingFang-SC-Bold;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 18px;
        letter-spacing: 0px;
        color: #333333;
      }
    }
  }
}
</style>