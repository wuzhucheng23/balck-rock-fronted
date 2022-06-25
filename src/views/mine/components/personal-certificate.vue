<template>
  <div class="personal-certificate sub-page">
    <nav-bar :title="$t('个人认证')"></nav-bar>
    <div class="container">
      <div class="info-box">
        <div class="title">{{ $t('身份认证') }}</div>
        <div class="content">
          <div class="content-item">
            <div class="text">{{ $t('证件类型') }}</div>
            <div class="value">
              <van-field type="text" :value="type" readonly></van-field>
            </div>
          </div>
          <div class="content-item">
            <div class="text">{{ $t('姓名') }}</div>
            <div class="value">
              <van-field v-model="name" type="text" :placeholder="$t('请输入姓名')"></van-field>
            </div>
          </div>
          <div class="content-item">
            <div class="text">{{ $t('证件号码') }}</div>
            <div class="value">
              <van-field v-model="certificate" type="text" :placeholder="$t('请输入证件号码')"></van-field>
            </div>
          </div>
        </div>
      </div>
      <div class="btn-box">
        <van-button block @click="handleBind" :loading="buttonLoading"
                    loading-type="spinner" :loading-text="$t('正在绑定...')">{{ $t('绑定') }}</van-button>
      </div>
    </div>
    <result-dialog :visible.sync="showResult" :result="$t('绑定成功')" :btn="false" :desc="$t('正在跳转页面...')"></result-dialog>
  </div>
</template>

<script>
export default {
  name: "personal-certificate",
  data() {
    return {
      type: this.$t('身份证'),
      name: '',
      certificate: '',
      buttonLoading: false,
      showResult: false
    }
  },
  created() {
    this.profile()
  },
  methods: {
    async profile() {
      try {
        this.loading = true
        const resp = await this.$api.mine.profile();
        if (resp.code === 1) {
          const data = resp.data
          this.name = data.real_name
          this.certificate = data.id_card_num
        } else {
          // this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      } finally {
        this.loading = false
      }
    },
    async handleBind() {
      if (!this.name) return this.$toast(this.$t('请输入姓名'))
      if (!this.certificate) return this.$toast(this.$t('请输入证件号码'))
      const params = {
        name: this.name,
        id_card: this.certificate,
      }
      try {
        this.buttonLoading = true
        const res = await this.$api.mine.auth(params)
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
  height: calc(100% - 50px);
  overflow: auto;
  .info-box {
    margin-bottom: 30px;
    .title {
      font-family: PingFang-SC-Medium;
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 36px;
      letter-spacing: 0px;
      color: #666666;
      padding-left: 20px;
    }
    .content {
      .content-item {
        .text {
          font-family: PingFang-SC-Medium;
          font-size: 12px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 12px;
          letter-spacing: 0px;
          color: #333333;
          padding-top: 15px;
          padding-left: 20px;
          background: #ffffff;
        }
        .van-cell {
          padding-left: 21px;
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
        }
        ::v-deep .van-field .van-field__control{
          font-family: PingFang-SC-Medium;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #333333;
        }
      }
    }
  }
  .btn-box {
    padding: 0 15px 15px;
    .van-button {
      height: 48px;
      background-color: #fc6324;
      border-radius: 10px;
      font-family: PingFang-SC-Medium;
      font-size: 18px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 12px;
      letter-spacing: 0px;
      color: #ffffff;
    }
  }
}
</style>