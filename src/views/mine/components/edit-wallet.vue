<template>
  <div class="edit-wallet sub-page">
    <nav-bar :title="$t('编辑钱包')"/>
    <div class="container">
      <div class="info-box">
        <van-cell
            class="type"
            is-link
            arrow-direction="down"
            :title="title"
        />
        <van-field
            v-model="walletAddress"
            type="textarea"
            class="wallet-address"
            :placeholder="$t('请输入新钱包地址')"
        />
        <van-field
            v-model="confirmWalletAddress"
            type="textarea"
            class="wallet-address"
            :placeholder="$t('请输入确认新钱包地址')"
        />
      </div>
      <div class="btn-box">
        <van-button
            block
            loading-type="spinner"
            :loading="buttonLoading"
            :loading-text="$t('正在编辑...')"
            @click="handleSave">
          <span>{{ $t('保存') }}</span>
        </van-button>
      </div>
    </div>
    <result-dialog
        :visible.sync="showResult"
        :result="$t('编辑成功')"
        :btn="false"
        :desc="$t('正在跳转页面...')"
    />
  </div>
</template>

<script>
export default {
  name: "EditWallet",
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
      }
    ]
    return {
      walletAddress: '',
      confirmWalletAddress: '',
      typeList,
      type: 1,
      showResult: false,
      buttonLoading: false
    }
  },
  computed: {
    id() {
      return this.$route.query.id
    },
    title() {
      return this.typeList.find(item => item.value === this.type).title
    }
  },
  created() {
    this.type = this.$route.query.type
  },
  methods: {
    async handleSave() {
      if (!this.walletAddress) return this.$toast(this.$t('请输入新钱包地址'))
      if (!this.confirmWalletAddress) return this.$toast(this.$t('请输入确认新钱包地址'))
      if (this.walletAddress !== this.confirmWalletAddress) return this.$toast(this.$t('新钱包地址与确认新钱包地址不一致'))
      const params = {
        type: this.type,
        wallet_address: this.walletAddress,
        wallet_address_confirm: this.confirmWalletAddress,
        id: this.id
      }
      try {
        this.buttonLoading = true
        const res = await this.$api.home.editWallet(params)
        if (res.code === 1) {
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
      height: 44px;
      background-color: #f6f6f6;
      border-radius: 10px;
      padding-left: 15px;
    }

    ::v-deep .van-field__control {
      font-family: PingFang-SC-Medium;
      font-size: 12px;
      line-height: 19px;
      color: #666666;
    }

    ::v-deep .wallet-address .van-field__body {
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
      color: #ffffff;
    }
  }

  .get-code {
    width: 100px;
    height: 24px;
    background-color: #ff6c1e;
    border-radius: 5px;
    font-family: PingFang-SC-Medium;
    font-size: 11px;
    line-height: 12px;
    color: #ffffff;
    margin-right: 15px;
    position: relative;
    top: -2.5px;
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
