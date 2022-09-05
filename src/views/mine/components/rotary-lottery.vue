<template>
  <div class="rotary-lottery sub-page">
    <div class="container">
      <div class="container__content">
        <div class="nav-bar-wrap">
          <van-icon name="arrow-left" @click="$router.back()"/>
          <span>{{ $t('夺宝大转盘') }}</span>
          <span class="activity-rules"
                @click="$utils.toRoute('LotteryRules', '抽奖规则')">
            {{ $t('活动规则') }}
          </span>
        </div>
        <div class="title-wrap">
          <div class="title-wrap__title">
            <van-image :src="require('@/assets/home/lottery-title.png')"/>
          </div>
          <div class="title-wrap__notice__box">
            <div class="title-wrap__notice__content">
              <template v-if="nameList.length > 0">
                <div class="title-wrap__notice" v-for="item in 21" :key="item">
                  <van-image :src="require('@/assets/home/lottery-msg.png')"/>
                  <span>{{ (Math.random() * 899 + 100).toFixed(0) }}***</span>
                  <span class="middle-text">{{ nameList[(Math.random() * 7).toFixed(0)] }}</span>
                  <span>{{ $t('1分钟前') }}</span>
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="draw-wrap">
          <div ref="rotateImg" class="rotate-box">
            <div class="award-list">
              <div class="award-item"
                   v-for="(item, index) in awardList"
                   :key="item.id"
                   :class="{ whiteColor: index % 2 !== 0}"
                   :style="{ transform: 'translateX(-50%) rotateZ('+ +(45 * index + 22.5)  + 'deg)' }">
                <span>{{ item.name }}</span>
              </div>
            </div>
            <van-image :src="require('@/assets/home/rotary-table.png')" class="rotary-table"/>
          </div>
          <van-image
              :src="require('@/assets/home/lottery-pointer.png')"
              class="lottery-pointer"
              @click="startTurn"
          />
        </div>
        <div class="draw-number">
          <div class="draw-number__desc">{{ $t('抽奖次数') }}：{{ drawNumber }}</div>
          <div class="draw-number__buy" @click="toBuy = true">{{ $t('购买次数') }}</div>
        </div>
        <div class="award-wrap">
          <div class="award-wrap__title">
            <span>{{ $t('我的奖品') }}</span>
          </div>
          <div class="award-wrap__content">
            <van-empty :description="$t('空空如也')" v-if="isEmpty"/>
            <van-list
                v-model="loading"
                :loading-text="$t('加载中...')"
                :finished="finished"
                :finished-text="isEmpty ? '' : $t('没有更多数据了...')"
                @load="getAwardRecord">
              <div class="award-item" v-for="item in awardRecordList" :key="item.id">
                <div class="award-item__left">{{ item.name }}</div>
                <div class="award-item__right">{{ item.create_time }}</div>
              </div>
            </van-list>
          </div>
        </div>
      </div>
    </div>
    <van-dialog
        width="295px"
        v-model="visible"
        :show-confirm-button="false"
        close-on-click-overlay>
      <div class="dialog-container">
        <van-image :src="require('@/assets/home/dialog-star-icon.png')" class="dialog-star"/>
        <div class="title-wrap" v-if="awardId !== 7">{{ $t('恭喜你') }}</div>
        <div class="title-wrap" v-else>{{ $t('很遗憾') }}</div>
        <div class="content-wrap">
          <div class="content-wrap__top" v-if="awardId !== 7">{{ $t('恭喜你获得') }}</div>
          <div class="content-wrap__top" v-else>{{ $t('夺宝失败') }}</div>
          <div class="content-wrap__middle">
            <van-image :src="require('@/assets/home/task-assistant-icon.png')"/>
          </div>
          <div class="content-wrap__bottom">{{ awardName }}</div>
        </div>
        <div class="btn-wrap">
          <van-button block @click="visible = false">
            <span>{{ $t('确认') }}</span>
          </van-button>
        </div>
      </div>
    </van-dialog>
    <van-dialog
        v-model="toBuy"
        width="295px"
        close-on-click-overlay
        :show-confirm-button="false">
      <div class="dialog-container">
        <van-image :src="require('@/assets/home/dialog-star-icon.png')" class="dialog-star"/>
        <div class="title-wrap">{{ $t('购买抽奖次数') }}</div>
        <div class="content-wrap">
          <div class="draw-number-list">
            <div class="draw-number-item"
                 v-for="item in buyNumberList" :key="item.num"
                 :class="{'active-item': buyNumber === +item.num}"
                 @click="buyNumber = +item.num">
              <div>{{ $t('购买次数') }}：{{ item.num }}</div>
              <div>${{ item.price }}</div>
            </div>
          </div>
        </div>
        <div class="btn-wrap">
          <van-button
              block
              loading-type="spinner"
              :loading="btnLoading"
              :loading-text="$t('正在购买...')"
              @click="handleBuy">
            <span>{{ $t('购买') }}</span>
          </van-button>
        </div>
      </div>
    </van-dialog>
    <result-dialog
        :visible.sync="showResult"
        :result="$t('购买成功')"
        :btn="true"
    />
  </div>
</template>

<script>
export default {
  name: "RotaryLottery",
  data() {
    return {
      visible: false,
      awardList: [],
      rolling: false,
      drawNumber: 0,
      toBuy: false,
      buyNumberList: [],
      buyNumber: 1,
      btnLoading: false,
      showResult: false,
      awardName: '',
      awardId: 7,
      page: 1,
      limit: 10,
      awardRecordList: [],
      empty: false,
      finished: false,
      loading: false,
      nameList: []
    }
  },
  computed: {
    isEmpty() {
      return this.empty && !this.loading
    }
  },
  filters: {
    getAwardName(value, list) {
      console.log(value, list)
      const obj = list.find(item => item.id === value)
      console.log(obj)
      return obj ? obj.name : ''
    }
  },
  created() {
    this.getTurnGoodList()
    this.getTurnNumList()
    this.profile()
  },
  methods: {
    async getAwardRecord() {
      const params = {
        limit: this.limit,
        page: this.page
      }
      try {
        this.empty = false
        this.loading = true
        const res = await this.$api.mine.myTurnList(params);
        if (res.code === 1) {
          this.awardRecordList.push(...res.data)
          if (this.awardRecordList.length === 0) this.empty = true;
          else this.empty = false
          this.page += 1
          if (res.data.length < 10) this.finished = true
        } else {
          this.$toast.fail(res.msg || res.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'))
      } finally {
        this.loading = false
      }
    },
    async getTurnGoodList() {
      try {
        const res = await this.$api.mine.getTurnGoodList();
        if (res.code === 1) {
          const data = res.data
          this.awardList = data
          this.nameList = data.map(item => item.id === 7 ? this.$t('抽中现金10USDT') : item.name)
        } else {
          this.$toast.fail(res.msg || res.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('出现错误'));
      }
    },
    async getTurnNumList() {
      try {
        const res = await this.$api.mine.getTurnNumList();
        if (res.code === 1) {
          const data = res.data
          this.buyNumberList = data
        } else {
          this.$toast.fail(res.msg || res.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('出现错误'));
      }
    },
    async profile() {
      try {
        const resp = await this.$api.home.profile();
        if (resp.code === 1) {
          const data = resp.data
          this.drawNumber = data.turn_num ? data.turn_num : 0
        } else {
          this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      }
    },
    async handleBuy() {
      try {
        this.btnLoading = true
        const params = {
          price: +this.buyNumberList.find(item => +item.num === this.buyNumber).price
        }
        const res = await this.$api.mine.buyTurnNum(params);
        if (res.code === 1) {
          await this.profile()
          this.toBuy = false
          this.showResult = true
        } else {
          this.$toast.fail(res.msg || res.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('出现错误'));
      } finally {
        this.btnLoading = false
      }
    },
    async startTurn() {
      if (this.rolling) return
      try {
        this.rolling = true
        const res = await this.$api.mine.startTurn()
        if (res.code === 1) {
          const data = res.data
          await this.rotateAnimation(data)
        } else {
          this.$toast.fail(res.msg || res.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('出现错误'))
      }
    },
    async rotateAnimation({id, name}) {
      await this.profile()
      const index = this.awardList.findIndex(item => item.id === id)
      const random = Math.floor((Math.random() * 30)) - 15
      console.log(random)
      const lastDegree = (-index * 45) + random - 22.5
      await this.$nextTick()
      const img = this.$refs.rotateImg
      let degree = 0
      let degreeInterval = 1.8
      const timer = setInterval(() => {
        degree += degreeInterval
        img.style.transform = 'rotateZ(' + -degree + 'deg)'
        const currentDegree = img.style.transform.split('(')[1].split('d')[0]
        if ((currentDegree % 90 === 0 || currentDegree % 189 === 0 || currentDegree % 555 === 0 || currentDegree % 654 === 0) && currentDegree > -720) {
          degreeInterval -= 0.15
          degreeInterval = +degreeInterval.toFixed(2)
        }
        if (currentDegree <= -720) {
          if (currentDegree % 360 <= lastDegree) {
            clearInterval(timer)
            setTimeout(() => {
              this.awardName = name
              this.awardId = id
              this.visible = true
              this.rolling = false
              this.updateRecord()
            }, 500)
          }
        }
      }, 10)
    },
    updateRecord() {
      this.awardRecordList = []
      this.finished = false
      this.page = 1
      this.getAwardRecord()
    }
  },
}
</script>

<style scoped lang="less">
@keyframes rolling {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-600px);
  }
}

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
        width: 100px;
        height: 30px;
        font-family: PingFang-SC-Medium;
        font-size: 14px;
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

      .title-wrap__notice__box {
        height: 30px;
        overflow: hidden;
        position: relative;

        .title-wrap__notice__content {
          animation: rolling 40s infinite linear;
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

      .title-wrap__notice {
        width: calc(100% - 70px);
        margin: 0 auto;
        padding: 0 40px;
        height: 30px;
        font-family: PingFang-SC-Medium;
        font-size: 12px;
        line-height: 30px;
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

        .middle-text {
          color: #f6c327;
        }
      }
    }

    .draw-wrap {
      width: 333px;
      height: 333px;
      margin: 0 auto 20px;
      position: relative;
      overflow: hidden;

      .rotary-table {
        width: 333px;
        height: 333px;
      }

      .lottery-pointer {
        width: 97px;
        height: 129px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -61%);
        z-index: 999;
      }

      .award-list {

        .award-item {
          height: 120px;
          width: 120px;
          position: absolute;
          left: 50%;
          bottom: 50%;
          transform: translateX(-50%);
          transform-origin: center bottom;
          text-align: center;
          font-size: 12px;
          line-height: 50px;
          color: #7240ef;
          z-index: 99;
        }

        .whiteColor {
          color: #ffffff;
        }
      }

    }

    .draw-number {
      text-align: center;
      margin-bottom: 36px;

      &__desc {
        font-family: PingFang-SC-Medium;
        font-size: 16px;
        line-height: 16px;
        color: #ffffff;
        margin-bottom: 22px;
      }

      &__buy {
        margin: 0 auto;
        width: 168px;
        height: 36px;
        background-color: #ffbd1c;
        border-radius: 18px;
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        line-height: 36px;
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
        overflow: auto;

        .award-item {
          padding: 0 15px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          line-height: 49px;
          display: flex;
          justify-content: space-between;

          &__left {
            font-family: PingFang-SC-Bold;
            font-size: 14px;
            color: #ffbd1c;
          }

          &__right {
            font-family: PingFang-SC-Medium;
            font-size: 12px;
            color: #ffffff;
          }
        }

        .finish-text {
          font-family: PingFang-SC-Medium;
          font-size: 12px;
          line-height: 55px;
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
      color: #000000;
      line-height: 18px;
      margin-bottom: 37px;
      text-align: center;
    }

    .content-wrap {
      text-align: center;

      .draw-number-list {
        padding: 30px 15px;

        .draw-number-item {
          display: flex;
          justify-content: space-between;
          padding: 10px 15px;
          background: #f8f8f8;
          margin-bottom: 10px;
          border: solid 2px #f8f8f8;
          border-radius: 5px;
          font-family: PingFang-SC-Medium;
          font-size: 14px;
        }

        .active-item {
          border: solid 2px #fc6324;
          background-color: #ffefe9;
          position: relative;

          &::after {
            content: '';
            display: block;
            position: absolute;
            left: -1px;
            top: -1px;
            width: 23px;
            height: 23px;
            background: url("../../../assets/home/select-icon.png") no-repeat top center/100% 100%;
          }
        }
      }

      &__top {
        font-family: PingFang-SC-Medium;
        font-size: 14px;
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
        line-height: 1;
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
        line-height: 19px;
        color: #ffffff;
      }
    }
  }
}
</style>
