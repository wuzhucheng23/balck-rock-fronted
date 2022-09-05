<template>
  <div class="sign-in sub-page">
    <div class="container">
      <div class="container__content">
        <div class="nav-bar-wrap">
          <van-icon name="arrow-left" @click="$router.back()"/>
          <span>{{ $t('签到') }}</span>
          <span class="activity-rules" @click="$utils.toRoute('SignInRules', '签到规则')">
            {{ $t('签到规则') }}
          </span>
        </div>
        <div class="sign-in-wrap">
          <div class="sign-in-wrap__title">{{ $t('连续签到领积分') }}</div>
          <div class="sign-in-wrap__content">
            <div class="sign-in-item" v-for="item in showList" :key="item.id"
                 :class="{'seven-item': item.id === 7}"
                 :style="[{background: item.isSignIn ? '#ffbf07' : '#f5f6fa'}]">
              <div class="sign-in-item__top">{{ item.title }}</div>
              <div class="sign-in-item__middle">
                <template v-if="item.id < 7">
                  <van-image :src="require('@/assets/home/sign-in-icon.png')" v-if="item.isSignIn"/>
                  <van-image :src="require('@/assets/home/non-sign-in-icon.png')" v-else/>
                </template>
                <div class="award" v-else>{{ item.value }}</div>
              </div>
              <div class="sign-in-item__bottom" style="color: #fff" v-if="item.isSignIn">
                {{ $t('已签到') }}
              </div>
              <div class="sign-in-item__bottom" style="color: #c7cdcb" v-else>
                {{ $t('未签到') }}
              </div>
            </div>
          </div>
          <div class="sign-in-wrap__btn">
            <van-button
                block
                loading-type="spinner"
                :loading="loading"
                :disabled="!!isSignIn"
                :loading-text="$t('正在签到...')"
                @click="handleSignIn">
              <span v-if="!isSignIn">{{ $t('点击签到') }}</span>
              <span v-else>{{ $t('已签到') }}</span>
            </van-button>
          </div>
        </div>
        <div class="record-wrap">
          <div class="record-wrap__title">{{ $t('签到记录') }}</div>
          <div class="record-wrap__content">
            <div class="record-item" v-for="item in signRecordList" :key="item.id">
              <div class="record-item__left">
                <van-image :src="require('@/assets/home/sign-in-icon.png')"/>
                <span>{{ $t('签到成功') }}</span>
              </div>
              <div class="record-item__right">
                <div class="award">{{ item.days | daysFilter(signList) }}</div>
                <div class="time">{{ item.create_time }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-dialog
        v-model="visible"
        width="295px"
        close-on-click-overlay
        :show-confirm-button="false">
      <div class="dialog-container">
        <van-image :src="require('@/assets/home/sign-in-star.png')" class="sign-in-star"/>
        <div class="dialog-container__title">
          {{ $t('签到成功') }}
        </div>
        <div class="dialog-container__content">
          <div class="image">
            <van-image :src="require('@/assets/home/sign-dialog-image.png')"/>
          </div>
          <div class="text">{{ $t('恭喜你获得') }}</div>
          <div class="award">{{ awardName }}</div>
        </div>
        <div class="dialog-container__btn">
          <van-button block @click="visible = false">
            <span>{{ $t('确认') }}</span>
          </van-button>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
export default {
  name: "SignIn",
  data() {
    const signList = [
      {
        id: 1,
        title: this.$t('第1天'),
        isSignIn: false,
        value: this.$t('现金0.5USDT')
      },
      {
        id: 2,
        title: this.$t('第2天'),
        isSignIn: false,
        value: this.$t('FB任务两个')
      },
      {
        id: 3,
        title: this.$t('第3天'),
        isSignIn: false,
        value: this.$t('tiktok任务两个')
      },
      {
        id: 4,
        title: this.$t('第4天'),
        isSignIn: false,
        value: this.$t('instagram任务两个')
      },
      {
        id: 5,
        title: this.$t('第5天'),
        isSignIn: false,
        value: this.$t('youtube任务两个')
      },
      {
        id: 6,
        title: this.$t('第6天'),
        isSignIn: false,
        value: this.$t('任务助手15天')
      },
      {
        id: 7,
        title: this.$t('第7天'),
        isSignIn: false,
        value: this.$t('现金2.5USDT')
      },
    ]
    return {
      signList,
      visible: false,
      signNumber: 0,
      loading: false,
      awardName: '',
      isSignIn: 0,
      signRecordList: [],
    }
  },
  computed: {
    showList() {
      return this.signList.map(item => {
        item.isSignIn = item.id <= this.signNumber
        return item
      })
    }
  },
  filters: {
    daysFilter(value, signList) {
      return signList.find(item => item.id === value).value;
    }
  },
  created() {
    this.profile()
    this.getSignRecord()
  },
  methods: {
    async profile() {
      try {
        const resp = await this.$api.home.profile();
        if (resp.code === 1) {
          const data = resp.data
          this.signNumber = data.sign_num ? data.sign_num : 0
          this.isSignIn = data.is_sign
        } else {
          this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      }
    },
    async getSignRecord() {
      try {
        const resp = await this.$api.mine.getSignRecord();
        if (resp.code === 1) {
          const data = resp.data
          this.signRecordList = data
        } else {
          this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      }
    },
    async handleSignIn() {
      try {
        this.loading = true
        const resp = await this.$api.mine.sign();
        if (resp.code === 1) {
          this.awardName = this.signList.find(item => item.id === (this.signNumber + 1)).value
          this.visible = true
          await this.profile()
          await this.getSignRecord()
        } else {
          this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      } finally {
        this.loading = false
      }
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

    .sign-in-wrap {
      width: calc(100% - 30px);
      padding: 15px;
      background-color: #ffffff;
      border-radius: 10px;
      margin: 0 auto 15px;

      &__title {
        font-family: PingFang-SC-Bold;
        font-size: 16px;
        line-height: 16px;
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
          background-color: #ffbf07;
          border-radius: 5px;
          padding: 8px;
          text-align: center;

          &__top {
            font-family: PingFang-SC-Medium;
            font-size: 12px;
            line-height: 12px;
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
            line-height: 10px;
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
            line-height: 32px;
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
          line-height: 19px;
          color: #ffffff;
        }
      }
    }

    .record-wrap {
      width: calc(100% - 30px);
      margin: 0 auto;
      padding: 20px 0;
      background-color: #ffffff;
      border-radius: 10px;

      &__title {
        font-family: PingFang-SC-Bold;
        font-size: 16px;
        line-height: 16px;
        color: #333333;
        margin-bottom: 19px;
        padding-left: 15px;
      }

      &__content {
        height: 275px;
        overflow: auto;

        .record-item {
          padding: 0 15px;
          height: 55px;
          background-color: #f6f6f6;
          border-radius: 5px;
          margin-bottom: 8px;
          margin-left: 15px;
          margin-right: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          &__left {
            display: flex;
            align-items: center;
            flex: 1;

            .van-image {
              width: 32px;
              height: 32px;
              margin-right: 9px;
            }

            span {
              font-family: PingFang-SC-Bold;
              font-size: 16px;
              line-height: 19px;
              color: #333333;
            }
          }

          &__right {
            text-align: right;

            .award {
              font-family: PingFang-SC-Bold;
              font-size: 14px;
              line-height: 14px;
              color: #ff9d09;
              margin-bottom: 7px;
            }

            .time {
              font-family: PingFang-SC-Medium;
              font-size: 12px;
              line-height: 12px;
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
        color: #000000;
        line-height: 14px;
        margin-bottom: 15px;
      }

      .award {
        font-family: PingFang-SC-Bold;
        font-size: 18px;
        line-height: 18px;
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
        line-height: 19px;
        color: #ffffff;
      }
    }
  }
}
</style>
