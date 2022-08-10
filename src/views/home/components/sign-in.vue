<template>
  <div class="sign-in sub-page">
    <div class="container">
      <div class="container__content">
        <div class="nav-bar-wrap">
          <van-icon name="arrow-left" @click="$router.back()"/>
          <span>夺宝大转盘</span>
          <span class="activity-rules" @click="toSignInRules">签到规则</span>
        </div>
        <div class="sign-in-wrap">
          <div class="sign-in-wrap__title">连续签到领积分</div>
          <div class="sign-in-wrap__content">
            <div class="sign-in-item" v-for="item in signList" :key="item.id"
                 :style="[{background: item.isSignIn ? '#ffbf07' : '#f5f6fa'}]" :class="{'seven-item': item.id === 7}">
              <div class="sign-in-item__top">{{ item.title }}</div>
              <div class="sign-in-item__middle">
                <template v-if="item.id < 7">
                  <van-image :src="require('@/assets/home/sign-in-icon.png')" v-if="item.isSignIn"></van-image>
                  <van-image :src="require('@/assets/home/non-sign-in-icon.png')" v-else></van-image>
                </template>
                <div class="award" v-else>{{ item.value }}</div>
              </div>
              <div class="sign-in-item__bottom" style="color: #fff" v-if="item.isSignIn">已签到</div>
              <div class="sign-in-item__bottom" style="color: #c7cdcb" v-else>未签到</div>
            </div>
          </div>
          <div class="sign-in-wrap__btn">
            <van-button block @click="visible = true">点击签到</van-button>
          </div>
        </div>
        <div class="record-wrap">
          <div class="record-wrap__title">签到记录</div>
          <div class="record-wrap__content">
            <div class="record-item" v-for="item in 5" :key="item">
              <div class="record-item__left">
                <van-image :src="require('@/assets/home/sign-in-icon.png')"></van-image>
                <span>签到成功</span>
              </div>
              <div class="record-item__right">
                <div class="award">现金2.5USDT</div>
                <div class="time">2022/02/02</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-dialog v-model="visible" :show-confirm-button="false" close-on-click-overlay width="295px">
      <div class="dialog-container">
        <van-image :src="require('@/assets/home/sign-in-star.png')" class="sign-in-star"></van-image>
        <div class="dialog-container__title">
          签到成功
        </div>
        <div class="dialog-container__content">
          <div class="image">
            <van-image :src="require('@/assets/home/sign-dialog-image.png')"></van-image>
          </div>
          <div class="text">恭喜你获得</div>
          <div class="award">instagram任务两个</div>
        </div>
        <div class="dialog-container__btn">
          <van-button block>确认</van-button>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
export default {
  name: "sign-in",
  data() {
    const signList = [
      {
        id: 1,
        title: '第1天',
        isSignIn: true,
        value: '2.5USDT'
      },
      {
        id: 2,
        title: '第2天',
        isSignIn: true,
        value: '2.5USDT'
      },
      {
        id: 3,
        title: '第3天',
        isSignIn: false,
        value: '2.5USDT'
      },
      {
        id: 4,
        title: '第4天',
        isSignIn: false,
        value: '2.5USDT'
      },
      {
        id: 5,
        title: '第5天',
        isSignIn: false,
        value: '2.5USDT'
      },
      {
        id: 6,
        title: '第6天',
        isSignIn: false,
        value: '2.5USDT'
      },
      {
        id: 7,
        title: '第7天',
        isSignIn: false,
        value: '2.5USDT'
      },
    ]
    return {
      signList,
      visible: false
    }
  },
  methods: {
    toSignInRules() {
      this.$router.push({
        name: 'signInRules',
        label: '签到规则'
      })
    }
  },
}
</script>

<style scoped lang="less">
.container {
  height: 100%;
  overflow: auto;

  .container__content {
    min-height: 100%;
    padding-bottom: 30px;
    background: url("../../../assets/home/sign-in-bk.png") no-repeat left top/100% 209px;

    .nav-bar-wrap {
      margin-bottom: 144px;
      position: relative;
      line-height: 50px;
      font-family: PingFang-SC-Medium;
      font-size: 18px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #ffffff;
      text-align: center;

      .van-icon {
        position: absolute;
        top: 50%;
        left: 12px;
        transform: translateY(-50%);
      }

      .activity-rules {
        position: absolute;
        right: 0;
        bottom: -30px;
        width: 90px;
        height: 30px;
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
        line-height: 30px;
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 15px 0px 0px 15px;
        text-align: center;
      }
    }

    .sign-in-wrap {
      width: calc(100% - 30px);
      padding: 15px;
      background-color: #ffffff;
      border-radius: 10px;
      margin: 0 auto 15px;

      &__title {
        font-family: PingFang-SC-Bold;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 16px;
        letter-spacing: 0px;
        color: #333333;
        margin-bottom: 15px;
      }

      &__content {
        margin-bottom: 7px;
        display: flex;
        flex-wrap: wrap;
        margin-right: -13px;

        .sign-in-item {
          width: calc((100% - 52px) / 4);
          margin-right: 13px;
          margin-bottom: 13px;
          //height: 78px;
          background-color: #ffbf07;
          border-radius: 5px;
          padding: 8px;
          text-align: center;

          &__top {
            font-family: PingFang-SC-Medium;
            font-size: 12px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 12px;
            letter-spacing: 0px;
            color: #333333;
            margin-bottom: 7px;
          }

          &__middle {
            margin-bottom: 5px;

            .van-image {
              width: 32px;
              height: 32px;
              vertical-align: middle;
            }
          }

          &__bottom {
            font-family: PingFang-SC-Medium;
            font-size: 10px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 10px;
            letter-spacing: 0px;
            color: #ffffff;
            transform: scale(0.85);
          }
        }

        .seven-item {
          flex: 1;
          text-align: left;
          padding-left: 11px;
          position: relative;

          &::after {
            content: '';
            display: block;
            width: 58px;
            height: 55px;
            background: url("../../../assets/home/money-bag-icon.png") no-repeat left top/100% 100%;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 5px;
          }

          .sign-in-item__middle {
            font-family: PingFang-SC-Bold;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 32px;
            letter-spacing: 0px;
            color: #ff9d09;
          }

          .sign-in-item__bottom {
            position: relative;
            left: -10px;
          }
        }
      }

      &__btn {
        .van-button {
          height: 48px;
          background-color: #ffbf07;
          border-color: #ffbf07;
          border-radius: 24px;
          font-family: PingFang-SC-Bold;
          font-size: 18px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 19px;
          letter-spacing: 0px;
          color: #ffffff;
        }
      }
    }

    .record-wrap {
      width: calc(100% - 30px);
      margin: 0 auto;
      padding: 20px 15px;
      background-color: #ffffff;
      border-radius: 10px;

      &__title {
        font-family: PingFang-SC-Bold;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 16px;
        letter-spacing: 0px;
        color: #333333;
        margin-bottom: 19px;
      }

      &__content {
        .record-item {
          padding: 0 15px;
          height: 55px;
          background-color: #f6f6f6;
          border-radius: 5px;
          margin-bottom: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          &__left {
            display: flex;
            align-items: center;

            .van-image {
              width: 32px;
              height: 32px;
              margin-right: 9px;
            }

            span {
              font-family: PingFang-SC-Bold;
              font-size: 16px;
              font-weight: normal;
              font-stretch: normal;
              line-height: 19px;
              letter-spacing: 0px;
              color: #333333;
            }
          }

          &__right {
            .award {
              font-family: PingFang-SC-Bold;
              font-size: 14px;
              font-weight: normal;
              font-stretch: normal;
              line-height: 14px;
              letter-spacing: 0px;
              color: #ff9d09;
              margin-bottom: 7px;
            }

            .time {
              font-family: PingFang-SC-Medium;
              font-size: 12px;
              font-weight: normal;
              font-stretch: normal;
              line-height: 12px;
              letter-spacing: 0px;
              color: #999999;
            }
          }
        }
      }
    }
  }
}

.van-dialog {
  border-radius: 10px;
  padding: 15px 20px 20px;

  .dialog-container {
    .sign-in-star {
      position: absolute;
      left: 18px;
      top: 0;
      width: 39px;
      height: 63px;
    }

    &__title {
      font-family: PingFang-SC-Bold;
      font-size: 18px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      line-height: 18px;
      color: #000000;
      margin-bottom: 40px;
      text-align: center;
    }

    &__content {
      margin-bottom: 30px;
      text-align: center;

      .image {
        margin-bottom: 19px;

        .van-image {
          width: 120px;
          height: 129px;
        }
      }

      .text {
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #000000;
        line-height: 14px;
        margin-bottom: 15px;
      }

      .award {
        font-family: PingFang-SC-Bold;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 18px;
        letter-spacing: 0px;
        color: #ff9d09;
      }
    }

    &__btn {
      .van-button {
        height: 48px;
        background-color: #ff9000;
        border-color: #ff9000;
        border-radius: 24px;
        font-family: PingFang-SC-Bold;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 19px;
        letter-spacing: 0px;
        color: #ffffff;
      }
    }
  }
}
</style>
