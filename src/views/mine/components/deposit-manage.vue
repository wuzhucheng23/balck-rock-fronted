<template>
  <div class="deposit-manage sub-page">
    <nav-bar :title="$t('押金管理')">
      <template #right>
        <span class="money-rule" @click="handleToMoneyRule">{{ $t('押金规则') }}</span>
      </template>
    </nav-bar>
    <div class="container">
      <div class="manage-box">
        <div class="manageItem" v-for="item in manageList" :key="item.title" @click="handleClick(item)">
          <span>{{ item.title }}</span>
          <van-image :src="require('@/assets/mine/right-arrow-icon.png')"></van-image>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "deposit-manage",
  data() {
    const manageList = [
      {
        title: this.$t('缴纳押金'),
        name: 'payDeposit',
        label: '缴纳押金'
      },
      {
        title: this.$t('提取押金'),
        name: 'withdrawDeposit',
        label: '提取押金'
      },
      {
        title: this.$t('押金记录'),
        name: 'depositRecord',
        label: '押金记录'
      },
    ]
    return {
      manageList,
    }
  },
  methods: {
    handleClick({name, label}) {
      this.$router.push({
        name,
        label
      })
    },
    handleToMoneyRule() {
      this.$router.push({
        name: 'moneyRule',
        label: '押金规则',
        query: {
          id: this.id
        }
      })
    },
  },
}
</script>

<style scoped lang="less">
.money-rule {
  font-family: PingFang-SC-Medium;
  text-decoration: underline;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #666666;
}

.container {
  padding-top: 5px;
  height: calc(100% - 50px);
  overflow: auto;

  .manage-box {
    .manageItem {
      height: 48px;
      background-color: #ffffff;
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 15px;

      span {
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 14px;
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
        left: 15px;
        right: 15px;
        bottom: 0px;
      }

      .van-image {
        width: 10px;
        height: 18px;
      }
    }
  }
}
</style>