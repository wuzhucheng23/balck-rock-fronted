<template>
  <div class="earning-recode sub-page">
    <nav-bar :title="$t('收益记录')">
      <template #right>
        <van-image :src="require('@/assets/mine/menu-icon.png')" @click="handleShowSelect"></van-image>
      </template>
    </nav-bar>
    <div class="container">
      <div class="recode-content">
        <van-list v-model="loading" :loading-text="$t('加载中...')" :finished="finished"
                  :finished-text="isEmpty ? '' : $t('没有更多数据了...')"
                  @load="tranRecord">
          <van-empty :description="$t('空空如也')" v-if="isEmpty"/>
          <div class="recode-item" v-for="item in recodeList" :key="item.id">
            <div class="left-wrap">
              <div class="type">{{ item.type_text }}</div>
              <div class="time">{{ item.addtime }}</div>
            </div>
            <div class="money">
              <span>{{ item.num_text }}</span>
            </div>
          </div>
        </van-list>
      </div>
    </div>
    <van-action-sheet v-model="visible" :title="$t('选择筛选项')">
      <div class="sheet-container">
        <div class="select-box">
          <div class="select-item" v-for="item in selectList" :key="item.value" @click="handleChange(item.value)"
               :class="{'select-item-active': type === item.value}">
            {{ item.title }}
          </div>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
export default {
  name: "earning-recode",
  data() {
    const selectList = [
      // {
      //   title: this.$t('系统'),
      //   value: 0
      // },
      // {
      //   title: this.$t('押金'),
      //   value: 1
      // },
      {
        title: this.$t('返佣'),
        value: 3
      },
      // {
      //   title: this.$t('退税'),
      //   value: 4
      // },
      {
        title: this.$t('推广返佣'),
        value: 5
      },
      {
        title: this.$t('提现'),
        value: 6
      },
      {
        title: this.$t('理财收益'),
        value: 7
      },
      // {
      //   title: this.$t('冻结'),
      //   value: 8
      // },
      // {
      //   title: this.$t('解冻'),
      //   value: 9
      // },
    ]
    return {
      selectList,
      recodeList: [],
      visible: false,
      loading: false,
      finished: false,
      empty: false,
      page: 1,
      type: 3
    }
  },
  computed: {
    isEmpty() {
      return this.empty && !this.loading
    }
  },
  methods: {
    handleShowSelect() {
      this.visible = true
    },
    async tranRecord() {
      const params = {
        type: this.type,
        limit: 20,
        page: this.page
      }
      try {
        this.empty = false
        this.loading = true
        const res = await this.$api.mine.tranRecord(params);
        if (res.code === 1) {
          this.recodeList.push(...res.data)
          if (this.recodeList.length === 0) this.empty = true;
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
    handleChange(type) {
      this.type = type
      this.recodeList = []
      this.page = 1
      this.finished = false
      this.visible = false
      this.getDetails()
    },
  },
}
</script>

<style scoped lang="less">
.nav-bar .van-image {
  width: 18px;
  height: 10px;
}
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
.van-action-sheet {
  border-radius: 10px 10px 0px 0px;
}
::v-deep .van-action-sheet__header {
  font-family: PingFang-SC-Medium;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #333333;
}
.sheet-container {
  padding: 15px 20px 50px;
  .select-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .select-item {
      width: calc((100% - 8px) / 2);
      height: 60px;
      background-color: #f2f2f2;
      border-radius: 5px;
      margin-bottom: 8px;
      font-family: PingFang-SC-Medium;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 40px;
      padding: 10px 0;
      text-align: center;
      letter-spacing: 0px;
      border: 1px solid #f2f2f2;
      color: #333333;
    }
    .select-item-active {
      border: 1px solid #fc6324;
      color: #fc6324;
    }
  }
}
</style>