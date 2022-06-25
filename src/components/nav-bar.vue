<template>
  <div class="nav-bar">
    <van-nav-bar
        :left-text="title"
        left-arrow
        :style="{ 'background-color': backgroundColor }"
        @click-left="handleClickLeft">
      <template #right>
        <slot name="right"></slot>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: "nav-bar",
  props: {
    title: {
      type: String,
      default: () => '请传入标题'
    },
    backgroundColor: {
      type: String,
      default: () => '#fff'
    }
  },
  methods: {
    handleClickLeft() {
      this.$router.back();
    }
  }
};
</script>

<style scoped lang="less">
::v-deep .van-nav-bar__text {
  font-family: PingFang-SC-Medium;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #333333;
}

::v-deep .van-icon-arrow-left:before {
  color: #333;
  margin-right: 11px;
  position: relative;
  top: -1px;
}

::v-deep .van-nav-bar__content {
  height: 50px;
}

::v-deep .van-nav-bar__title {
  color: #ffffff;
  font-size: 18px;
}

::v-deep .van-hairline--bottom::after {
  border-bottom-width: 0px;
}

.van-image {
  width: 19px;
  height: 19px;
}
</style>
