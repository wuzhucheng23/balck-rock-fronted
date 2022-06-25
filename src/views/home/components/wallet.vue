<template>
  <div class="wallet sub-page">
    <nav-bar :title="$t('钱包')">
      <template #right>
        <van-image :src="require('@/assets/home/add-icon.png')" @click="handleToAdd"></van-image>
      </template>
    </nav-bar>
    <div class="container">
      <van-loading type="spinner" size="24px" v-if="loading"
                   style="padding: 15px 0;text-align: center">
        {{ $t('加载中...') }}
      </van-loading>
      <van-empty :description="$t('空空如也')" v-if="isEmpty"/>
      <div class="wallet-box">
        <div class="wallet-item" v-for="item in walletsList" :key="item.id">
          <div class="title">{{ $t('钱包') }}</div>
          <div class="type">{{ item.type | typeFilter(typeList) }}</div>
          <div class="address">{{ item.address }}</div>
          <div class="btn">
            <van-button @click="handleEdit(item)">{{ $t('编辑') }}</van-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "wallet",
  data() {
    const typeList = [
      {
        title: 'USDT(TRC20)',
        value: 1
      },
      {
        title: 'USDT(ERC20)',
        value: 2
      },
      {
        title: 'BTC(Bitcoin)',
        value: 4
      },
      {
        title: 'ETH(Ethereum)',
        value: 3
      },
      // {
      //   title: 'Ecuador USD',
      //   value: 5
      // },
    ]
    return {
      typeList,
      walletsList: [],
      loading: false,
    }
  },
  computed: {
    isEmpty () {
      return this.walletsList.length === 0 && !this.loading
    }
  },
  filters: {
    typeFilter (value, typeList) {
      return typeList.find(item => item.value === value).title
    }
  },
  created () {
    this.wallets()
  },
  methods: {
    handleToAdd() {
      this.$router.push({
        name: 'addWallet',
        label: '添加钱包'
      })
    },
    handleEdit (item) {
      this.$router.push({
        name: 'editWallet',
        label: '编辑钱包',
        query: {
          id: item.id,
          type: item.type
        }
      })
    },
    async wallets () {
      try {
        this.loading = true
        const resp = await this.$api.home.wallets();
        if (resp.code === 1) {
          const data = resp.data
          this.walletsList = data
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
.nav-bar .van-image {
  width: 25px;
  height: 25px;
}
.container {
  padding: 20px 15px;
  height: calc(100% - 50px);
  overflow: auto;
  .wallet-box {
    margin-bottom: 15px;
    .wallet-item {
      height: 160px;
      background-image: linear-gradient(-45deg, #ee6e47 0%, #fcaa7d 100%), linear-gradient(#f17a51, #f17a51);
      background-blend-mode: normal, normal;
      border-radius: 10px;
      padding-left: 27px;
      padding-top: 35px;
      position: relative;
      margin-bottom: 15px;
      .title {
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 14px;
        letter-spacing: 0px;
        color: #ffffff;
        margin-bottom: 14px;
      }
      .type {
        font-family: PingFang-SC-Medium;
        font-size: 28px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 28px;
        letter-spacing: 0px;
        color: #ffffff;
        margin-bottom: 11px;
      }
      .address {
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 14px;
        letter-spacing: 0px;
        color: #ffffff;
      }
      .btn .van-button{
        width: 70px;
        height: 28px;
        background-color: #ffffff;
        border-radius: 14px;
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 28px;
        letter-spacing: 0px;
        color: #ef724b;
        text-align: center;
        position: absolute;
        right: 15px;
        bottom: 15px;
      }
    }
  }
}
</style>