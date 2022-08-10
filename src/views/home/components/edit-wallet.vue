<template>
  <div class="edit-wallet sub-page">
    <nav-bar :title="$t('编辑钱包')"></nav-bar>
    <div class="container">
      <div class="info-box">
        <van-cell class="type"
                  :title="title"
                  is-link
                  arrow-direction="down"/>
        <van-field v-model="walletAddress"
                   type="textarea"
                   class="wallet-address"
                   :placeholder="$t('请输入新钱包地址')"/>
        <van-field v-model="confirmWalletAddress"
                   type="textarea"
                   class="wallet-address"
                   :placeholder="$t('请输入确认新钱包地址')"/>
<!--        <van-field v-model="phone" type="phone" placeholder="请输入手机号码"></van-field>-->
<!--        <van-field v-model="code" type="digit" placeholder="请输入验证码">-->
<!--          <template #button>-->
<!--            <van-button class="get-code"-->
<!--                        @click="handleSendOpt"-->
<!--                        :loading="optLoading"-->
<!--                        loading-type="spinner"-->
<!--                        :loading-text="$t('正在获取...')"-->
<!--                        :disabled="disabledSend">-->
<!--              <span v-if="!disabledSend">{{ $t('获取验证码') }}</span>-->
<!--              <van-count-down :time="time" format="ss s" v-else @finish="handleFinish"/>-->
<!--            </van-button>-->
<!--          </template>-->
<!--        </van-field>-->
      </div>
      <div class="btn-box">
        <van-button block @click="handleSave" :loading="buttonLoading"
                    loading-type="spinner" :loading-text="$t('正在编辑...')">{{ $t('保存') }}</van-button>
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
    <result-dialog :visible.sync="showResult" :result="$t('编辑成功')" :btn="false" :desc="$t('正在跳转页面...')"></result-dialog>
  </div>
</template>

<script>
export default {
  name: "edit-wallet",
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
      confirmWalletAddress: '',
      phone: '',
      code: '',
      time: 180 * 1000,
      disabledSend: false,
      optLoading: false,
      visible: false,
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
    // async handleSendOpt() {
    //   if (!this.phone) return this.$toast(this.$t('请输入手机号码'))
    //   this.optLoading = true
    //   const params = {tel: this.areaCode + this.mobileNumber}
    //   try {
    //     const res = await this.$api.home.smsVerify(params)
    //     if (res.code === 1) {
    //       this.$toast.success(res.msg)
    //       this.disabledSend = true
    //     } else {
    //       this.$toast.fail(res.msg || res.message)
    //     }
    //   } catch (e) {
    //     this.$toast.fail(this.$t('发生错误'));
    //   } finally {
    //     this.optLoading = false
    //   }
    // },
    // handleFinish () {
    //   this.disabledSend = false
    // },
    handleChangeType(type) {
      this.type = type
      this.visible = false
    },
    handleShowType () {
      this.visible = true
    },
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
      height: 44px;
      background-color: #f6f6f6;
      border-radius: 10px;
      padding-left: 15px;
    }

    ::v-deep .van-field__control {
      font-family: PingFang-SC-Medium;
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 19px;
      letter-spacing: 0px;
      color: #666666;
    }

    ::v-deep .wallet-address  .van-field__body {
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
  .get-code {
    width: 100px;
    height: 24px;
    background-color: #ff6c1e;
    border-radius: 5px;
    font-family: PingFang-SC-Medium;
    font-size: 11px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 12px;
    letter-spacing: 0px;
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
