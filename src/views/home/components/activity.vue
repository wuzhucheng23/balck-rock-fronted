<template>
  <div class="activity sub-page">
    <nav-bar :title="$t('活动中心')"></nav-bar>
    <div class="container">
      <div class="activity-box">
        <div class="activity-item" v-for="item in activityList" :key="item.id" @click="handleToDetail(item)">
          <van-image :src="item.img"></van-image>
          <div class="text" v-html="item.title"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "activity",
  data() {
    return {
      activityList: []
    }
  },
  created() {
    this.activitys()
  },
  methods: {
    handleToDetail (item) {
      this.$router.push({
        name: 'activityDetail',
        label: '活动详情',
        query: {
          id: item.id
        }
      })
    },
    async activitys () {
      try {
        this.loading = true
        const resp = await this.$api.home.activitys();
        if (resp.code === 1) {
          const data = resp.data
          this.activityList = data.list
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
  padding: 29px 15px 15px;
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
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #ffffff;
    }
  }
}
</style>