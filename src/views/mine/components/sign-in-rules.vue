<template>
  <div class="sign-in-rules sub-page">
    <div class="nav-bar-wrap">
      <van-icon name="arrow-left" @click="$router.back()"/>
      <span>{{ $t('签到规则') }}</span>
    </div>
    <div class="container">
      <div class="container__content" v-html="content"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignInRules",
  data() {
    return {
      content: ''
    }
  },
  created() {
    this.getSignDesc()
  },
  methods: {
    async getSignDesc() {
      try {
        const resp = await this.$api.mine.getSignDesc();
        if (resp.code === 1) {
          const data = resp.data
          this.content = data.detail
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
.nav-bar-wrap {
  position: relative;
  font-family: PingFang-SC-Medium;
  font-size: 15px;
  color: #333333;
  line-height: 50px;
  text-align: center;
  background: #ffffff;

  .van-icon {
    position: absolute;
    top: 50%;
    left: 12px;
    transform: translateY(-50%);
  }
}

.container {
  height: calc(100% - 50px);
  overflow: auto;

  .container__content {
    min-height: 100%;
    padding: 25px 15px;
    font-family: PingFang-SC-Medium;
    font-size: 14px;
    line-height: 24px;
    color: #333333;
  }
}

</style>
