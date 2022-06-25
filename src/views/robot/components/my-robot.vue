<template>
  <div class="my-robot sub-page">
    <nav-bar :title="$t('我的机器人')"></nav-bar>
    <div class="container">
      <div class="robot-box">
        <div class="robot-item" v-for="item in robotList" :key="item.id">
          <div class="top-wrap">
            <span>{{ item.type }}</span>
            <span>{{ item.status }}</span>
          </div>
          <div class="middle-wrap">
            <span>{{ $t('购买时间') }}：{{ item.addtime }}</span>
            <span v-if="item.status === '已结算'" class="finished">{{ $t('已结算至机器余额') }}</span>
            <van-count-down :time="'time' | timeFormat(item)" format="DD天HH时mm分ss秒" v-else/>
          </div>
          <div class="bottom-wrap">
            <div class="left">
              <div class="top-text">{{ $t('购买金额') }}</div>
              <div class="bottom-text">R${{ item.num }}</div>
            </div>
            <div class="right">
              <div class="top-text">
                <span v-if="item.status === '已结算'">{{ $t('总收益') }}</span>
                <span v-else>{{ $t('预计收益') }}</span>
              </div>
              <div class="bottom-text">
                <span>R$</span>
                <span v-if="item.status === '已结算'">{{ item.real_num }}</span>
                <span v-else>{{ item.yuji_num }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "my-robot",
  data() {
    return {
      robotList: []
    }
  },
  filters: {
    timeFormat (value, item) {
      const currentTime = new Date().getTime()
      const endTime = new Date(item.endtime).getTime()
      const time = endTime - currentTime
      return time
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList () {
      try {
        this.loading = true
        const resp = await this.$api.robot.getList();
        if (resp.code === 1) {
          const data = resp.data
          this.robotList = data
        } else {
          this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped lang="less">
.container {
  padding: 20px 15px;
  height: calc(100% - 50px);
  overflow: auto;
  background: #f6d79b;
  .robot-box {
    .robot-item {
      margin-bottom: 15px;
      height: 165px;
      background-color: #ffffff;
      border-radius: 10px;
      padding: 25px 20px 15px;
    }
    .top-wrap {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      span:first-child {
        font-family: PingFang-SC-Bold;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 12px;
        letter-spacing: 0px;
        color: #333333;
      }
      span:last-child {
        font-family: PingFang-SC-Medium;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 12px;
        letter-spacing: 0px;
        color: #666666;
      }
    }
    .middle-wrap {
      display: flex;
      justify-content: space-between;
      span {
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 12px;
        letter-spacing: 0px;
        color: #999999;
        margin-bottom: 20px;
      }
      .van-count-down {
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 12px;
        letter-spacing: 0px;
        color: #999999;
        margin-bottom: 20px;
      }
    }
    .bottom-wrap {
      height: 65px;
      background-color: #2f2e33;
      border-radius: 10px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      text-align: center;

      .top-text {
        margin-bottom: 13px;
        font-family: PingFang-SC-Medium;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 12px;
        letter-spacing: 0px;
        color: #f6d79b;
      }
      .bottom-text {
        font-family: PingFang-SC-Bold;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 12px;
        letter-spacing: 0px;
        color: #f6d79b;
      }
    }

  }
}
</style>