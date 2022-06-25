<template>
  <div class="shipping-address sub-page">
    <nav-bar :title="$t('收货地址')"></nav-bar>
    <div class="container">
      <div class="info-box">
        <div class="info-item">
          <div class="title">{{ $t('姓名') }}</div>
          <div class="value">
            <van-field v-model="name" type="text" :placeholder="$t('请输入姓名')"></van-field>
          </div>
        </div>
        <div class="info-item">
          <div class="title">{{ $t('联系电话') }}</div>
          <div class="value">
            <van-field v-model="phone" type="tel" :placeholder="$t('请输入联系电话')"></van-field>
          </div>
        </div>
        <div class="info-item">
          <div class="title">{{ $t('收货地址') }}</div>
          <div class="value">
            <van-field v-model="address" type="text" :placeholder="$t('请输入收货地址')"></van-field>
          </div>
        </div>
        <div class="tip">
          <div class="title">{{ $t('提示') }}</div>
          <div class="value">
            {{ $t('请正确填写地址信息') }}
          </div>
        </div>
      </div>
    </div>
    <div class="btn-box">
      <van-button block @click="handleSave" :loading="buttonLoading"
                  loading-type="spinner" :loading-text="$t('正在保存...')">{{ $t('保存') }}</van-button>
    </div>
    <result-dialog :visible.sync="showResult" :result="$t('保存成功')" :btn="false" :desc="$t('正在跳转页面...')"></result-dialog>
  </div>
</template>

<script>
export default {
  name: "shipping-address",
  data() {
    return {
      name: '',
      phone: '',
      address: '',
      id: undefined,
      visible: false,
      buttonLoading: false,
      showResult: false
    }
  },
  created() {
    this.getAddress()
  },
  methods: {
    async getAddress () {
      try {
        this.loading = true
        const resp = await this.$api.mine.getAddress();
        if (resp.code === 1) {
          const data = resp.data
          this.name = data.name
          this.phone = data.tel
          this.address = data.address
          this.id = data.id
        } else {
          // this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      } finally {
        this.loading = false
      }
    },
    async handleSave() {
      if (!this.name) return this.$toast(this.$t('请输入姓名'))
      if (!this.phone) return this.$toast(this.$t('请输入联系电话'))
      if (!this.address) return this.$toast(this.$t('请输入收货地址'))
      const params = {
        name: this.name,
        tel: this.phone,
        address: this.address,
        id: this.id
      }
      try {
        this.buttonLoading = true
        const res = await this.$api.mine.addAddress(params)
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
  height: calc(100% - 120px);
  overflow: auto;
  padding: 20px 10px 20px;
  .info-box {
    height: 360px;
    background: #ffffff;
    .info-item {
      height: 80px;
      border-bottom: 1px solid #eeeeee;
      .title {
        font-family: PingFang-SC-Medium;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #999999;
        line-height: 13px;
        padding-top: 22px;
        padding-left: 15px;
      }
    }
    .tip {
      padding: 22px 15px 15px;
      .title {
        font-family: PingFang-SC-Medium;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #999999;
        margin-bottom: 15px;
      }
      .value {
        font-family: PingFang-SC-Medium;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 17px;
        letter-spacing: 0px;
        color: #999999;
      }
    }
  }
}
.btn-box {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  padding: 0 15px 20px;
  .van-button {
    height: 50px;
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
</style>