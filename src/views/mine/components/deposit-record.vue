<template>
  <div class="deposit-record sub-page">
    <nav-bar :title="$t('押金记录')"></nav-bar>
    <div class="container">
      <div class="record-box">
        <div class="record-item" v-for="item in recordList" :key="item.id">
          <div class="left-wrap">
            <div class="name" v-if="item.status === 0">{{ $t('支付押金') }}</div>
            <div class="name" v-else>{{ $t('退还押金') }}</div>
            <div class="time" v-if="item.status === 0">{{ item.create_time_text }}</div>
            <div class="time" v-else>{{ item.back_time_text }}</div>
          </div>
          <div class="right-wrap">
            <div class="pay" v-if="item.status === 0">{{ $t('已支付') }}</div>
            <div class="backing" v-else>{{ $t('退还中') }}：{{ item.back_time_text }}</div>
            <div class="money">${{ item.recharge }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "deposit-record",
  data() {
    return {
      recordList: []
    }
  },
  created() {
    this.getSubList()
  },
  methods: {
    async getSubList() {
      try {
        this.loading = true
        const resp = await this.$api.hall.getSubList();
        if (resp.code === 1) {
          const data = resp.data
          this.recordList = data
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
  height: calc(100% - 50px);
  overflow: auto;
  .record-box {
    padding: 10px 0;
    .record-item {
      height: 63px;
      background-color: #ffffff;
      margin-bottom: 2px;
      padding: 15px;
      display: flex;
      justify-content: space-between;
      .name {
        font-family: PingFang-SC-Medium;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #333333;
        margin-bottom: 10px;
        line-height: 12px;
      }
      .time {
        font-family: PingFang-SC-Medium;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #999999;
        line-height: 12px;
      }
      .pay {
        font-family: PingFang-SC-Medium;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #999999;
        margin-bottom: 10px;
        line-height: 12px;
        text-align: right;
      }
      .backing {
        font-family: PingFang-SC-Medium;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #fc6324;
        margin-bottom: 10px;
        line-height: 12px;
        text-align: right;
      }
      .money {
        font-family: PingFang-SC-Medium;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #f98b65;
        line-height: 12px;
        text-align: right;
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
