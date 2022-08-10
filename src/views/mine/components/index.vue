<template>
  <div class="index main-page">
    <div class="container">
      <div class="info-box">
        <div class="people-info" @click="handleToVipIntroduce">
          <van-image :src="headpic" class="headpic"></van-image>
          <div class="right-wrap">
            <div class="name">{{ username }}</div>
<!--            <div class="code" @click="handleCopy">+<span ref="code">{{ phone }}</span></div>-->
<!--            <div class="code"><span ref="code">{{ phone }}</span></div>-->
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
          <van-image :src="require('@/assets/mine/refresh-icon.png')"></van-image>
        </div>
      </div>
      <div class="earning-box">
        <div class="top-box">
          <van-grid
              :column-num="3"
              icon-size="33px">
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
<!--        <div class="bottom-box">-->
<!--          <van-grid-->
<!--              :column-num="3"-->
<!--              icon-size="33px">-->
<!--            <van-grid-item-->
<!--                v-for="item in bottomGridList"-->
<!--                :key="item.title"-->
<!--                :icon="item.icon"-->
<!--                @click="handleToOrder(item)">-->
<!--              <template #text>-->
<!--                <div class="title">{{ item.title }}</div>-->
<!--                <div class="value">{{ item.value }}</div>-->
<!--              </template>-->
<!--            </van-grid-item>-->
<!--          </van-grid>-->
<!--        </div>-->
      </div>
      <div class="operation-box">
        <van-grid
            clickable
            :column-num="4"
            icon-size="44px"
            :border="false">
          <van-grid-item
              v-for="item in gridList"
              :key="item.text"
              :icon="item.icon"
              :text="item.text"
              @click="handleToRoute(item)"/>
        </van-grid>
      </div>
      <div class="mine-box">
        <div class="top-box">
          <van-cell
              v-for="item in topCellList"
              :key="item.title"
              :icon="item.icon"
              :title="item.title"
              is-link
              @click="handleToRoute(item)"/>
        </div>
<!--        <div class="bottom-box">-->
<!--          <van-cell-->
<!--              v-for="item in bottomCellList"-->
<!--              :key="item.title"-->
<!--              :icon="item.icon"-->
<!--              :title="item.title"-->
<!--              is-link-->
<!--              @click="handleToRoute(item)"/>-->
<!--        </div>-->
      </div>
      <div class="btn-box">
        <van-button block @click="handleLogout">{{ $t('退出登陆') }}</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
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
        name: 'orderRecode',
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
        icon: require('@/assets/mine/order-icon.png'),
        title: this.$t('任务收益'),
        value: '$0.00',
        name: 'orderRecode',
        label: '订单记录'
      },
      // {
      //   icon: require('@/assets/mine/earn-icon.png'),
      //   title: this.$t('收益'),
      //   value: '$0.00',
      // },
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
    const gridList = [
      {
        icon: require('@/assets/home/recharge-icon.png'),
        text: this.$t('充值'),
        name: 'recharge',
        label: '充值'
      },
      {
        icon: require('@/assets/home/withdraw-icon.png'),
        text: this.$t('提现'),
        name: 'withdraw',
        label: '提现'
      },
      {
        icon: require('@/assets/home/wallet-icon.png'),
        text: this.$t('钱包'),
        name: 'wallet',
        label: '钱包'
      },
      {
        icon: require('@/assets/home/invitation-icon.png'),
        text: this.$t('邀请'),
        name: 'inviteFriend',
        label: '邀请好友'
      },
      {
        icon: require('@/assets/home/team-icon.png'),
        text: this.$t('团队'),
        name: 'myTeam',
        label: '团队'
      },
      {
        icon: require('@/assets/home/introduction-icon.png'),
        text: this.$t('简介'),
        name: 'introduction',
        label: '简介'
      },
      {
        icon: require('@/assets/home/help-icon.png'),
        text: this.$t('帮助'),
        name: 'help',
        label: '帮助'
      },
      {
        icon: require('@/assets/home/activity-icon.png'),
        text: this.$t('活动'),
        name: 'activity',
        label: '活动'
      }
    ]
    const topCellList = [
      // {
      //   icon: require('@/assets/mine/invite-friend.png'),
      //   title: this.$t('邀请好友'),
      //   name: 'inviteFriend',
      //   label: '邀请好友',
      // },
      // {
      //   icon: require('@/assets/mine/my-team.png'),
      //   title: this.$t('我的团队'),
      //   name: 'myTeam',
      //   label: '我的团队',
      // },
      {
        icon: require('@/assets/mine/my-team.png'),
        title: this.$t('任务助手'),
        name: 'hallIndex',
        label: '任务助手'
      },
      {
        icon: require('@/assets/mine/deposit-record.png'),
        title: this.$t('押金管理'),
        name: 'depositManage',
        label: '押金管理'
      },
      {
        icon: require('@/assets/mine/order-record.png'),
        title: this.$t('订单记录'),
        name: 'orderRecode',
        label: '订单记录'
      },
      {
        icon: require('@/assets/mine/earning-recode.png'),
        title: this.$t('帐变记录'),
        name: 'earningRecode',
        label: '收益记录'
      },
      {
        icon: require('@/assets/mine/set-icon.png'),
        title: this.$t('相关设置'),
        name: 'settingUp',
        label: '设置'
      },
    ]
    const bottomCellList = [
      // {
      //   icon: require('@/assets/mine/card-icon.png'),
      //   title: this.$t('银行账户'),
      //   name: 'bankAccount',
      //   label: '银行账户'
      // },
      // {
      //   icon: require('@/assets/mine/address-icon.png'),
      //   title: this.$t('收货地址'),
      //   name: 'shippingAddress',
      //   label: '收货地址'
      // },
      // {
      //   icon: require('@/assets/mine/people-certification.png'),
      //   title: this.$t('个人认证'),
      //   name: 'personalCertificate',
      //   label: '个人认证'
      // },
      // {
      //   icon: require('@/assets/mine/deposit-record.png'),
      //   title: this.$t('押金记录'),
      //   name: 'depositRecord',
      //   label: '押金记录'
      // },
      // {
      //   icon: require('@/assets/mine/deposit-record.png'),
      //   title: this.$t('押金管理'),
      //   name: 'depositManage',
      //   label: '押金管理'
      // },
      // {
      //   icon: require('@/assets/mine/set-icon.png'),
      //   title: this.$t('相关设置'),
      //   name: 'settingUp',
      //   label: '设置'
      // },
    ]
    return {
      topGridList,
      bottomGridList,
      gridList,
      topCellList,
      bottomCellList,
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
    handleToOrder (item) {
      if (item.name === 'orderRecode') {
        this.$router.push({
          name: 'orderRecode',
          label: '订单记录'
        })
      }
    },
    handleToVipIntroduce () {
      this.$router.push({
        name: 'vipIntroduce',
        label: 'vip介绍'
      })
    },
    handleLogout() {
      localStorage.removeItem('token')
      this.$toast.success(this.$t('退出登陆成功'))
      this.$utils.delayPush('loginIndex', '登陆')
    },
    async profile() {
      try {
        this.loading = true
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
      } finally {
        this.loading = false
      }
    },
    async userCount() {
      try {
        this.loading = true
        const resp = await this.$api.mine.userCount();
        if (resp.code === 1) {
          const data = resp.data
          this.topGridList[0].value = data.teamAll
          this.topGridList[1].value = data.teamYes
          this.topGridList[2].value = data.teamToday
          this.topGridList[3].value = data.order_profit
          this.topGridList[4].value = data.team_profit
          this.topGridList[5].value = data.total
          // this.bottomGridList[0].value = data.order_profit
          // this.bottomGridList[1].value = data.robot_profit
          // this.bottomGridList[2].value = data.team_profit
          // this.bottomGridList[3].value = data.total
        } else {
          this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      } finally {
        this.loading = false
      }
    },
    handleToRoute(item) {
      this.$router.push({
        name: item.name,
        label: item.label
      })
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
      this.bottomGridList[0].value = '0.00'
      this.bottomGridList[2].value = '0.00'
      this.bottomGridList[3].value = '0.00'
      this.init()
    },
    handleCopy() {
      this.$utils.copy(this.$refs.code)
      this.$toast(this.$t('复制邀请码成功'))
    },
    handleCopyUid() {
      this.$utils.copy(this.$refs.uid)
      this.$toast(this.$t('复制UID成功'))
    }
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
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
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
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #201711;
          text-align: center;
          line-height: 18px;
        }
      }
    }

    .uid-more {
      border-radius: 5px;
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
        font-stretch: normal;
        letter-spacing: 0px;
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
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
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
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #999999;
          line-height: 9px;
          margin-bottom: 11px;
        }

        .value {
          font-family: PingFang-SC-Bold;
          font-size: 15px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
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
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #999999;
        line-height: 9px;
        margin-bottom: 8px;
        text-align: center;
        //overflow: hidden;
        //text-overflow: ellipsis;
        //white-space: nowrap;
      }

      .value {
        font-family: PingFang-SC-Bold;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
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
    ::v-deep .van-grid-item__icon img{
      width: 54px;
      height: 54px;
    }
    ::v-deep .van-grid-item__text {
      font-family: PingFang-SC-Bold;
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
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
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
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
