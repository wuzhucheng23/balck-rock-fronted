<template>
  <div class="lottery-rules sub-page">
    <div class="container">
      <div class="container__content">
        <div class="nav-bar-wrap">
          <van-icon name="arrow-left" @click="$router.back()"/>
          <span>活动规则</span>
        </div>
        <div class="rules-wrap">
          <div class="rules-content">
            幸运转盘参与资格：<br>
            1.客户解锁100U FB 任务可以免费转一次，客户解锁200U tiktok任务可以免费转2次，客户解锁300U instagram可以免费转3次，客户解锁500U youtube任务可以免费转5次（之前解锁的客户同样可以参与）<br>
            2.免费客户也可以花钱参与，1USDT参与一次，10USDT可以参与12次，20USDT可以参与30次
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "lottery-rules"
}
</script>

<style scoped lang="less">
.container {
  height: 100%;
  overflow: auto;

  .container__content {
    min-height: 100%;
    padding-bottom: 30px;
    background: url("../../../assets/home/lottery-bk.png") no-repeat left top/100% 100%;

    .nav-bar-wrap {

      margin-bottom: 15px;
      position: relative;
      line-height: 50px;
      font-family: PingFang-SC-Medium;
      font-size: 18px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #ffffff;
      text-align: center;
      .van-icon {
        position: absolute;
        top: 50%;
        left: 12px;
        transform: translateY(-50%);
      }
      .activity-rules {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 90px;
        height: 30px;
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
        line-height: 30px;
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 15px 0px 0px 15px;
        text-align: center;
      }
    }

    .rules-wrap {
      padding: 0 15px;
      min-height: 100%;
      .rules-content {
        min-height: calc(100vh - 95px);
        padding: 15px;
        overflow: auto;
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 24px;
        letter-spacing: 0px;
        color: #ffffff;
      }
    }
  }
}

</style>
