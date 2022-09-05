<template>
  <div class="vip-introduce sub-page">
    <nav-bar :title="$t('vip等级介绍')"/>
    <div class="container">
      <div class="introduce-box">
        <div class="content" v-html="detail">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VipIntroduce",
  data() {
    return {
      detail: ''
    }
  },
  created() {
    this.vipRules()
  },
  methods: {
    async vipRules() {
      try {
        const resp = await this.$api.mine.vipRules();
        if (resp.code === 1) {
          const data = resp.data
          this.detail = data.detail
        } else {
          this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      }
    },
  }
}
</script>

<style scoped lang="less">
.container {
  height: calc(100% - 50px);
  overflow: auto;
  padding: 15px;

  .introduce-box {
    background-color: #ffffff;
    border-radius: 10px;
    padding: 15px;
    font-family: PingFang-SC-Medium;
    font-size: 14px;
    line-height: 18px;
    color: #333333;
    text-align: justify;
  }
}
</style>
