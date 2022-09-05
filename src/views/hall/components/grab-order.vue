<template>
  <div class="grab-order sub-page">
    <nav-bar :title="title"/>
    <div class="container">
      <div class="brand-info-box">
        <van-image :src="img"></van-image>
        <div class="right-wrap">
          <div class="title">{{ title }}</div>
        </div>
      </div>
      <div class="info-box">
        <div class="info-item" v-for="item in infoList" :key="item.id">
          <div class="title">{{ item.title }}</div>
          <div class="value">
            <span v-if="item.id !== 1 && item.id !== 2">USDT </span>
            <span>{{ item.value }}</span>
          </div>
        </div>
      </div>
      <div class="btn-box">
        <van-button block @click="handleGrabOrder">{{ $t('领取任务') }}</van-button>
      </div>
    </div>
    <result-dialog
        :visible.sync="visible"
        :result="$t('获取任务成功')"
        :btn="false"
        :desc="$t('正在跳转页面...')"
    />
  </div>
</template>

<script>
export default {
  name: "grab-order",
  data() {
    const infoList = [
      {
        id: 1,
        title: this.$t('点赞任务数'),
        value: '0'
      },
      {
        id: 2,
        title: this.$t('剩余任务数'),
        value: '0'
      },
      {
        id: 3,
        title: this.$t('今日已赚佣金'),
        value: '0.00'
      },
      {
        id: 4,
        title: this.$t('账户余额'),
        value: '0.00'
      }
    ]
    return {
      infoList,
      content: '',
      visible: false,
      goods: {},
    }
  },
  computed: {
    id() {
      return this.$route.query.id
    },
    title() {
      return this.$route.query.title || this.$t('获取任务')
    },
    img() {
      return this.$route.query.img
    },
    recharge() {
      return this.$route.query.recharge
    },
    open() {
      return this.$route.query.open
    }
  },
  created() {
    this.profile()
    this.cateItem()
  },
  methods: {
    async profile() {
      try {
        const resp = await this.$api.home.profile();
        if (resp.code === 1) {
          const data = resp.data
          this.infoList[2].value = data.today_settled
          this.infoList[3].value = data.balance
        } else {
          this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      }
    },
    async cateItem() {
      try {
        const params = {cate: this.id}
        const resp = await this.$api.hall.cateItem(params);
        if (resp.code === 1) {
          const data = resp.data
          this.infoList[0].value = data.todayTask
          this.infoList[1].value = data.allTask - data.todayTask
        } else {
          this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      }
    },
    handleGrabOrder() {
      this.$toast.loading(this.$t('正在获取任务'))
      setTimeout(() => {
        this.grabOrder()
      }, 2000)
    },
    async grabOrder() {
      try {
        const params = {cate: this.id}
        const resp = await this.$api.hall.grabOrder(params);
        if (resp.code === 1) {
          this.visible = true
          this.$utils.delayPush('CommitOrder', '提交订单', {
            info: resp.data.info
          })
        } else {
          this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      }
    }
  },
}
</script>

<style scoped lang="less">
.money-rule {
  font-family: PingFang-SC-Medium;
  text-decoration: underline;
  font-size: 12px;
  color: #666666;
}

.container {
  padding: 20px 15px;
  height: calc(100% - 50px);
  overflow: auto;

  .brand-info-box {
    display: flex;
    margin-bottom: 20px;
    padding: 0 20px;
    align-items: center;

    .van-image {
      width: 65px;
      height: 65px;
      margin-right: 20px;
    }

    .right-wrap {
      flex: 1;

      .price {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;

        .van-button {
          padding: 0 10px;
          height: 20px;
          line-height: 20px;
          border-radius: 5px;
          background: #fc6324;
          border-color: #fc6324;
          color: #ffffff;
          font-size: 12px;
        }
      }
    }
  }

  .info-box {
    height: 160px;
    background: url("../../../assets/hall/grab-order-bk.png") no-repeat center/cover;
    display: flex;
    padding: 25px 20px;
    justify-content: space-between;
    flex-wrap: wrap;
    align-content: space-between;
    margin-bottom: 30px;
    border-radius: 10px;

    .info-item {
      text-align: center;
      min-width: 90px;
      width: calc((100% - 10px) / 2);

      .title {
        height: 12px;
        font-family: PingFang-SC-Medium;
        font-size: 12px;
        line-height: 12px;
        color: #ffffff;
        margin-bottom: 16px;
      }

      .value {
        font-family: PingFang-SC-Bold;
        font-size: 16px;
        line-height: 16px;
        color: #ffffff;
      }
    }
  }

  .btn-box {
    margin-bottom: 25px;

    .van-button {
      height: 48px;
      background-color: #fc6324;
      border-color: #fc6324;
      border-radius: 10px;
      font-family: PingFang-SC-Medium;
      font-size: 14px;
      line-height: 12px;
      color: #ffffff;
    }
  }

  .instructions-box {
    height: 185px;
    font-family: PingFang-SC-Medium;
    font-size: 12px;
    line-height: 14px;
    color: #999999;

    .title {
      margin-bottom: 15px;
    }
  }
}
</style>
