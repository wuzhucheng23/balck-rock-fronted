<template>
  <div class="bank-account sub-page">
    <nav-bar :title="$t('银行账户')"></nav-bar>
    <div class="container">
      <div class="bank-box">
        <div class="bank-item" v-for="item in bankList" :key="item" @click="handleToAdd(item)">
          <div class="left-wrap">
            <van-image :src="require('@/assets/mine/bank-icon.png')"></van-image>
            <div class="text">{{ item }}</div>
          </div>
          <van-image :src="require('@/assets/mine/right-arrow-icon.png')" class="arrow-icon"></van-image>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bank-account",
  data() {
    return {
      bankList: [this.$t('银行卡(国际)'), this.$t('银行卡')]
    }
  },
  methods: {
    handleToAdd(title) {
      this.$router.push({
        name: 'addBankCard',
        label: '添加银行卡',
        query: {
          title
        }
      })
    }
  },
}
</script>

<style scoped lang="less">
.container {
  padding: 15px;
  height: calc(100% - 50px);
  overflow: auto;
  .bank-box {
    .bank-item {
      height: 62px;
      background-color: #ffffff;
      border-radius: 10px;
      padding: 0 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      .left-wrap {
        display: flex;
        .van-image {
          width: 25px;
          height: 20px;
          margin-right: 15px;
        }
        .text {
          font-family: PingFang-SC-Bold;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 16px;
          letter-spacing: 0px;
          color: #333333;
        }
      }
      .arrow-icon {
        width: 10px;
        height: 17px;
      }
    }
  }
}
</style>