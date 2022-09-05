<!--结果弹窗-->

<template>
  <div class="result-dialog">
    <van-dialog
        v-model.sync="isShow"
        width="325px"
        close-on-click-overlay
        :show-confirm-button="false">
      <div class="dialog-container">
        <div class="img">
          <van-image :src="require('@/assets/common/ok-icon.png')"/>
        </div>
        <div class="result">{{ result }}</div>
        <div class="btn">
          <van-button block @click="handleOk" v-if="btn">
            <span>{{ btnText || $t('确定') }}</span>
          </van-button>
          <div class="dialog-text" v-else>
            <span>{{ desc }}</span>
          </div>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
export default {
  name: "ResultDialog",
  props: {
    visible: {
      type: Boolean,
      default: () => false
    },
    result: {
      type: String,
      default: () => '请输入结果'
    },
    btn: {
      type: Boolean,
      default: () => true
    },
    btnText: {
      type: String,
      default: () => ''
    },
    desc: {
      type: String,
      default: () => ''
    }
  },
  computed: {
    isShow: {
      set(val) {
        this.$emit('update:visible', val);
      },
      get() {
        return this.visible;
      }
    }
  },
  methods: {
    handleOk() {
      this.isShow = false
    }
  },
}
</script>

<style scoped lang="less">
.van-dialog {
  border-radius: 10px;
}

.dialog-container {
  height: 277px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 32px 20px 17px;

  .img {
    text-align: center;
    margin-bottom: 34px;

    .van-image {
      width: 93px;
      height: 93px;
    }
  }

  .result {
    font-family: PingFang-SC-Bold;
    font-size: 18px;
    color: #333333;
    text-align: center;
    line-height: 18px;
    margin-bottom: 34px;
  }

  .btn {
    .van-button {
      height: 50px;
      background-color: #ff6c1e;
      border-radius: 10px;
      font-family: PingFang-SC-Bold;
      font-size: 18px;
      color: #ffffff;
    }

    .dialog-text {
      text-align: center;
      font-family: PingFang-SC-Bold;
      font-size: 14px;
      color: #666666;
      text-align: center;
      line-height: 14px;
    }
  }
}
</style>
