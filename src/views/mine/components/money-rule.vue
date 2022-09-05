<template>
  <div class="money-rule sub-page">
    <nav-bar :title="$t('押金规则')"/>
    <div class="container">
      <div class="rule-box">
        <div class="title">{{ $t('押金规则') }}：</div>
        <br>
        <div class="content" v-html="detail"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "money-rule",
  data() {
    return {
      detail: '',
    }
  },
  created() {
    this.depositCont()
  },
  methods: {
    async depositCont() {
      try {
        const resp = await this.$api.mine.depositCont();
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
  },
}
</script>

<style scoped lang="less">
.container {
  height: calc(100% - 50px);

  .rule-box {
    padding: 20px 15px;
    font-family: PingFang-SC-Medium;
    font-size: 12px;
    line-height: 14px;
    color: #999999;
  }
}

</style>
