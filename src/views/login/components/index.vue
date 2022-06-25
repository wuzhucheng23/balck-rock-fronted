<template>
  <div class="index sub-page">
    <div class="container">
      <div class="title-box">
        <van-image :src="require('@/assets/login/logo-text.png')"></van-image>
      </div>
      <div class="field-box">
        <div class="field-item">
          <div class="field-title">
            <van-image :src="require('@/assets/login/login-icon.png')"></van-image>
            <span>{{ $t('邮箱') }}</span>
          </div>
          <div class="field-value">
            <van-field v-model="username" :placeholder="$t('请输入邮箱')" type="text"></van-field>
          </div>
        </div>
        <div class="field-item">
          <div class="field-title">
            <van-image :src="require('@/assets/login/password-icon.png')"></van-image>
            <span>{{ $t('密码') }}</span>
          </div>
          <div class="field-value">
            <van-field v-model="password" :placeholder="$t('请输入密码')" type="password"></van-field>
          </div>
        </div>
        <div class="operation">
          <div class="language-wrap" @click="handleToLanguage">
            <van-image :src="require('@/assets/login/language-icon.png')"></van-image>
            <span>{{ $t('语言') }}</span>
          </div>
          <div class="forger-password" @click="handleToForgetPassword">{{ $t('忘记密码？') }}</div>
        </div>
      </div>
      <div class="btn-box">
        <van-button block @click="handleLogin" :loading="loading"
                    loading-type="spinner" :loading-text="$t('正在登陆...')">
          <span>{{ $t('登陆') }}</span>
          <van-image :src="require('@/assets/login/arrow-icon.png')" class="arrow-icon"></van-image>
        </van-button>
        <van-button block class="register" @click="handleToRegister">
          <span>{{ $t('注册账号') }}</span>
        </van-button>
      </div>
    </div>
    <result-dialog :visible.sync="visible" :result="$t('登陆成功')" :btn="false" :desc="$t('正在跳转页面...')"></result-dialog>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      username: '',
      password: '',
      loading: false,
      visible: false
    }
  },
  methods: {
    handleToLanguage() {
      this.$router.push({
        name: 'languageSet',
        label: '语言设置'
      })
    },
    handleToRegister () {
      this.$router.push({
        name: 'register',
        label: '注册'
      })
    },
    handleToForgetPassword () {
      this.$router.push({
        name: 'forgetPassword',
        label: '忘记密码'
      })
    },
    async handleLogin() {
      if (!this.username) return this.$toast(this.$t('Please enter mobile username'));
      if (!this.password) return this.$toast(this.$t('Please enter password'));
      this.loading = true;
      const params = {
        tel: this.username,
        pwd: this.password,
      }
      try {
        const res = await this.$api.login.login(params);
        if (res.code === 1) {
          // this.$toast.success(res.msg)
          this.visible = true
          localStorage.setItem('token', 'Bearer ' + res.data.token)
          this.$utils.delayPush('homeIndex', '首页')
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
  height: 100vh;
  overflow: auto;
  padding-top: 102px;
  background: url("../../../assets/login/login-bk.png") no-repeat center/cover;
  ::v-deep .van-field__control {
    color: #ffffff;
  }
  .title-box {
    text-align: center;
    margin-bottom: 48px;
    .van-image {
      width: 166px;
      height: 132px;
    }
  }
  .field-box {
    padding: 0 49px;
    margin-bottom: 34px;
    .field-item {
      margin-bottom: 21px;
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
    .register {
      background: #ffffff;
      border-color: #ffffff;
      color: #ff6c1e;
    }
  }
}
</style>