<template>
  <div class="setting-up  sub-page">
    <nav-bar :title="$t('设置')"/>
    <div class="container">
      <div class="set-box">
        <div class="set-item"
             v-for="item in setList"
             :key="item.title"
             @click="handleClick(item)">
          <span>{{ item.title }}</span>
          <van-image :src="require('@/assets/mine/right-arrow-icon.png')"/>
        </div>
      </div>
    </div>
    <van-dialog
        v-model="visible"
        width="305px"
        :show-confirm-button="false">
      <div class="dialog-container">
        <van-image
            :src="require('@/assets/mine/close-icon.png')" class="close-icon"
            @click="visible = false"
        />
        <div class="title">{{ type === 'login' ? $t('登陆密码') : $t('取款密码') }}</div>
        <div class="field-box">
          <div class="title">{{ type === 'login' ? $t('旧密码') : $t('密码') }}</div>
          <van-field v-model="oldPwd" type="password" :placeholder="$t('请输入')"></van-field>
          <div class="title">{{ type === 'login' ? $t('新密码') : $t('确认密码') }}</div>
          <van-field v-model="newPwd" type="password" :placeholder="$t('请输入')"></van-field>
          <div class="forget-text">
            <span v-if="type === 'login'"
                  @click="$utils.toRoute('ForgetPassword', '忘记密码')">
              {{ $t('忘记密码') }}
            </span>
          </div>
        </div>
        <div class="btn-box">
          <van-button block @click="handleUpdate">{{ $t('确定') }}</van-button>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
export default {
  name: "SettingUp",
  data() {
    const setList = [
      {
        title: this.$t('登陆密码'),
        name: 'updateLoginPwd'
      },
      {
        title: this.$t('取款密码'),
        name: 'updateWithdrawPwd'
      },
      {
        title: this.$t('语言设置'),
        name: 'LanguageSet'
      },
    ]
    return {
      setList,
      visible: false,
      oldPwd: '',
      newPwd: '',
      type: 'login'
    }
  },
  methods: {
    handleClick(item) {
      if (item.name !== 'LanguageSet') {
        this.type = item.name === 'updateLoginPwd' ? 'login' : 'withdraw'
        return this.visible = true
      }
      this.$utils.toRoute(item.name, item.title)
    },
    async handleUpdate() {
      if (!this.oldPwd) return this.$toast(this.$t('请填写完整密码信息'))
      if (!this.newPwd) return this.$toast(this.$t('请填写完整密码信息'))
      if (this.type === 'login') {
        const params = {
          password: this.oldPwd,
          new_password: this.newPwd,
        }
        try {
          this.buttonLoading = true
          const res = await this.$api.mine.resetPwd(params)
          if (res.code === 1) {
            this.$toast.success(res.msg)
            this.$utils.delayBack()
          } else {
            this.$toast.fail(res.msg || res.message)
          }
        } catch (e) {
          this.$toast.fail(this.$t('发生错误'))
        } finally {
          this.buttonLoading = false
        }
      } else {
        const params = {
          password: this.oldPwd,
          password_confirm: this.newPwd,
        }
        try {
          this.buttonLoading = true
          const res = await this.$api.mine.setpp(params)
          if (res.code === 1) {
            this.$toast.success(res.msg)
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
    }
  },
}
</script>

<style scoped lang="less">
.container {
  padding-top: 5px;
  height: calc(100% - 50px);
  overflow: auto;

  .set-box {
    .set-item {
      height: 48px;
      background-color: #ffffff;
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 15px;

      span {
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        line-height: 14px;
        color: #333333;
      }

      &::after {
        content: '';
        display: block;
        height: 1px;
        background-color: #f6f6f6;
        border-radius: 1px;
        position: absolute;
        left: 15px;
        right: 15px;
        bottom: 0;
      }

      .van-image {
        width: 10px;
        height: 18px;
      }
    }
  }
}

.van-dialog {
  border-radius: 10px;
}

.dialog-container {
  height: 305px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 15px;
  position: relative;

  .title {
    font-family: PingFang-SC-Bold;
    font-size: 16px;
    line-height: 16px;
    color: #333333;
    text-align: center;
    margin-bottom: 25px;
  }

  .close-icon {
    position: absolute;
    right: 15px;
    top: 15px;
    width: 13px;
    height: 13px;
  }

  .field-box {
    .title {
      font-family: PingFang-SC-Medium;
      font-size: 14px;
      color: #333333;
      line-height: 14px;
      margin-bottom: 10px;
      text-align: left;
    }

    .van-cell {
      height: 48px;
      background-color: #f5f5f5;
      border-radius: 10px;
    }

    .van-field {
      margin-bottom: 10px;
    }

    .forget-text {
      text-align: right;
      margin-bottom: 9px;
      height: 12px;

      span {
        font-family: PingFang-SC-Medium;
        text-decoration: underline;
        font-size: 12px;
        color: #999999;
      }
    }
  }

  .btn-box {
    .van-button {
      height: 44px;
      background-color: #fc6324;
      border-radius: 22px;
      font-family: PingFang-SC-Medium;
      font-size: 14px;
      line-height: 12px;
      color: #ffffff;
    }
  }
}
</style>
