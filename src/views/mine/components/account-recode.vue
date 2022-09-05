<template>
  <div class="account-recode sub-page">
    <nav-bar :title="title"/>
    <div class="container">
      <van-loading
          v-if="loading"
          type="spinner"
          size="24px"
          style="padding: 15px 0;text-align: center">
        {{ $t('加载中...') }}
      </van-loading>
      <van-empty :description="$t('空空如也')" v-if="isEmpty"/>
      <div class="recode-content">
        <div class="recode-item" v-for="item in showList" :key="item.id">
          <div class="left-wrap">
            <div class="type" v-if="title === $t('充值记录')">
              {{ item.status | statusFilter(statusList) }}
            </div>
            <div class="type" v-else>{{ item.type_text }}</div>
            <div class="time">{{ item.addtime }}</div>
          </div>
          <div class="right-wrap">
            <div class="money">
              <span v-if="title === $t('充值记录')">+</span>
              <span v-else></span>
              <span>{{ item.num || item.num_txt }}</span>
            </div>
            <div class="desc" v-if="title !== $t('充值记录')">
              {{ item.note }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountRecode",
  data() {
    return {
      withdrawList: [],
      rechargeList: [],
      loading: false,
      statusList: [this.$t('审核中'), this.$t('失败'), this.$t('成功')]
    }
  },
  computed: {
    title() {
      return this.$route.query.title
    },
    showList() {
      return this.title === this.$t('充值记录') ? this.rechargeList : this.withdrawList
    },
    isEmpty() {
      return this.showList.length === 0 && !this.loading
    }
  },
  filters: {
    statusFilter(status, statusList) {
      return statusList[status - 1]
    }
  },
  created() {
    if (this.title === this.$t('充值记录')) {
      this.getRechargeList()
    } else {
      this.tranRecord()
    }
  },
  methods: {
    async getRechargeList() {
      try {
        this.loading = true
        const resp = await this.$api.mine.getRechargeList();
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
        color: #333333;
        margin-bottom: 10px;
      }

      .time {
        font-family: PingFang-SC-Medium;
        font-size: 12px;
        line-height: 12px;
        color: #cccccc;
      }

      .money {
        font-family: PingFang-SC-Bold;
        font-size: 16px;
        line-height: 16px;
        color: #f57e0a;
        text-align: right;
        margin-bottom: 8px;
      }

      .desc {
        text-align: right;
        font-family: PingFang-SC-Medium;
        font-size: 12px;
        line-height: 12px;
        color: #cccccc;
      }
    }
  }
}
</style>
