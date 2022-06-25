<template>
  <div class="introduction sub-page">
    <nav-bar :title="$t('简介')"></nav-bar>
    <div class="container">
      <div class="introduction-box">
        <div v-html="content"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "introduction",
  data() {
    return {
      content: ''
    }
  },
  created() {
    this.getDesc()
  },
  methods: {
    async getDesc () {
      try {
        this.loading = true
        const resp = await this.$api.home.getDesc();
        if (resp.code === 1) {
          const data = resp.data
          this.content = data.detail
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
  padding: 15px;
  height: calc(100% - 50px);
  overflow: auto;
  .introduction-box {
    background-color: #ffffff;
    border-radius: 10px;
    padding: 15px;
    font-family: PingFang-SC-Medium;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 18px;
    letter-spacing: 0px;
    color: #333333;
    text-align: justify;
    .introduction-item {
      height: 170px;
      background-color: #ffffff;
      border-radius: 10px;
      margin-bottom: 15px;
      padding: 21px 23px 15px 16px;
      position: relative;
      .content {
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 16px;
        letter-spacing: 0px;
        color: #333333;
        margin-bottom: 24px;
      }
      .time {
        font-family: PingFang-SC-Medium;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 12px;
        letter-spacing: 0px;
        color: #333333;
      }
      &::after {
        content: '';
        display: block;
        height: 1px;
        background-color: #f6f6f6;
        border-radius: 1px;
        position: absolute;
        bottom: 39px;
        left: 15px;
        right: 15px;
      }
    }
  }
}
</style>