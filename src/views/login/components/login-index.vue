<template>
  <div class="login-index sub-page">
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
            <van-image :src="require('@/assets/login/login-icon.png')"/>
            <span>{{ $t('邮箱') }}</span>
          </div>
          <div class="field-value">
            <van-field v-model="username" :placeholder="$t('请输入邮箱')" type="text"/>
          </div>
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
        <div class="operation">
          <div class="language-wrap" @click="$utils.toRoute('LanguageSet', '语言设置')">
            <van-image :src="require('@/assets/login/language-icon.png')"/>
            <span>{{ $t('语言') }}</span>
          </div>
          <div class="forger-password" @click="$utils.toRoute('ForgetPassword', '忘记密码')">
            <span>{{ $t('忘记密码？') }}</span>
          </div>
        </div>
      </div>
      <div class="btn-box">
        <van-button
            block
            loading-type="spinner"
            :loading="loading"
            :loading-text="$t('正在登陆...')"
            @click="handleLogin">
          <span>{{ $t('登陆') }}</span>
          <van-image :src="require('@/assets/login/arrow-icon.png')" class="arrow-icon"/>
        </van-button>
        <van-button block class="register" @click="$utils.toRoute('RegisterAccount', '注册账号')">
          <span>{{ $t('注册账号') }}</span>
        </van-button>
        <div class="oneline-service" @click="handleToService">{{ $t('在线客服') }}</div>
      </div>
    </div>
    <result-dialog
        :visible.sync="visible"
        :result="$t('登陆成功')"
        :btn="false"
        :desc="$t('正在跳转页面...')"
    />
  </div>
</template>

<script>
export default {
  name: "LoginIndex",
  data() {
    return {
      username: '',
      password: '',
      loading: false,
      visible: false,
      serviceList: [],
    }
  },
  created() {
    this.getCustomer()
  },
  methods: {
    async getCustomer() {
      try {
        const resp = await this.$api.service.getCustomer();
        if (resp.code === 1) {
          const data = resp.data
          this.serviceList = data
        } else {
          this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      }
    },
    async handleLogin() {
      if (!this.username) return this.$toast(this.$t('请输入邮箱'));
      if (!this.password) return this.$toast(this.$t('请输入密码'));
      const params = {
        tel: this.username,
        pwd: this.password,
      }
      try {
        this.loading = true;
        const res = await this.$api.login.login(params);
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
    handleToService() {
      const service = this.serviceList.find(item => item.username === '在线服务')
      if (service) window.location.href = service.url
    }
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
          line-height: 12px;
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
          line-height: 12px;
          color: #f7dbae;
        }
      }

      .forger-password {
        font-family: PingFang-SC-Regular;
        font-size: 11px;
        line-height: 16px;
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

    .oneline-service {
      text-align: center;
      font-family: PingFang-SC-Regular;
      font-size: 12px;
      line-height: 16px;
      color: #f7dbae;
    }
  }
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
</style>
