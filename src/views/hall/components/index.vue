<template>
  <div class="index main-page">
    <div class="container">
      <div class="btn-box" @click="handleGrabOrder">
        <div class="start-text">{{ $t('一键完成所有任务') }}</div>
        <div class="get-money-text">{{ $t('获得佣金') }}</div>
      </div>
      <div class="task-assistant-box" @click="handleToTaskAssistant">
        <div class="content">
          <div class="top-text">{{ $t('购买任务助手') }}</div>
          <div class="bottom-text">{{ $t('一键开启自动完成任务') }}</div>
        </div>
      </div>
      <div class="info-box">
        <div class="info-item" v-for="item in infoList" :key="item.title">
          <div class="left-wrap">
            <div class="title">{{ item.title }}</div>
            <div class="value">
              <span v-if="item.title === $t('我的余额')">$ </span>
              <span>{{ item.value }}</span>
            </div>
          </div>
          <van-image :src="item.icon"></van-image>
        </div>
      </div>
      <div class="step-box">
        <div class="title">{{ $t('任务步骤') }}</div>
        <div class="content">
          <div class="content-one">
            <div class="text">1、{{ $t('点击“购买任务助手”购买任务助手') }}</div>
            <div class="text">2、{{ $t('点击“领取任务”做任务。') }}</div>
            <div class="text">3、{{ $t('任务完成后将获得佣金') }}</div>
          </div>
          <div class="content-two" @click="handleToGrab(item)" v-for="item in  goodsList" :key="item.id">
            <van-image :src="item.goods_pic"></van-image>
            <div class="text-box">
              <div class="goods-name">{{ item.goods_name }}</div>
              <div class="bottom-wrap">
                <span class="goods-price">${{ item.goods_price }}</span>
                <span class="cate-name">{{ item.cateName }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <result-dialog :visible.sync="showResult" :result="tipText" :btn="true"></result-dialog>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    const infoList = [
      {
        title: this.$t('今日任务'),
        value: '0/50',
        icon: require('@/assets/hall/info-right-icon.png')
      },
      {
        title: this.$t('我的余额'),
        value: '0.00',
        icon: require('@/assets/hall/info-right-icon.png')
      },
      // {
      //   title: this.$t('今日未结算'),
      //   value: '$0.00',
      //   icon: require('@/assets/hall/info-right-icon.png')
      // },
      // {
      //   title: this.$t('今日已结算'),
      //   value: '$0.00',
      //   icon: require('@/assets/hall/info-right-icon.png')
      // }
    ]
    return {
      infoList,
      goodsList: [],
      loading: false,
      showResult: false,
      isFinish: false,
      tipText: '',
      timer: undefined
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.profile()
      this.goodList();
    },
    async goodList() {
      try {
        this.loading = true
        const resp = await this.$api.hall.goodList();
        if (resp.code === 1) {
          const data = resp.data
          this.goodsList = data
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
          if (data.deal_count > data.task || data.deal_count === data.task) this.isFinish = true
          // this.infoList[2].value = data.today_unsettled
          // this.infoList[3].value = data.today_settled
        } else {
          this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      } finally {
        this.loading = false
      }
    },
    handleToGrab(item) {
      this.$router.push({
        name: 'grabOrder',
        label: '抢单',
        query: {
          id: item.cid,
          title: item.cateName,
          img: item.cate_pic
        }
      })
    },
    handleToRecode() {
      this.$router.push({
        name: 'orderRecode',
        label: '订单记录'
      })
    },
    async handleGrabOrder() {
      this.$utils.debounce(async () => {
        if (this.isFinish) {
          this.tipText = this.$t('您已完成所有任务')
          return  this.showResult = true
        }
        try {
          this.loading = true
          const resp = await this.$api.hall.autoBuy();
          if (resp.code === 1) {
            this.tipText = this.$t('已完成所有任务')
            this.showResult = true
          } else {
            this.$toast.fail(resp.msg || resp.message)
          }
        } catch (e) {
          this.$toast.fail(this.$t('发生错误'));
        } finally {
          this.loading = false
        }
      })()
      // if (this.isFinish) {
      //   this.tipText = this.$t('您已完成所有任务')
      //   return  this.showResult = true
      // }
      // try {
      //   this.loading = true
      //   const resp = await this.$api.hall.autoBuy();
      //   if (resp.code === 1) {
      //     this.tipText = this.$t('已完成所有任务')
      //     this.showResult = true
      //   } else {
      //     this.$toast.fail(resp.msg || resp.message)
      //   }
      // } catch (e) {
      //   this.$toast.fail(this.$t('发生错误'));
      // } finally {
      //   this.loading = false
      // }
    },
    // async handleGrab () {
    //   try {
    //     this.loading = true
    //     const resp = await this.$api.hall.grabOrder();
    //     if (resp.code === 1) {
    //       this.showResult = true
    //       this.$utils.delayPush('commitOrder', '提交订单', {
    //         info: resp.data.info
    //       })
    //     } else {
    //       this.$toast.fail(resp.msg || resp.message)
    //     }
    //   } catch (e) {
    //     this.$toast.fail(this.$t('发生错误'));
    //   } finally {
    //     this.loading = false
    //   }
    // },
    handleToTaskAssistant () {
      this.$router.push({
        name: 'taskAssistant',
        label: '任务助手'
      })
    }
  },
}
</script>

<style scoped lang="less">
.index {
  background: #3b83ff;
}

.container {
  background: #3b83ff url("../../../assets/hall/hall-bk.png") no-repeat left top/100% 255px;
  padding-top: 220px;

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
          white-space: nowrap;
        }
      }

      .van-image {
        width: 41px;
        height: 41px;
      }
    }
  }

  .task-assistant-box {
    padding: 0 15px;
    margin-bottom: 20px;
    .content {
      height: 70px;
      background: #1d1b1e url("../../../assets/hall/task-assistant-bk.png") no-repeat center/cover;
      border-radius: 10px;
      padding-top: 15px;
      padding-left: 20px;
      .top-text {
        font-family: PingFang-SC-Medium;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #f9c87a;
        line-height: 18px;
        margin-bottom: 8px
      }
      .bottom-text {
        font-family: PingFang-SC-Medium;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #a2824f;
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
      color: #ffffff;
      margin-bottom: 17px;
    }

    .content-one {
      min-height: 98px;
      background-color: #1335c1;
      border-radius: 10px;
      margin-bottom: 15px;
      padding-top: 18px;
      padding-bottom: 18px;
      padding-left: 16px;

      .text {
        font-family: PingFang-SC-Medium;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 17px;
        letter-spacing: 0px;
        color: #ffffff;
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
        width: 86px;
        height: 86px;
        border-radius: 10px;
        overflow: hidden;
        margin-right: 17px;
      }

      .text-box {
        height: 86px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .goods-name {
          font-family: PingFang-SC-Bold;
          font-size: 12px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 14px;
          letter-spacing: 0px;
          color: #333333;
        }
        .bottom-wrap {
          display: flex;
          justify-content: space-between;
          width: 100%;
          padding-right: 10px;
          .goods-price {
            font-family: PingFang-SC-Bold;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 19px;
            letter-spacing: 0px;
            color: #e98d00;
          }
          .cate-name {
            font-family: PingFang-SC-Medium;
            font-size: 12px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 19px;
            letter-spacing: 0px;
            color: #999999;
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
  padding: 54px 20px 17px;
  text-align: center;

  .title {
    font-family: PingFang-SC-Bold;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #333333;
    line-height: 18px;
    margin-bottom: 52px;
  }

  .text {
    height: 14px;
    font-family: PingFang-SC-Medium;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 18px;
    letter-spacing: 0px;
    color: #333333;
    margin-bottom: 72px;
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