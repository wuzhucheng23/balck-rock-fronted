<template>
  <div class="update-name sub-page">
    <nav-bar :title="$t('修改用户名')"></nav-bar>
    <div class="container">
      <div class="info-box">
        <div class="info-item">
          <div class="title">{{ $t('用户名') }}</div>
          <div class="value">
            <van-field v-model="name" type="text" :placeholder="$t('请输入用户名')"></van-field>
          </div>
        </div>
      </div>
      <div class="btn-box">
        <van-button block @click="handleUpdate" :loading="buttonLoading"
                    loading-type="spinner" :loading-text="$t('正在修改...')">{{ $t('修改') }}</van-button>
      </div>
    </div>
    <result-dialog :visible.sync="showResult" :result="$t('修改成功')" :btn="false" :desc="$t('正在跳转页面...')"></result-dialog>
  </div>
</template>

<script>
export default {
  name: "update-name",
  data() {
    return {
      buttonLoading: false,
      showResult: false,
      name: ''
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
          this.name = data.username
        } else {
          this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      } finally {
        this.loading = false
      }
    },
    async handleUpdate() {
      if (!this.name) return this.$toast(this.$t('请输入用户名'))
      const params = {
        username: this.name,
      }
      try {
        this.buttonLoading = true
        const res = await this.$api.mine.updateUser(params)
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
  padding-top: 10px;
  .info-box {
    background: #ffffff;
    .info-item {
      height: 80px;
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
  padding: 50px 15px 15px;
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