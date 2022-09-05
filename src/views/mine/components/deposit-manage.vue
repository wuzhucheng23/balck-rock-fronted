<template>
  <div class="deposit-manage sub-page">
    <nav-bar :title="$t('押金管理')">
      <template #right>
        <span class="money-rule"
              @click="$utils.toRoute('MoneyRule', '押金规则')">
          {{ $t('押金规则') }}
        </span>
      </template>
    </nav-bar>
    <div class="container">
      <div class="manage-box">
        <div class="manageItem"
             v-for="item in manageList"
             :key="item.title"
             @click="$utils.toRoute(item.name , item.label)">
          <span>{{ item.title }}</span>
          <van-image :src="require('@/assets/mine/right-arrow-icon.png')"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DepositManage",
  data() {
    const manageList = [
      {
        title: this.$t('缴纳押金'),
        name: 'PayDeposit',
        label: '缴纳押金'
      },
      {
        title: this.$t('提取押金'),
        name: 'WithdrawDeposit',
        label: '提取押金'
      },
      {
        title: this.$t('押金记录'),
        name: 'DepositRecord',
        label: '押金记录'
      },
    ]
    return {
      manageList,
    }
  }
}
</script>

<style scoped lang="less">
.money-rule {
  font-family: PingFang-SC-Medium;
  text-decoration: underline;
  font-size: 12px;
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
        line-height: 14px;
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
