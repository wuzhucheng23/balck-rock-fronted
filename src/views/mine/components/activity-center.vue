<template>
  <div class="activity-center sub-page">
    <nav-bar :title="$t('活动中心')"/>
    <div class="container">
      <div class="activity-box">
<!--        <div class="activity-item" @click="$utils.toRoute('RotaryLottery', '转盘抽奖')">-->
<!--          <van-image :src="require('@/assets/home/lottery-activity-image.png')"/>-->
<!--        </div>-->
        <div class="activity-item" @click="$utils.toRoute('SignIn', '每日签到')">
          <van-image :src="require('@/assets/home/sign-in-activity-image.png')"/>
        </div>
        <div class="activity-item"
             v-for="item in activityList"
             :key="item.id"
             @click="$utils.toRoute('ActivityDetail', '活动详情', { id: item.id })">
          <van-image :src="item.img"/>
          <div class="text" v-html="item.title"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ActivityCenter",
  data() {
    return {
      activityList: []
    }
  },
  created() {
    this.activitys()
  },
  methods: {
    async activitys() {
      try {
        const resp = await this.$api.mine.activitys();
        if (resp.code === 1) {
          const data = resp.data
          this.activityList = data.list
        } else {
          this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      }
    }
  },
}
</script>

<style scoped lang="less">
.container {
  height: calc(100% - 50px);
  padding: 29px 15px 15px;
  overflow: auto;

  .activity-box {
    .activity-item {
      position: relative;
      margin-bottom: 15px;
      border-radius: 10px;
      overflow: hidden;
    }

    .text {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 30px;
      background-color: #000000;
      opacity: 0.6;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 0 15px;
      line-height: 30px;
      font-family: PingFang-SC-Medium;
      font-size: 14px;
      color: #ffffff;
    }
  }
}
</style>
