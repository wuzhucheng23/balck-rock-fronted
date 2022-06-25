<template>
  <div class="recode sub-page">
    <nav-bar :title="title"></nav-bar>
    <div class="container">
      <van-loading type="spinner" size="24px" v-if="loading"
                   style="padding: 15px 0;text-align: center">
        {{ $t('加载中...') }}
      </van-loading>
      <van-empty :description="$t('空空如也')" v-if="isEmpty"/>
      <div class="recode-content">
        <div class="recode-item" v-for="item in showList" :key="item.id">
          <div class="left-wrap">
            <div class="type" v-if="$route.query.title === $t('充值记录')">{{ item.status }}</div>
            <div class="type" v-else>{{ item.type_text }}</div>
            <div class="time">{{ item.addtime }}</div>
          </div>
          <div class="money">
            <span v-if="$route.query.title === $t('充值记录')">+</span>
            <span v-else></span>
            <span>{{ item.num || item.num_txt }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "recode",
  data() {
    return {
      withdrawList: [],
      rechargeList: [],
      loading: false
    }
  },
  computed: {
    title() {
      return this.$route.query.title
    },
    showList () {
      return this.title === this.$t('充值记录') ? this.rechargeList : this.withdrawList
    },
    isEmpty () {
      return this.showList.length === 0 && !this.loading
    }
  },
  created() {
    this.getRechargeList()
    this.tranRecord()
  },
  methods: {
    async getRechargeList () {
      try {
        this.loading = true
        const resp = await this.$api.home.getRechargeList();
        if (resp.code === 1) {
          const data = resp.data
          this.rechargeList = data
        } else {
          this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      } finally {
        this.loading = false
      }
    },
    async tranRecord() {
      const params = {
        type: 6,
        limit: 10000,
        page: 1
      }
      try {
        this.loading = true
        const res = await this.$api.mine.tranRecord(params);
        if (res.code === 1) {
          this.withdrawList = res.data
        } else {
          this.$toast.fail(res.msg || res.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'))
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped lang="less">
.container {
  padding-top: 5px;
  .recode-content {
    .recode-item {
      height: 62px;
      background-color: #ffffff;
      padding: 15px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1px;
      .type {
        font-family: PingFang-SC-Bold;
        font-size: 14px;
        line-height: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #333333;
        margin-bottom: 10px;
      }
      .time {
        font-family: PingFang-SC-Medium;
        font-size: 12px;
        line-height: 12px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #cccccc;
      }
      .money {
        font-family: PingFang-SC-Bold;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 16px;
        letter-spacing: 0px;
        color: #f57e0a;
      }
    }
  }
}
</style>