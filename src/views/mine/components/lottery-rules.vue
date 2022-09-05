<template>
  <div class="lottery-rules sub-page">
    <div class="container">
      <div class="container__content">
        <div class="nav-bar-wrap">
          <van-icon name="arrow-left" @click="$router.back()"/>
          <span>{{ $t('活动规则') }}</span>
        </div>
        <div class="rules-wrap">
          <div class="rules-content" v-html="content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LotteryRules",
  data() {
    return {
      content: ''
    }
  },
  created() {
    this.getTurnDesc()
  },
  methods: {
    async getTurnDesc() {
      try {
        const resp = await this.$api.mine.getTurnDesc();
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
.container {
  height: 100%;
  overflow: auto;

  .container__content {
    min-height: 100%;
    padding-bottom: 30px;
    background: url("../../../assets/home/lottery-bk.png") no-repeat left top/100% 100%;

    .nav-bar-wrap {

      margin-bottom: 15px;
      position: relative;
      line-height: 50px;
      font-family: PingFang-SC-Medium;
      font-size: 18px;
      color: #ffffff;
      text-align: center;

      .van-icon {
        position: absolute;
        top: 50%;
        left: 12px;
        transform: translateY(-50%);
      }

      .activity-rules {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 90px;
        height: 30px;
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        color: #ffffff;
        line-height: 30px;
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 15px 0px 0px 15px;
        text-align: center;
      }
    }

    .rules-wrap {
      padding: 0 15px;
      min-height: 100%;

      .rules-content {
        min-height: calc(100vh - 95px);
        padding: 15px;
        overflow: auto;
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        line-height: 24px;
        color: #ffffff;
      }
    }
  }
}

</style>
