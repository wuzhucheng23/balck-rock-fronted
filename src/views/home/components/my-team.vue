<template>
  <div class="my-team sub-page">
    <nav-bar :title="$t('我的团队')"></nav-bar>
    <div class="container">
      <div class="nav-box">
        <van-tabs v-model="level" color="#fc6324" line-width="20px" title-active-color="#fc6324"
                  title-inactive-color="#666" @change="handleChange">
          <van-tab v-for="item in levelList" :key="item.value" :title="item.title + '（' + item.people + '）'" :name="item.value"></van-tab>
        </van-tabs>
      </div>
      <div class="content-box">
        <van-empty :description="$t('空空如也')" v-if="isEmpty"/>
        <van-list v-model="loading" :loading-text="$t('加载中...')" :finished="finished"
                  :finished-text="isEmpty ? '' : $t('没有更多数据了...')"
                  @load="getDetails">
          <div class="content-item" v-for="item in contentList" :key="item.id">
            <div class="left-wrap">
              <div class="vip-wrap">VIP{{ item.level }}</div>
              <div class="info-wrap">
                <div class="name">{{ item.username }}</div>
                <div class="id">ID:{{ item.id }}</div>
                <div class="time">{{ item.addtime }}</div>
              </div>
            </div>
            <div class="right-wrap">
              <div class="money">{{ $t('余额') }}：<span>{{ item.balance }}</span></div>
              <div class="all-earn">{{ $t('总佣金') }}：<span>{{ item.commission }}</span></div>
              <div class="today-earn">{{ $t('今日佣金') }}：<span>{{ item.today_settled }}</span></div>
            </div>
          </div>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "my-team",
  data() {
    const levelList = [
      {
        title: this.$t('一级'),
        value: 1,
        people: 0,
      },
      {
        title: this.$t('团队'),
        value: 2,
        people: 0,
      },
      // {
      //   title: this.$t('三级'),
      //   value: 3,
      // },
    ]
    return {
      levelList,
      level: 1,
      loading: false,
      finished: false,
      empty: false,
      contentList: [],
      page: 1,
    }
  },
  computed: {
    isEmpty() {
      return this.empty && !this.loading
    }
  },
  created() {
    this.userCount()
  },
  methods: {
    handleChange(value) {
      this.level = value
      this.contentList = []
      this.page = 1
      this.finished = false
      this.getDetails()
    },
    async userCount () {
      try {
        this.loading = true
        const resp = await this.$api.home.userCount();
        if (resp.code === 1) {
          const data = resp.data
          this.levelList[0].people = data.oneLevel
          this.levelList[1].people = data.teamAll
        } else {
          this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      } finally {
        this.loading = false
      }
    },
    async getDetails() {
      const params = {
        level: this.level,
        limit: 20,
        page: this.page
      }
      try {
        this.empty = false
        this.loading = true
        const res = await this.$api.home.getDetails(params);
        if (res.code === 1) {
          this.contentList.push(...res.data)
          if (this.contentList.length === 0) this.empty = true;
          else this.empty = false
          this.page += 1
          if (res.data.length < 20) this.finished = true
        } else {
          this.$toast.fail(res.msg || res.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'))
      } finally {
        this.loading = false
      }
    },
  }
}
</script>

<style scoped lang="less">
.container {
  height: calc(100% - 50px);
  overflow: auto;
  padding-top: 1px;
  .nav-box {
    margin-bottom: 5px;
  }
  .content-box {
    height: calc(100% - 50px);
    overflow: auto;
    .content-item {
      height: 81px;
      background-color: #ffffff;
      margin-bottom: 1px;
      padding: 16px 20px;
      display: flex;
      justify-content: space-between;
      .left-wrap {
        display: flex;align-items: center;
        .vip-wrap {
          width: 36px;
          height: 36px;
          background: #fc6324;
          font-family: PingFang-SC-Medium;
          font-size: 12px;
          color: #ffffff;
          text-align: center;
          line-height: 36px;
          border-radius: 50%;
          margin-right: 10px;
        }
      }
    }
    .name {
      max-width: 120px;
      font-family: PingFang-SC-Bold;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 16px;
      letter-spacing: 0px;
      color: #333333;
      margin-bottom: 6px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .id {
      font-family: PingFang-SC-Medium;
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #999999;
      line-height: 12px;
      margin-bottom: 6px;
    }
    .time {
      font-family: PingFang-SC-Medium;
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      line-height: 12px;
      color: #999999;
    }
    .money {
      font-family: PingFang-SC-Medium;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 16px;
      letter-spacing: 0px;
      color: #666666;
      margin-bottom: 6px;
      text-align: right;
      span {
        font-family: PingFang-SC-Medium;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 16px;
        letter-spacing: 0px;
        color: #f57e0a;
      }
    }
    .today-earn, .all-earn {
      font-family: PingFang-SC-Medium;
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 12px;
      letter-spacing: 0px;
      color: #666666;
      margin-bottom: 6px;
      text-align: right;
      margin-bottom: 6px;
      span {
        font-family: PingFang-SC-Medium;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 12px;
        letter-spacing: 0px;
        color: #f57e0a;
      }
    }
  }
}
</style>
