<template>
  <div class="language-set sub-page">
    <nav-bar :title="$t('语言设置')"></nav-bar>
    <div class="container">
      <div class="language-box">
        <div class="language-item" v-for="item in setList" :key="item.title" @click="handleClick(item)">
          <span>{{ item.title }}</span>
          <van-image :src="require('@/assets/mine/correct-icon.png')" v-if="item.value === value"></van-image>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "language-set",
  data() {
    const setList = [
      {
        title: 'English',
        value: 'en'
      },
      {
        title: '简体中文',
        value: 'cn'
      },
      {
        title: 'Português',
        value: 'po'
      },
    ]
    return {
      setList,
      value: 'en'
    }
  },
  created() {
    this.value = localStorage.getItem('locale')
  },
  methods: {
    handleClick(item) {
      const locale = item.value
      this.value = locale
      localStorage.setItem('locale', locale)
      this.$i18n.locale = locale
      this.$toast.success(this.$t('设置成功'))
      this.$utils.delayBack()
    },

  },
}
</script>

<style scoped lang="less">
.container {
  padding-top: 5px;
  height: calc(100% - 50px);
  overflow: auto;

  .language-box {
    .language-item {
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
        font-weight: normal;
        font-stretch: normal;
        line-height: 14px;
        letter-spacing: 0px;
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
        bottom: 0px;
      }
      .van-image {
        width: 19px;
        height: 14px;
      }
    }
  }
}
</style>