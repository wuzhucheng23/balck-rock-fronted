<template>
  <div class="recharge-confirm sub-page">
    <nav-bar :title="$t('充值确认')"/>
    <div class="container">
      <div class="deposit-info-box">
        <van-cell-group>
          <van-cell :title="$t('货币数量')" :value="account"></van-cell>
          <van-cell :title="$t('货币类型')" :value="type"></van-cell>
        </van-cell-group>
      </div>
      <div class="address-box">
        <span v-show="false" ref="address">{{ address }}</span>
        <div class="title">{{ $t('付款地址') }}</div>
        <van-field v-model="address" type="text" readonly>
          <template #button>
            <van-button class="copy" @click="handleCopyLink">
              <span>{{ $t('复制') }}</span>
            </van-button>
          </template>
        </van-field>
      </div>
      <div class="bottom-box">
        <div class="title">{{ $t('请上传交易截图') }}</div>
        <van-uploader
            v-model="fileList"
            :max-count="1"
            :after-read="handleUpload"
            @click="imageUrl = ''"
        />
      </div>
      <div class="bottom-box">
        <div class="title">{{ $t('哈希码') }}</div>
        <van-field
            v-model="hashCode"
            type="textarea"
            :placeholder="$t('请输入哈希码')"
            :rows="3"
        />
      </div>
      <div class="confirm-btn">
        <van-button
            block
            loading-type="spinner"
            :loading="buttonLoading"
            :loading-text="$t('正在存款...')"
            @click="handleDeposit">
          <span>{{ $t('确认') }}</span>
        </van-button>
      </div>
    </div>
    <result-dialog
        :visible.sync="visible"
        :result="$t('充值成功')"
        :btn="false"
        :desc="$t('正在跳转页面...')"
    />
  </div>
</template>

<script>
export default {
  name: "RechargeConfirm",
  data() {
    return {
      fileList: [],
      imageUrl: '',
      hashCode: '',
      buttonLoading: false,
      instructions: '',
      visible: false
    }
  },
  computed: {
    type() {
      return this.$route.query.type
    },
    money() {
      return this.$route.query.money
    },
    address() {
      return this.$route.query.address
    },
    account() {
      return this.$route.query.account
    },
  },
  created() {
    this.recharge()
  },
  methods: {
    async recharge() {
      try {
        const resp = await this.$api.mine.recharge();
        if (resp.code === 1) {
          const data = resp.data
          this.instructions = data.detail
        } else {
          this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      }
    },
    async handleUpload(file) {
      file.status = 'uploading';
      file.message = this.$t('加载中...');
      try {
        const form = new FormData()
        form.append('proof', file.file)
        const res = await this.$api.mine.upload(form)
        if (res.code === 1) {
          this.imageUrl = res.data.file_path
          file.status = 'success';
        } else {
          this.$toast.fail(res.msg || res.message)
          file.status = 'failed';
          file.message = this.$t('失败');
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      }
    },
    async handleDeposit() {
      try {
        this.buttonLoading = true
        if (!this.money) return this.$toast(this.$t('请输入充值金额'))
        if (!this.hashCode) return this.$toast(this.$t('请输入哈希码'))
        if (this.fileList.length <= 0) return this.$toast(this.$t('请上传交易截图'))
        if (!this.imageUrl) return this.$toast(this.$t('图片上传中，请重试'))
        const params = {
          type: this.type,
          amount: +this.account,
          proof: this.imageUrl,
          hashcode: this.hashCode
        }
        const res = await this.$api.mine.topup(params)
        if (res.code === 1) {
          this.visible = true
          this.$utils.delayBack()
        } else {
          this.$toast.fail(res.msg || res.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'))
      } finally {
        this.buttonLoading = false
      }
    },
    handleCopyLink() {
      this.$utils.copy(this.$refs.address)
      this.$toast(this.$t('复制付款地址链接成功'))
    },
  },
}
</script>

<style scoped lang="less">
.container {
  height: calc(100% - 50px);
  overflow: auto;
  padding-top: 8px;
}

.deposit-info-box {
  margin-bottom: 10px;
}

.address-box {
  height: 108px;
  padding: 15px;
  background: #fff;
  margin-bottom: 10px;

  .title {
    font-size: 14px;
    color: #333;
    margin-left: 5px;
    margin-bottom: 15px;
  }

  .van-field {
    border-radius: 10px;
    background: #f6f6f6;
    margin-bottom: 15px;
    color: #333;
    font-size: 12px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  ::v-deep .van-cell::after {
    display: none;
  }

  ::v-deep .van-field__control {
    padding-right: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .copy {
    width: 60px;
    height: 34px;
    line-height: 24px;
    background: #ff6c1e;
    border: 1px solid #ff6c1e;
    color: #fff;
    border-radius: 6px;
    font-size: 14px;
    position: absolute;
    right: -10px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 99;
  }
}

.bottom-box {
  padding: 15px;
  background: #fff;
  margin-bottom: 10px;

  .title {
    font-size: 14px;
    color: #333;
    margin-left: 5px;
    margin-bottom: 15px;
  }

  .van-uploader {
    ::v-deep .van-uploader__upload {
      width: 90px;
      height: 90px;
      border-radius: 10px;
    }
  }

  .van-field {
    height: 90px;
    background-color: #f6f6f6;
    border-radius: 10px;
  }
}

.confirm-btn {
  padding: 25px 15px;

  .van-button {
    border-radius: 10px;
    background: #ff6c1e;
    border: 1px solid #ff6c1e;
    height: 48px;
    line-height: 48px;
    font-size: 18px;
    color: #fff;
  }
}

.tip-box {
  padding: 0 15px;

  div {
    color: #999;
    font-size: 12px;
    margin-bottom: 15px;
    text-align: justify;
  }

  .title {
    font-size: 14px;
  }
}
</style>
