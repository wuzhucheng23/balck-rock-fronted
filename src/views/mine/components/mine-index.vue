<template>
  <div class="index main-page">
    <div class="container">
      <div class="info-box">
        <div class="people-info" @click="$utils.toRoute('VipIntroduce', 'vip介绍')">
          <van-image :src="headpic" class="headpic"/>
          <div class="right-wrap">
            <div class="name">{{ username }}</div>
          </div>
        </div>
        <div class="uid-more">
          <div class="text">UID：<span ref="uid">{{ uid }}</span></div>
          <div class="more" @click="handleCopyUid">{{ $t('复制') }}</div>
        </div>
        <div class="money-integral">
          <div class="money-wrap">
            <div class="title">{{ $t('余额') }}</div>
            <div class="value">${{ balance }}</div>
          </div>
          <div class="integral-wrap">
            <div class="title">{{ $t('未完成任务') }}</div>
            <div class="value">{{ task - dealCount }}</div>
          </div>
        </div>
        <div class="refresh" @click="handleRefresh">
          <van-image :src="require('@/assets/mine/refresh-icon.png')"/>
        </div>
      </div>
      <div class="earning-box">
        <div class="top-box">
          <van-grid
              icon-size="33px"
              :column-num="3">
            <van-grid-item
                v-for="item in topGridList"
                :key="item.title"
                :icon="item.icon">
              <template #text>
                <div class="title">{{ item.title }}</div>
                <div class="value">{{ item.value }}</div>
              </template>
            </van-grid-item>
          </van-grid>
        </div>
      </div>
      <div class="operation-box">
        <van-grid
            clickable
            icon-size="44px"
            :column-num="4"
            :border="false">
          <van-grid-item
              v-for="item in bottomGridList"
              :key="item.text"
              :icon="item.icon"
              :text="item.text"
              @click="$utils.toRoute(item.name, item.label)"
          />
        </van-grid>
      </div>
      <div class="mine-box">
        <div class="top-box">
          <van-cell
              v-for="item in cellList"
              :key="item.title"
              :icon="item.icon"
              :title="item.title"
              is-link
              @click="$utils.toRoute(item.name, item.label)"/>
        </div>
      </div>
      <div class="btn-box">
        <van-button block @click="handleLogout">
          <span>{{ $t('退出登陆') }}</span>
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MineIndex",
  data() {
    const topGridList = [
      {
        icon: require('@/assets/mine/team-people.png'),
        title: this.$t('团队人数'),
        value: '$0.00',
      },
      {
        icon: require('@/assets/mine/yestoday-add-icon.png'),
        title: this.$t('昨日新增'),
        value: '$0.00',
      },
      {
        icon: require('@/assets/mine/today-add-icon.png'),
        title: this.$t('今日新增'),
        value: '$0.00',
      },
      {
        icon: require('@/assets/mine/order-icon.png'),
        title: this.$t('任务收益'),
        value: '$0.00',
        name: 'OrderRecode',
        label: '订单记录'
      },
      {
        icon: require('@/assets/mine/team-earn-icon.png'),
        title: this.$t('团队返佣'),
        value: '$0.00',
      },
      {
        icon: require('@/assets/mine/sum-icon.png'),
        title: this.$t('总收益'),
        value: '$0.00',
      },
    ]
    const bottomGridList = [
      {
        icon: require('@/assets/home/recharge-icon.png'),
        text: this.$t('充值'),
        name: 'AccountRecharge',
        label: '账户充值'
      },
      {
        icon: require('@/assets/home/withdraw-icon.png'),
        text: this.$t('提现'),
        name: 'AccountWithdraw',
        label: '账户提现'
      },
      {
        icon: require('@/assets/home/wallet-icon.png'),
        text: this.$t('钱包'),
        name: 'WalletManage',
        label: '钱包管理'
      },
      {
        icon: require('@/assets/home/invitation-icon.png'),
        text: this.$t('邀请'),
        name: 'InviteFriend',
        label: '邀请好友'
      },
      {
        icon: require('@/assets/home/team-icon.png'),
        text: this.$t('团队'),
        name: 'MyTeam',
        label: '我的团队'
      },
      {
        icon: require('@/assets/home/introduction-icon.png'),
        text: this.$t('简介'),
        name: 'CompanyIntroduction',
        label: '公司简介'
      },
      {
        icon: require('@/assets/home/help-icon.png'),
        text: this.$t('帮助'),
        name: 'ProblemHelp',
        label: '问题帮助'
      },
      {
        icon: require('@/assets/home/activity-icon.png'),
        text: this.$t('活动'),
        name: 'ActivityCenter',
        label: '活动中心'
      }
    ]
    const cellList = [
      {
        icon: require('@/assets/mine/deposit-record.png'),
        title: this.$t('押金管理'),
        name: 'DepositManage',
        label: '押金管理'
      },
      {
        icon: require('@/assets/mine/order-record.png'),
        title: this.$t('订单记录'),
        name: 'OrderRecode',
        label: '订单记录'
      },
      {
        icon: require('@/assets/mine/earning-recode.png'),
        title: this.$t('帐变记录'),
        name: 'EarningRecode',
        label: '收益记录'
      },
      {
        icon: require('@/assets/mine/set-icon.png'),
        title: this.$t('相关设置'),
        name: 'SettingUp',
        label: '设置'
      },
    ]
    return {
      topGridList,
      bottomGridList,
      cellList,
      username: '',
      balance: '',
      inviteCode: '',
      headpic: '',
      uid: '',
      auto: '0.00',
      manual: '0.00',
      orderProfit: '0.00',
      robotProfit: '0.00',
      teamProfit: '0.00',
      total: '0.00',
      task: 0,
      dealCount: 0,
      phone: ''
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.profile()
      this.userCount()
    },
    async profile() {
      try {
        const resp = await this.$api.mine.profile();
        if (resp.code === 1) {
          const data = resp.data
          this.username = data.username
          this.inviteCode = data.invite_code
          this.uid = data.id
          this.headpic = data.headpic
          this.balance = data.balance
          this.task = data.task
          this.dealCount = data.deal_count
          this.phone = data.phone ? data.phone : '00000000000'
        } else {
          this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      }
    },
    async userCount() {
      try {
        const resp = await this.$api.mine.userCount();
        if (resp.code === 1) {
          const data = resp.data
          this.topGridList[0].value = data.teamAll
          this.topGridList[1].value = data.teamYes
          this.topGridList[2].value = data.teamToday
          this.topGridList[3].value = data.order_profit
          this.topGridList[4].value = data.team_profit
          this.topGridList[5].value = data.total
        } else {
          this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      }
    },
    handleRefresh() {
      this.username = ''
      this.headpic = ''
      this.inviteCode = ''
      this.uid = ''
      this.balance = '0.00'
      this.balance = '0.00'
      this.topGridList[0].value = '0.00'
      this.topGridList[1].value = '0.00'
      this.topGridList[2].value = '0.00'
      this.topGridList[3].value = '0.00'
      this.topGridList[4].value = '0.00'
      this.topGridList[5].value = '0.00'
      this.init()
    },
    handleCopyUid() {
      this.$utils.copy(this.$refs.uid)
      this.$toast(this.$t('复制UID成功'))
    },
    handleLogout() {
      localStorage.removeItem('token')
      this.$toast.success(this.$t('退出登陆成功'))
      this.$utils.delayPush('LoginIndex', '登陆')
    },
  },
}
</script>

<style scoped lang="less">
.index {
  background: #f9f9f7;
}

.container {
  background: #f9f9f7;

  .info-box {
    height: 140px;
    background-image: linear-gradient(90deg, #e5cb9a 0%, #e5cb9a 100%), linear-gradient(#efd8ac, #efd8ac);
    background-blend-mode: normal, normal;
    padding: 50px 15px 0;
    position: relative;
    margin-bottom: 121px;

    .people-info {
      display: flex;
      margin-bottom: 22px;

      .van-image {
        width: 55px;
        height: 55px;
        margin-right: 12px;
        border-radius: 50%;
        overflow: hidden;
      }

      .right-wrap {
        .name {
          font-family: PingFang-SC-Bold;
          font-size: 12px;
          color: #201711;
          line-height: 55px;
        }

        .code {
          width: 121px;
          height: 18px;
          border-radius: 9px;
          border: solid 1px #201711;
          font-family: PingFang-SC-Medium;
          font-size: 12px;
          color: #201711;
          text-align: center;
          line-height: 18px;
        }
      }
    }

    .uid-more {
      border-radius: 10px;
      overflow: hidden;
      height: 43px;
      background: url("../../../assets/robot/btn-bk.png");
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 15px;
      margin-bottom: 12px;

      .text {
        font-family: PingFang-SC-Medium;
        font-size: 12px;
        color: #ebd4a8;
        font-weight: bold;
      }

      .more {
        width: 59px;
        height: 20px;
        background-color: #ebd4a8;
        border-radius: 10px;
        text-align: center;
        font-family: PingFang-SC-Medium;
        font-size: 11px;
        line-height: 20px;
        color: #333333;

      }
    }

    .money-integral {
      display: flex;
      justify-content: space-between;

      .money-wrap, .integral-wrap {
        width: calc((100% - 15px) / 2);
        height: 67px;
        background-color: #ffffff;
        border-radius: 5px;
        padding-top: 17px;
        padding-left: 15px;

        .title {
          font-family: PingFang-SC-Bold;
          font-size: 9px;
          color: #999999;
          line-height: 9px;
          margin-bottom: 11px;
        }

        .value {
          font-family: PingFang-SC-Bold;
          font-size: 15px;
          color: #333333;
          line-height: 15px;
        }
      }

      .money-wrap {
        background: #ffffff url("../../../assets/mine/money-icon.png") no-repeat right bottom/48px 26px;
      }

      .integral-wrap {
        background: #ffffff url("../../../assets/mine/integral-icon.png") no-repeat right bottom/48px 26px;
      }
    }

    .refresh {
      position: absolute;
      right: 15px;
      top: 28px;
      z-index: 99;

      .van-image {
        width: 20px;
        height: 17px;
      }
    }
  }

  .earning-box {
    margin-bottom: 12px;
    padding: 0 15px;

    .top-box, .bottom-box {
      border-radius: 5px;
      overflow: hidden;

      ::v-deep .van-grid-item__content {
        padding: 13px 0px;
      }

      ::v-deep .van-grid-item__icon {
        margin-bottom: 4px;
      }

      .title {
        font-family: PingFang-SC-Bold;
        font-size: 9px;
        color: #999999;
        line-height: 9px;
        margin-bottom: 8px;
        text-align: center;
      }

      .value {
        font-family: PingFang-SC-Bold;
        font-size: 14px;
        color: #ca833a;
        line-height: 14px;
      }
    }

    .top-box {
      margin-bottom: 12px;
    }
  }

  .operation-box {
    padding: 0 15px;
    margin-bottom: 12px;
    border-radius: 5px;
    overflow: hidden;

    ::v-deep .van-grid-item__icon img {
      width: 54px;
      height: 54px;
    }

    ::v-deep .van-grid-item__text {
      font-family: PingFang-SC-Bold;
      font-size: 12px;
      color: #333333;
      text-align: center;
    }

    ::v-deep .van-grid-item__content {
      padding: 16px 6px;
    }
  }

  .mine-box {
    padding-bottom: 12px;

    .top-box, .bottom-box {
      padding: 0 15px;

      .van-cell {
        height: 47px;
        background-color: #ffffff;
        border-radius: 5px 5px 0px 0px;
        margin-bottom: 1.5px;

        &::after {
          display: none;
        }
      }

      .van-icon img {
        width: 25px;
        height: 25px;
        margin-right: 21px;
      }

      ::v-deep .van-cell__title {
        font-family: PingFang-SC-Bold;
        font-size: 12px;
        color: #333333;
        line-height: 27px;
      }

      ::v-deep .van-cell__right-icon {
        color: #ccc;
      }
    }

    .top-box {
      margin-bottom: 12px;
    }
  }

  .btn-box {
    padding: 0 15px;
    margin-bottom: 15px;

    .van-button {
      border-radius: 5px;
      height: 48px;
      background: #e6e6e6;
      color: #999;
      font-family: PingFang-SC-Bold;
      font-size: 12px;
      border-color: #e6e6e6;
    }
  }
}
</style>
