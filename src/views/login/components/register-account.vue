<template>
  <div class="register-account sub-page">
    <div class="container">
      <div class="title-box">
        <div>
          <van-image :src="require('@/assets/login/logo.png')" class="logo-img"/>
        </div>
        <div>
          <van-image :src="require('@/assets/login/logo-text.png')" class="logo-text-img"/>
        </div>
      </div>
      <div class="field-box">
        <div class="field-item">
          <div class="field-title">
            <van-image :src="require('@/assets/login/invite-icon.png')"/>
            <span>{{ $t('邀请码') }}</span>
          </div>
          <div class="field-value">
            <van-field v-model="inviteCode" :placeholder="$t('请输入邀请码')" type="text"/>
          </div>
        </div>
        <div class="field-item">
          <div class="field-title">
            <van-image :src="require('@/assets/login/email-icon.png')"/>
            <span>{{ $t('邮箱') }}</span>
          </div>
          <div class="field-value">
            <van-field v-model="email" :placeholder="$t('请输入邮箱')" type="text"/>
          </div>
        </div>
        <div class="field-item">
          <div class="field-title">
            <van-image :src="require('@/assets/login/code-icon.png')"/>
            <span>{{ $t('验证码') }}</span>
          </div>
          <div class="field-value">
            <van-field v-model="certificateCode" :placeholder="$t('请输入验证码')" type="digit"/>
          </div>
          <van-button
              class="send-opt"
              loading-type="spinner"
              :loading="optLoading"
              :loading-text="$t('正在获取...')"
              :disabled="disabledSend"
              @click="handleSendOpt">
            <span v-if="!disabledSend">{{ $t('获取验证码') }}</span>
            <van-count-down :time="time" format="ss s" v-else @finish="disabledSend = false"/>
          </van-button>
        </div>
        <div class="field-item">
          <div class="field-title">
            <van-image :src="require('@/assets/login/password-icon.png')"/>
            <span>{{ $t('密码') }}</span>
          </div>
          <div class="field-value">
            <van-field v-model="password" :placeholder="$t('请输入密码')" type="password"/>
          </div>
        </div>
        <div class="field-item">
          <div class="field-title">
            <van-image :src="require('@/assets/login/name-icon.png')"/>
            <span>{{ $t('电话号码') }}</span>
          </div>
          <div class="field-value">
            <van-field v-model="phone" :placeholder="$t('请输入电话号码')" type="text">
              <template #label>
                <van-field
                    class="area-code-field"
                    v-model="areaCode"
                    type="text"
                    :placeholder="$t('区号')"
                    label="+"
                    label-width="5px"/>
              </template>
            </van-field>
          </div>
        </div>
        <div class="operation">
          <div class="language-wrap" @click="$utils.toRoute('LanguageSet', '语言设置')">
            <van-image :src="require('@/assets/login/language-icon.png')"/>
            <span>{{ $t('语言') }}</span>
          </div>
          <div class="forger-password" @click="$utils.toRoute('LoginIndex', '登陆首页')">{{ $t('前往登陆') }}</div>
        </div>
      </div>
      <div class="btn-box">
        <van-button block
                    loading-type="spinner"
                    :loading="loading"
                    :loading-text="$t('正在注册...')"
                    @click="handleRegister">
          <span>{{ $t('注册') }}</span>
          <van-image :src="require('@/assets/login/arrow-icon.png')" class="arrow-icon"/>
        </van-button>
        <van-button block class="back" @click="$router.back()">
          <span>{{ $t('返回') }}</span>
        </van-button>
      </div>
    </div>
    <result-dialog
        :visible.sync="visible"
        :result="$t('注册成功')"
        :btn="false"
        :desc="$t('正在跳转页面...')"
    />
  </div>
</template>

<script>
import Fingerprint2 from 'fingerprintjs2'

export default {
  name: "RegisterAccount",
  data() {
    return {
      phone: '',
      username: '',
      password: '',
      inviteCode: '',
      email: '',
      areaCode: '',
      certificateCode: '',
      loading: false,
      finger: '',
      time: 180 * 1000,
      disabledSend: false,
      optLoading: false,
      visible: false,
    }
  },
  created() {
    const code = this.$route.query.code
    if (code) this.inviteCode = code
    this.getFinger()
  },
  methods: {
    getFinger() {   // 获取游览器指纹
      Fingerprint2.get((components) => {
        const values = components.map(function (component, index) {
          if (index === 0) { //把微信浏览器里UA的wifi或4G等网络替换成空,不然切换网络会ID不一样
            return component.value.replace(/\bNetType\/\w+\b/, '')
          }
          return component.value
        })
        // 生成最终id murmur
        const murmur = Fingerprint2.x64hash128(values.join(''), 31);
        this.finger = murmur
      })
    },
    async handleSendOpt() {
      if (!this.email) return this.$toast(this.$t('请输入邮箱'))
      const params = {
        email: this.email,
        type: 1,
      }
      try {
        this.optLoading = true
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
    async handleRegister() {
      if (!this.inviteCode) return this.$toast(this.$t('请输入邀请码'))
      if (!this.email) return this.$toast(this.$t('请输入邮箱'))
      if (!this.areaCode) return this.$toast(this.$t('请输入区号'))
      if (!this.phone) return this.$toast(this.$t('请输入电话号码'))
      if (!this.certificateCode) return this.$toast(this.$t('请输入验证码'))
      if (!this.password) return this.$toast(this.$t('请输入密码'))
      if (this.password.length < 6) return this.$toast(this.$t('密码不能少于6位字符'))
      const params = {
        tel: this.email,
        password: this.password,
        invite_code: this.inviteCode,
        verify_code: this.certificateCode,
        guid: this.finger,
        phone: this.areaCode + this.phone,
      }
      try {
        this.loading = true
        const res = await this.$api.login.registered(params)
        if (res.code === 1) {
          this.visible = true
          localStorage.setItem('token', 'Bearer ' + res.data.token)
          this.$utils.delayPush('HomeIndex', '首页', {visible: true})
        } else {
          this.$toast.fail(res.msg || res.message)
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
.container {
  height: 100%;
  overflow: auto;
  padding-top: 102px;
  background: url("../../../assets/login/login-bk.png") no-repeat center/cover;

  ::v-deep .van-field__control {
    color: #ffffff;
  }

  .title-box {
    text-align: center;
    margin-bottom: 48px;

    .logo-img {
      width: 88px;
      height: 88px;
      margin-bottom: 15px;
    }

    .logo-text-img {
      width: 142px;
      height: 24px;
    }
  }

  .field-box {
    padding: 0 49px;
    margin-bottom: 34px;

    .field-item {
      margin-bottom: 21px;
      position: relative;

      .field-title {
        display: flex;
        height: 22px;
        align-items: center;
        margin-bottom: 4px;

        .van-image {
          width: 20px;
          height: 22px;
          margin-right: 16px;
        }

        span {
          font-family: PingFang-SC-Bold;
          font-size: 12px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 12px;
          letter-spacing: 0px;
          color: #f7dbae;
        }
      }

      .field-value {
        .van-cell {
          padding: 0;
          background: transparent;
          border-bottom: 1px solid #f1d0a4;
        }
      }

      .van-button {
        position: absolute;
        top: 0;
        right: 0;
        width: 88px;
        height: 27px;
        border-radius: 14px;
        background: transparent;
        border: solid 1px #f7dbae;
        font-family: PingFang-SC-Medium;
        font-size: 11px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 12px;
        letter-spacing: 0px;
        color: #f7dbae;
        padding: 0;
      }
    }

    .operation {
      display: flex;
      justify-content: space-between;

      .language-wrap {
        display: flex;
        height: 16px;
        align-items: center;

        .van-image {
          width: 16px;
          height: 16px;
          margin-right: 10px;
        }

        span {
          font-family: PingFang-SC-Medium;
          font-size: 12px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 12px;
          letter-spacing: 0px;
          color: #f7dbae;
        }
      }

      .forger-password {
        font-family: PingFang-SC-Regular;
        font-size: 11px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 16px;
        letter-spacing: 0px;
        color: #f7dbae;
      }
    }
  }

  .btn-box {
    padding: 0 49px;

    .van-button {
      height: 50px;
      background-color: #ff6c1e;
      border-color: #ff6c1e;
      border-radius: 25px;
      margin-bottom: 30px;
      font-family: PingFang-SC-Medium;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #ffffff;
      position: relative;

      .van-image {
        width: 22px;
        height: 20px;
        position: absolute;
        right: 19px;
        top: 15px;
        bottom: 15px;
      }
    }

    .back {
      background: #ffffff;
      border-color: #ffffff;
      color: #ff6c1e;
    }
  }
}

::v-deep .van-count-down {
  color: #f7dbae;
}

::v-deep .van-loading--spinner {
  position: relative;
  top: -1px;
  margin-right: 6px;
}

::v-deep .van-popup--bottom {
  border-radius: 10px 10px 0 0;
}

::v-deep .van-field__label {
  color: #fff;
  font-size: 18px;
  width: unset;
  margin-right: 16px;
}

.area-code-field {
  width: 90px;
  border-bottom: 0 !important;
}
</style>
