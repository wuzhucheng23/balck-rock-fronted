<template>
  <div class="lottery sub-page">
    <div class="container">
      <div class="container__content">
        <div class="nav-bar-wrap">
          <van-icon name="arrow-left" @click="$router.back()"/>
          <span>夺宝大转盘</span>
          <span class="activity-rules" @click="toActivityRules">活动规则</span>
        </div>
        <div class="title-wrap">
          <div class="title-wrap__title">
            <van-image :src="require('@/assets/home/lottery-title.png')"></van-image>
          </div>
          <div class="title-wrap__notice">
            <van-image :src="require('@/assets/home/lottery-msg.png')"></van-image>
            <span>刘德华</span>
            <span>抽中现金10USDT</span>
            <span>1分钟前</span>
          </div>
        </div>
        <div class="draw-wrap">
          <van-image :src="require('@/assets/home/rotary-table.png')" class="rotary-table"></van-image>
          <van-image :src="require('@/assets/home/lottery-pointer.png')" class="lottery-pointer"
                     @click="visible = true"></van-image>
        </div>
        <div class="draw-number">
          <div class="draw-number__desc">抽奖次数：1</div>
          <div class="draw-number__buy">购买次数</div>
        </div>
        <div class="award-wrap">
          <div class="award-wrap__title">
            <span>我的奖品</span>
          </div>
          <div class="award-wrap__content">
            <div class="award-item" v-for="item in 6" :key="item">
              <div class="award-item__left">现金1USDT</div>
              <div class="award-item__right">2022/02/02</div>
            </div>
            <div class="finish-text">没有更多了~</div>
          </div>
        </div>
      </div>
    </div>
    <van-dialog width="295px" v-model="visible" :show-confirm-button="false" close-on-click-overlay>
      <div class="dialog-container">
        <van-image :src="require('@/assets/home/dialog-star-icon.png')" class="dialog-star"></van-image>
        <div class="title-wrap">恭喜你</div>
        <div class="content-wrap">
          <div class="content-wrap__top">恭喜你获得</div>
          <div class="content-wrap__middle">
            <van-image :src="require('@/assets/home/task-assistant-icon.png')"></van-image>
          </div>
          <div class="content-wrap__bottom">任务助手3天</div>
        </div>
        <div class="btn-wrap">
          <van-button block @click="visible = false">确认</van-button>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
export default {
  name: "lottery",
  data() {
    return {
      visible: false
    }
  },
  methods: {
    toActivityRules() {
      this.$router.push({
        name: 'lotteryRules',
        label: '抽奖规则'
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
    background: url("../../../assets/home/lottery-bk.png") no-repeat left top/100% 100%;

    .nav-bar-wrap {
      margin-bottom: 30px;
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
        top: 50%;
        transform: translateY(-50%);
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

    .title-wrap {
      margin-bottom: 35px;

      .title-wrap__title {
        text-align: center;
        margin-bottom: 10px;

        .van-image {
          width: 280px;
        }
      }

      .title-wrap__notice {
        width: calc(100% - 70px);
        margin: 0 auto;
        padding: 0 40px;
        height: 30px;
        font-family: PingFang-SC-Medium;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 30px;
        letter-spacing: 0px;
        color: #ffffff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        background: transparent;

        .van-image {
          position: absolute;
          width: 12px;
          height: 12px;
          left: 23px;
          top: 50%;
          transform: translateY(-50%);
          vertical-align: middle;
        }

        &::before {
          content: '';
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          width: calc(100%);
          height: 1px;
          background-image: linear-gradient(90deg, rgba(137, 112, 185, 0), rgba(137, 112, 185, 1), rgba(137, 112, 185, 0));
          background-blend-mode: normal, normal;
          border-radius: 1px;
        }

        &::after {
          content: '';
          display: block;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          width: calc(100%);
          height: 1px;
          background-image: linear-gradient(90deg, rgba(137, 112, 185, 0), rgba(137, 112, 185, 1), rgba(137, 112, 185, 0));
          background-blend-mode: normal, normal;
          border-radius: 1px;
        }
      }
    }

    .draw-wrap {
      width: 333px;
      height: 333px;
      margin: 0 auto 20px;
      position: relative;

      .rotary-table {
        width: 100%;
        height: 100%;
        vertical-align: middle;
      }

      .lottery-pointer {
        width: 97px;
        height: 129px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -61%);
      }
    }

    .draw-number {
      text-align: center;
      margin-bottom: 36px;

      &__desc {
        font-family: PingFang-SC-Medium;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 16px;
        letter-spacing: 0px;
        color: #ffffff;
        margin-bottom: 22px;
      }

      &__buy {
        margin: 0 auto;
        width: 158px;
        height: 36px;
        background-color: #ffbd1c;
        border-radius: 18px;
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 36px;
        letter-spacing: 0px;
        color: #333333;
      }
    }

    .award-wrap {
      text-align: center;

      &__title {
        margin-bottom: 20px;
        line-height: 18px;

        span {
          font-family: PingFang-SC-Medium;
          font-size: 18px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #ffffff;
          position: relative;

          &::before {
            content: '';
            display: block;
            width: 52px;
            height: 8px;
            border: 1px dotted #ffffff;
            border-image: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.3)) 10;
            position: absolute;
            left: -67px;
            top: 50%;
            transform: translateY(-50%);
          }

          &::after {
            content: '';
            display: block;
            width: 52px;
            height: 8px;
            border: 1px dotted #ffffff;
            border-image: linear-gradient(to left, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.3)) 10;
            position: absolute;
            right: -67px;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }

      &__content {
        margin: 0 auto;
        width: calc(100% - 30px);
        height: 356px;
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 10px;

        .award-item {
          padding: 0 15px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          line-height: 49px;
          display: flex;
          justify-content: space-between;

          &__left {
            font-family: PingFang-SC-Bold;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #ffbd1c;
          }

          &__right {
            font-family: PingFang-SC-Medium;
            font-size: 12px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #ffffff;
          }
        }

        .finish-text {
          font-family: PingFang-SC-Medium;
          font-size: 12px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 55px;
          letter-spacing: 0px;
          color: #8e5ded;
        }
      }
    }
  }
}

.van-dialog {
  border-radius: 10px;

  .dialog-container {
    padding: 15px 20px 20px;

    .dialog-star {
      position: absolute;
      top: 0;
      left: 18px;
      width: 39px;
      height: 63px;
    }

    .title-wrap {
      font-family: PingFang-SC-Bold;
      font-size: 18px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #000000;
      line-height: 18px;
      margin-bottom: 37px;
      text-align: center;
    }

    .content-wrap {
      text-align: center;

      &__top {
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #000000;
        margin-bottom: 24px;
      }

      &__middle {
        text-align: center;

        .van-image {
          width: 106px;
          height: 76px;
          vertical-align: middle;
        }

        margin-bottom: 43px;
      }

      &__bottom {
        height: 76px;
        font-family: PingFang-SC-Bold;
        font-size: 22px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: 0px;
        color: #7240ef;
      }
    }

    .btn-wrap {
      .van-button {
        height: 48px;
        background-color: #703def;
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
