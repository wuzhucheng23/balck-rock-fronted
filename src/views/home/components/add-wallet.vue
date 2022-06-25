<template>
  <div class="add-wallet sub-page">
    <nav-bar :title="$t('添加钱包')"></nav-bar>
    <div class="container">
      <div class="info-box">
        <van-cell class="type"
                  :title="title"
                  is-link
                  @click="handleShowType"
                  arrow-direction="down"/>
        <van-field v-model="walletAddress"
                   type="textarea"
                   :placeholder="$t('请输入钱包地址')"/>
        <van-field v-model="confirmAddress"
                   type="textarea"
                   :placeholder="$t('请输入确认钱包地址')"/>
      </div>
      <div class="btn-box">
        <van-button block @click="handleSave" :loading="buttonLoading"
                    loading-type="spinner" :loading-text="$t('正在添加...')">{{ $t('保存') }}</van-button>
      </div>
    </div>
    <van-dialog v-model="visible" :show-confirm-button="false" width="325px" close-on-click-overlay>
      <div class="dialog-container">
        <div class="type-list">
          <div class="type-item" v-for="item in typeList" :key="item.value" @click="handleChangeType(item.value)">
            <span>{{ item.title }}</span>
            <van-image :src="require('@/assets/mine/select-icon.png')" v-if="item.value === type"></van-image>
            <van-image :src="require('@/assets/mine/nonselect-icon.png')" v-else></van-image>
          </div>
        </div>
      </div>
    </van-dialog>
    <result-dialog :visible.sync="showResult" :result="$t('添加成功')" :btn="false" :desc="$t('正在跳转页面...')"></result-dialog>
  </div>
</template>

<script>
export default {
  name: "add-wallet",
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
      walletAddress: '',
      confirmAddress: '',
      visible: false,
      typeList,
      type: 1,
      showResult: false,
      buttonLoading: false
    }
  },
  computed: {
    title() {
      return this.typeList.find(item => item.value === this.type).title
    }
  },
  methods: {
    handleChangeType(type) {
      this.type = type
      this.visible = false
    },
    handleShowType () {
      this.visible = true
    },
    async handleSave() {
      if (!this.walletAddress) return this.$toast(this.$t('请输入钱包地址'))
      if (!this.confirmAddress) return this.$toast(this.$t('请输入确认钱包地址'))
      if (this.walletAddress !== this.confirmAddress) return this.$toast(this.$t('钱包地址与确认钱包地址不一致'))
      const params = {
        type: this.type,
        wallet_address: this.walletAddress,
        wallet_address_confirm: this.confirmAddress
      }
      try {
        this.buttonLoading = true
        const res = await this.$api.home.editWallet(params)
        if (res.code === 1) {
          // this.$toast.success(res.msg)
          this.showResult = true
          this.$utils.delayBack()
        } else {
          this.$toast.fail(res.msg || res.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'))
      } finally {
        this.buttonLoading = false
      }
    }
  },
}
</script>

<style scoped lang="less">
.container {
  padding-top: 8px;
  .info-box {
    height: 309px;
    background-color: #ffffff;
    padding: 20px;
    .type {
      height: 44px;
      background-color: #f6f6f6;
      border-radius: 10px;
      margin-bottom: 15px;
    }
    .van-field {
      padding: 0;
      margin-bottom: 15px;
    }
    ::v-deep .van-cell::after {
      display: none;
    }
    ::v-deep .van-field__body {
      height: 90px;
      background-color: #f6f6f6;
      border-radius: 10px;
      padding-left: 15px;
    }

    ::v-deep .van-icon-arrow-down {
      color: #a4a4a4;
    }
  }
  .btn-box {
    padding: 25px 15px;
    .van-button {
      height: 48px;
      background-color: #ff6c1e;
      border-radius: 10px;
      font-family: PingFang-SC-Medium;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #ffffff;
    }
  }
}
.van-dialog {
  border-radius: 10px;
}
.dialog-container {
  width: 325px;
  background-color: #ffffff;
  border-radius: 10px;
  .type-list {
    .type-item {
      height: 65px;
      border-bottom: 1px solid #eee;
      padding-left: 21px;
      padding-right: 19px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-family: PingFang-SC-Bold;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #333333
      }
      .van-image {
        width: 20px;
        height: 20px;
      }
      &:last-child {
        border-bottom: unset;
      }
    }
  }
}
</style>