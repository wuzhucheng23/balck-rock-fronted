<template>
  <div class="forget-password sub-page">
    <nav-bar :title="$t('忘记密码')"></nav-bar>
    <div class="container">
      <div class="info-box">
        <div class="content">
          <div class="content-item">
            <div class="text">{{ $t('邮箱') }}</div>
            <div class="value">
              <van-field v-model="email" type="text" :placeholder="$t('请输入邮箱')"></van-field>
            </div>
          </div>
          <div class="content-item">
            <div class="text">{{ $t('验证码') }}</div>
            <div class="value">
              <van-field v-model="certificateCode" type="text" :placeholder="$t('请输入验证码')">
                <template #button>
                  <van-button class="get-code"
                              @click="handleSendOpt"
                              :loading="optLoading"
                              loading-type="spinner"
                              :loading-text="$t('正在获取...')"
                              :disabled="disabledSend">
                    <span v-if="!disabledSend">{{ $t('获取验证码') }}</span>
                    <van-count-down :time="time" format="ss s" v-else @finish="handleFinish"/>
                  </van-button>
                </template>
              </van-field>
            </div>
          </div>
          <div class="content-item">
            <div class="text">{{ $t('新密码') }}</div>
            <div class="value">
              <van-field v-model="newPwd" type="text" :placeholder="$t('请输入新密码')"></van-field>
            </div>
          </div>
          <div class="content-item">
            <div class="text">{{ $t('确认新密码') }}</div>
            <div class="value">
              <van-field v-model="repeatNewPwd" type="text" :placeholder="$t('请输入确认新密码')"></van-field>
            </div>
          </div>
        </div>
      </div>
      <div class="btn-box">
        <van-button block @click="handleUpdatePassword" :loading="loading"
                    loading-type="spinner" :loading-text="$t('正在修改...')">{{ $t('确定') }}</van-button>
      </div>
    </div>
    <result-dialog :visible.sync="visible" :result="$t('修改成功')" :btn="false" :desc="$t('正在跳转页面...')"></result-dialog>
  </div>
</template>

<script>
export default {
  name: "forget-password",
  data() {
    return {
      email: '',
      certificateCode: '',
      newPwd: '',
      repeatNewPwd: '',
      time: 60 * 1000,
      disabledSend: false,
      optLoading: false,
      loading: false,
      visible: false
    }
  },
  methods: {
    async handleSendOpt() {
      if (!this.email) return this.$toast(this.$t('请输入邮箱'))
      this.optLoading = true
      const params = {email: this.email, type: 4}
      try {
        const res = await this.$api.login.emailVerify(params)
        if (res.code === 1) {
          this.$toast.success(res.msg)
          this.disabledSend = true
        } else {
          this.$toast.fail(res.msg || res.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      } finally {
        this.optLoading = false
      }
    },
    async handleUpdatePassword () {
      if (!this.email) return this.$toast(this.$t('请输入邮箱'))
      if (!this.certificateCode) return this.$toast(this.$t('请输入验证码'))
      if (!this.newPwd) return this.$toast(this.$t('请输入新密码'))
      if (!this.repeatNewPwd) return this.$toast(this.$t('请输入确认新密码'))
      if (this.newPwd.length < 6) return this.$toast(this.$t('密码不能少于6位字符'))
      if (this.newPwd !== this.repeatNewPwd) return this.$toast(this.$t('新密码与确认新密码不一致'))
      this.loading = true
      const params = {
        email: this.email,
        verify_code: this.certificateCode,
        password: this.newPwd,
        password_confirm: this.repeatNewPwd,
      }
      try {
        const res = await this.$api.login.changePwd(params)
        if (res.code === 1) {
          // this.$toast.success(res.msg)
          this.visible = true
          this.$utils.delayBack()
        } else {
          this.$toast.fail(res.msg || res.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      } finally {
        this.loading = false
      }
    },
    handleFinish () {
      this.disabledSend = false
    }
  },
}
</script>

<style scoped lang="less">
.container {
  padding-top: 15px;
  height: calc(100% - 50px);
  overflow: auto;
  .info-box {
    margin-bottom: 30px;
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
      .get-code {
        width: 88px;
        height: 27px;
        background-color: #ff6c1e;
        border-radius: 14px;
        padding: 0;
        border-color: #ff6c1e;
        font-family: PingFang-SC-Medium;
        font-size: 11px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 12px;
        letter-spacing: 0px;
        color: #ffffff;
        margin-right: 0;
        position: relative;
        top: -2.5px;
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