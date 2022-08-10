<template>
  <div class="sign-in-rules sub-page">
    <div class="nav-bar-wrap">
      <van-icon name="arrow-left" @click="$router.back()"/>
      <span>签到规则</span>
    </div>
    <div class="container">
      <div class="container__content">
        签到规则：<br>
        1、签到规则签到规则签到规则签到规则签到规则签到规则签到规则签到规则签到规则<br>
        1、签到规则签到规则签到规则签到规则签到规则签到规则签到规则签到规则签到规则<br>
        1、签到规则签到规则签到规则签到规则签到规则签到规则签到规则签到规则签到规则<br>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "sign-in-rules"
}
</script>

<style scoped lang="less">
.nav-bar-wrap {
  position: relative;
  font-family: PingFang-SC-Medium;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #333333;
  line-height: 50px;
  text-align: center;
  background: #ffffff;

  .van-icon {
    position: absolute;
    top: 50%;
    left: 12px;
    transform: translateY(-50%);
  }
}
.container {
  height: calc(100% - 50px);
  overflow: auto;

  .container__content {
    min-height: 100%;
    padding: 25px 15px;
    font-family: PingFang-SC-Medium;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 24px;
    letter-spacing: 0px;
    color: #333333;
  }
}

</style>
