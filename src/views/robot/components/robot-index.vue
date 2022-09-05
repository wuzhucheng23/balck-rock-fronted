<template>
  <div class="index main-page">
    <div class="container">
      <div class="info-box">
        <div class="title">{{ $t('存币生息') }}</div>
        <div class="content">
          <div class="content-item" @click="$utils.toRoute('MyRobot', '我的机器人')">
            <div class="left-wrap">
              <div class="title">{{ $t('历史记录') }}</div>
              <div class="more">{{ $t('查看') }}</div>
            </div>
            <van-image :src="require('@/assets/robot/my-robot.png')"/>
          </div>
          <div class="content-item" @click="$utils.toRoute('MineIndex', '我的首页')">
            <div class="left-wrap">
              <div class="title">{{ $t('我的余额') }}</div>
              <div class="more">{{ $t('查看') }}</div>
            </div>
            <van-image :src="require('@/assets/robot/my-money.png')"/>
          </div>
        </div>
        <div class="btn">
          <div class="text">{{ $t('我的资产') }}：<span>${{ balance }}</span></div>
          <div class="more">
            <van-button @click="$utils.toRoute('RobotWithdraw', '机器人提现')">
              <span>{{ $t('转到余额') }}</span>
            </van-button>
            <van-button @click="$utils.toRoute('RobotDeposit', '机器人转入')">
              <span>{{ $t('转入') }}</span>
            </van-button>
          </div>
        </div>
      </div>
      <div class="robot-box">
        <div
            class="robot-item"
            v-for="item in robotList"
            :key="item.angleText" :style="{ backgroundColor: item.background }"
            @click="handleToBuy(item)">
          <div class="angle">
            <van-image :src="item.angleIcon"/>
            <span class="angle-text">{{ item.angleText }}</span>
          </div>
          <div class="title">{{ item.name }}</div>
          <div class="value">${{ item.min_num + '-' + item.max_num }}</div>
          <div class="bottom-wrap">
            <div class="earnings">
              <div class="text">{{ $t('收益') }}</div>
              <div>{{ (item.bili * 100).toFixed(0) }}%</div>
            </div>
            <div class="day">
              <div class="text">{{ $t('天数') }}</div>
              <div>{{ item.day }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RobotIndex",
  data() {
    const robotList = [
      {
        angleText: this.$t('方案') + '1',
        angleIcon: require('@/assets/robot/angle-one.png'),
        title: '普通',
        value: '0%',
        earnings: 0,
        day: 0,
        background: '#f1d8a2',
        min_num: 0,
        max_num: 0,
        bili: 0,
      },
      {
        angleText: this.$t('方案') + '2',
        angleIcon: require('@/assets/robot/angle-two.png'),
        title: '普通',
        value: '$0.00',
        earnings: '0%',
        day: 0,
        background: '#f0d3b5',
        min_num: 0,
        max_num: 0,
        bili: 0,
      },
      {
        angleText: this.$t('方案') + '3',
        angleIcon: require('@/assets/robot/angle-three.png'),
        title: '普通',
        value: '0.00',
        earnings: '0%',
        day: 0,
        background: '#f1b7a9',
        min_num: 0,
        max_num: 0,
        bili: 0,
      },
      {
        angleText: this.$t('方案') + '4',
        angleIcon: require('@/assets/robot/angle-four.png'),
        title: '普通',
        value: '$0',
        earnings: '0%',
        day: 0,
        background: '#c9abf1',
        min_num: 0,
        max_num: 0,
        bili: 0,
      },
      {
        angleText: this.$t('方案') + '5',
        angleIcon: require('@/assets/robot/angle-five.png'),
        title: '普通',
        value: '$0.00',
        earnings: '0%',
        day: 0,
        background: '#9fe4eb',
        min_num: 0,
        max_num: 0,
        bili: 0,
      },
      {
        angleText: this.$t('方案') + '6',
        angleIcon: require('@/assets/robot/angle-six.png'),
        title: '普通',
        value: '$0.00',
        earnings: '0%',
        day: 0,
        background: '#aeeab4',
        min_num: 0,
        max_num: 0,
        bili: 0,
      },
    ]
    return {
      robotList,
      loading: false,
      balance: '0.00'
    }
  },
  created() {
    this.getRobotList()
  },
  methods: {
    async getRobotList() {
      try {
        const resp = await this.$api.robot.robotList();
        if (resp.code === 1) {
          const data = resp.data
          this.balance = data.balance
          data.list.forEach((item, index) => {
            item.background = this.robotList[index].background
            item.angleText = this.robotList[index].angleText
            item.angleIcon = this.robotList[index].angleIcon
          })
          this.robotList = data.list
          console.log(data)
        } else {
          this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      }
    },
    handleToBuy(item) {
      this.$router.push({
        name: 'RobotDetail',
        label: '机器人详情',
        query: {
          id: item.id,
          title: item.angleText
        }
      })
    }
  },
}
</script>

<style scoped lang="less">
.container {
  .info-box {
    height: 188px;
    background: url("../../../assets/robot/robot-bk.png") no-repeat center/cover;
    padding-top: 17px;
    margin-bottom: 36px;

    .title {
      font-family: PingFang-SC-Medium;
      font-size: 18px;
      line-height: 18px;
      color: #563608;
      margin-bottom: 33px;
      text-align: center;
      white-space: nowrap;
    }

    .content {
      display: flex;
      justify-content: space-evenly;
      margin-bottom: 14px;

      .content-item {
        width: calc((100% - 45px) / 2);
        height: 86px;
        background-color: #ffffff;
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 12px 0 15px;

        .left-wrap {
          text-align: left;

          .title {
            font-family: PingFang-SC-Bold;
            font-size: 14px;
            color: #333333;
            position: relative;
            top: 14px;
          }

          .more {
            font-family: PingFang-SC-Medium;
            font-size: 12px;
            color: #999999;
            position: relative;
            bottom: 14px
          }
        }

        .van-image {
          width: 62px;
          height: 62px;
        }
      }
    }

    .btn {
      margin: 0 15px;
      border-radius: 5px;
      overflow: hidden;
      height: 43px;
      background: url("../../../assets/robot/btn-bk.png");
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 15px;

      .text {
        font-family: PingFang-SC-Medium;
        font-size: 12px;
        color: #ebd4a8;
      }

      .more {
        display: flex;

        .van-button {
          height: 20px;
          background-color: #ebd4a8;
          border-radius: 10px;
          padding: 0;
          font-family: PingFang-SC-Medium;
          font-size: 11px;
          line-height: 20px;
          color: #333333;
          width: 97px;
          margin-left: 10px;
          border-color: #ebd4a8;
        }
      }
    }
  }

  .robot-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

    .robot-item {
      width: calc((100% - 45px) / 2);
      border-radius: 5px;
      margin-bottom: 15px;
      position: relative;
      padding: 32px 10px 10px;
      background: url("../../../assets/robot/robot-icon.png") no-repeat right 10px top 13px/63px 58px;

      .angle {
        width: 70px;
        height: 22px;
        border-radius: 5px 0px 2px 0px;

        position: absolute;
        left: 0;
        top: 0;
        z-index: 99;

        .van-image {
          width: 100%;
          height: 100%;
        }

        .angle-text {
          position: absolute;
          left: 8px;
          top: 6px;
          font-family: PingFang-SC-Medium;
          font-size: 10px;
          line-height: 12px;
          color: #ffffff;
        }
      }

      .title {
        padding-left: 5px;
        font-family: PingFang-SC-Bold;
        font-size: 14px;
        color: #333333;
        line-height: 14px;
        margin-bottom: 4px;
      }

      .value {
        font-family: PingFang-SC-Medium;
        font-size: 12px;
        color: #ffffff;
        line-height: 12px;
        padding-left: 5px;
        margin-bottom: 10px;
      }

      .bottom-wrap {
        height: 60px;
        background-color: #ffffff;
        border-radius: 5px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-family: PingFang-SC-Medium;
        font-size: 12px;
        color: #333333;
        line-height: 12px;
        position: relative;
        text-align: center;

        .text {
          margin-bottom: 10px;
        }

        &::after {
          content: '';
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
    }
  }
}
</style>
