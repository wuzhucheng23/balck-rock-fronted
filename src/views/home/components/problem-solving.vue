<template>
  <div class="problem-solving sub-page">
    <nav-bar :title="$t('问题解答')"></nav-bar>
    <div class="container">
      <div class="solving-box">
        <div class="title">{{ content.title }}</div>
        <div class="time">{{ $t('更新时间') }}：{{ currentTime }}</div>
        <div class="content" v-html="content.detail">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "problem-solving",
  computed: {
    content() {
      return this.$route.query
    },
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
}
</script>

<style scoped lang="less">
.container {
  height: calc(100% - 50px);
  overflow: auto;
  padding: 15px;
  .solving-box {
    height: 100%;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 20px;
    position: relative;
    .title {
      font-family: PingFang-SC-Bold;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 16px;
      letter-spacing: 0px;
      color: #333333;
      margin-bottom: 12px;
    }
    .time {
      font-family: PingFang-SC-Medium;
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 12px;
      letter-spacing: 0px;
      color: #999999;
      margin-bottom: 32px;
    }
    .content {
      font-family: PingFang-SC-Medium;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 18px;
      letter-spacing: 0px;
      color: #333333;
    }
    &::before {
      content: '';
      display: block;
      height: 1px;
      background-color: #f6f6f6;
      border-radius: 1px;
      width: calc(100% - 30px);
      position: absolute;
      top: 71px;
      left: 15px;
      right: 15px;
    }
  }
}
</style>