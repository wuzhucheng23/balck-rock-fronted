<template>
  <div class="help sub-page">
    <nav-bar :title="$t('帮助中心')"></nav-bar>
    <div class="container">
      <div class="help-box">
        <div class="help-item" v-for="item in questionList" :key="item.title" @click="handleToSolving(item)">
          <div class="left-wrap">
            <div class="title">{{ item.title }}</div>
            <div class="time">{{ $t('更新时间') }}：{{ currentTime }}</div>
          </div>
          <van-image :src="require('@/assets/home/right-arrow-icon.png')"></van-image>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "help",
  data() {
    return {
      questionList: []
    }
  },
  computed: {
    currentTime() {
      const date = new Date();
      const YY = date.getFullYear() + '-';
      const MM = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      const DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      const hh = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      const mm = (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ":";
      const ss = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return YY + MM + DD + " " + hh + mm + ss;
    }
  },
  created() {
    this.getFaq()
  },
  methods: {
    handleToSolving(item) {
      this.$router.push({
        name: 'problemSolving',
        label: '问题解答',
        query: item
      })
    },
    async getFaq() {
      try {
        this.loading = true
        const resp = await this.$api.service.getFaq();
        if (resp.code === 1) {
          const data = resp.data
          this.questionList = data
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
  padding: 15px 15px 3px;
  height: calc(100% - 50px);
  overflow: auto;
  .help-box {
    .help-item {
      height: 62px;
      background-color: #ffffff;
      border-radius: 10px;
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px 15px;
      min-width: 0;
      .title {
        font-family: PingFang-SC-Bold;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 16px;
        letter-spacing: 0px;
        color: #333333;
        margin-bottom: 8px;
        width: calc(100vw - 100px);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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
      .van-image {
        width: 10px;
        height: 17px;
      }
    }
  }
}
</style>