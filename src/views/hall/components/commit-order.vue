<template>
  <div class="commit-order sub-page">
    <div class="container">
      <nav-bar :title="$t('提交任务')" background-color="transparent"/>
      <div class="top-info-box">
        <div class="title">{{ $t('任务号') }}:{{ id }}</div>
        <div class="img-wrap">
          <van-image :src="goodsPic"/>
        </div>
        <div class="name">{{ goodsName }}</div>
        <div class="price">$ {{ goodsPrice }}</div>
      </div>
      <div class="bottom-info-box">
        <van-cell-group>
          <van-cell
              v-for="item in cellList"
              :key="item.id"
              :title="item.title"
              :class="[{'main-color': item.id === 1}, {'red-color': item.id === 9}]"
              :value="item.value"/>
        </van-cell-group>
        <van-image
            v-if="!isClickLove"
            :src="require('@/assets/hall/nonclick-love-icon.png')"
            class="love-icon"
            @click="handleClickLove"
        />
        <van-image
            v-else
            :src="require('@/assets/hall/click-love-icon.png')"
            class="love-icon"
        />
      </div>
      <div class="btn-box">
        <van-button block :disabled="!isClickLove" @click="visible = true">
          <span>{{ $t('提交任务') }}</span>
        </van-button>
      </div>
    </div>
    <van-dialog v-model="visible" :show-confirm-button="false">
      <div class="dialog-container">
        <div class="title">{{ $t('确认任务') }}</div>
        <div class="text">{{ $t('我已确认任务信息正确') }}</div>
        <div class="btn-wrap">
          <van-button @click="visible = false">{{ $t('取消') }}</van-button>
          <van-button @click="handleConfirm">{{ $t('确认') }}</van-button>
        </div>
      </div>
    </van-dialog>
    <van-image :src="require('@/assets/hall/click-like.gif')" class="click-like-gif" v-if="isClickLike"/>
    <result-dialog
        :visible.sync="showResult"
        :result="$t('提交成功')"
        :btn="false"
        :desc="$t('正在跳转页面...')"
    />
  </div>
</template>

<script>
export default {
  name: "commit-order",
  data() {
    const cellList = [
      {
        id: 1,
        title: this.$t('类别'),
        value: '',
      },
      {
        id: 3,
        title: this.$t('余额'),
        value: '$ 0.00',
      },
      {
        id: 4,
        title: this.$t('计算'),
        value: '$ 0',
      },
      {
        id: 5,
        title: this.$t('一次获利'),
        value: '$ 0.00',
      },
      {
        id: 9,
        title: this.$t('请点赞'),
        value: '0/1',
      },
    ]
    return {
      cellList,
      value: 0,
      max: 50,
      id: '',
      goodsPic: '',
      goodsName: '',
      goodsPrice: '0.00',
      visible: false,
      address: {},
      showResult: false,
      isClickLike: false,
      isClickLove: false
    }
  },
  computed: {
    cate() {
      return this.$route.query.id
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.address = this.$route.query.address
      const data = this.$route.query.info
      this.id = data.id
      this.goodsPic = data.goods_pic
      this.goodsName = data.goods_name
      this.goodsPrice = data.goods_price
      this.cellList[0].value = data.cate
      this.cellList[1].value = '$ ' + data.balance
      this.cellList[2].value = data.count
      this.cellList[3].value = '$ ' + data.profit
      this.value = data.deal_count
      this.max = data.total_task
    },
    handleClickLove() {
      this.isClickLove = true
      this.isClickLike = true
      setTimeout(() => {
        this.isClickLike = false
      }, 1800)
    },
    async handleConfirm() {
      try {
        const params = {goods_id: this.id}
        const resp = await this.$api.hall.buyProduct(params);
        if (resp.code === 1) {
          this.visible = false
          this.showResult = true
          this.$utils.delayBack()
        } else {
          this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      }
    },
  },
}
</script>

<style scoped lang="less">
.commit-order {
  overflow: auto;
}

.nav-bar {
  margin-left: -10px;
  margin-right: -10px;
  position: relative;
  top: -11px;

  .van-image {
    width: 20px;
    height: 17px;
  }
}

.container {
  background: url("../../../assets/hall/commit-order-bk.png") no-repeat left top/100% 282px;
  padding: 11px 10px 20px;

  .address-box {
    height: 80px;
    background-color: #ffffff;
    border-radius: 5px;
    display: flex;
    padding: 19px 12px;
    position: relative;
    margin-bottom: 33px;

    .address-icon {
      width: 43px;
      height: 43px;
      margin-right: 15px;
    }

    .text-wrap {
      .tel-text {
        margin-right: 6px;
      }

      div:first-child {
        font-family: PingFang-SC-Medium;
        font-size: 12px;
        line-height: 12px;
        color: #333333;
        margin-bottom: 8px;
        margin-top: 6px;
      }

      div:last-child {
        font-family: PingFang-SC-Medium;
        font-size: 12px;
        line-height: 12px;
        color: #999999;
      }
    }

    .arrow-icon {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
      width: 6px;
      height: 10px;
    }
  }

  .top-info-box {
    height: 295px;
    background-color: #ffffff;
    margin-bottom: 7px;
    position: relative;
    padding: 15px 15px 20px;

    &::before {
      content: '';
      width: 100%;
      height: 13px;
      background: url("../../../assets/hall/box-desc.png");
      position: absolute;
      top: -13px;
      left: 0;
      right: 0;
    }

    .title {
      font-family: PingFang-SC-Medium;
      font-size: 12px;
      color: #333333;
      line-height: 12px;
      margin-bottom: 10px;
    }

    .img-wrap {
      text-align: center;
      margin-bottom: 24px;

      .van-image {
        width: 120px;
        height: 143px;
      }
    }

    .name {
      font-family: PingFang-SC-Medium;
      font-size: 12px;
      line-height: 18px;
      color: #333333;
      text-align: center;
      padding: 0 50px;
      margin-bottom: 10px;
    }

    .price {
      font-family: PingFang-SC-Bold;
      font-size: 18px;
      line-height: 18px;
      color: #e98d00;
      text-align: center;
    }
  }

  .bottom-info-box {
    height: 220px;
    background: #ffffff;
    margin-bottom: 43px;
    position: relative;

    &::after {
      content: '';
      width: 100%;
      height: 13px;
      background: url("../../../assets/hall/box-desc.png");
      position: absolute;
      bottom: -13px;
      left: 0;
      right: 0;
      transform: rotateX(180deg);
    }

    .love-icon {
      position: absolute;
      width: 60px;
      height: 60px;
      right: 0;
      bottom: -20px;
      z-index: 99;
    }
  }

  ::v-deep .van-cell__title {
    flex: unset;
    font-family: PingFang-SC-Medium;
    font-size: 12px;
    color: #333333;
  }

  ::v-deep .van-cell__value {
    font-family: PingFang-SC-Medium;
    font-size: 12px;
    color: #333333;
  }

  ::v-deep .main-color .van-cell__value {
    color: #e98d00;
  }

  ::v-deep .van-hairline--top-bottom::after {
    border-width: 0;
  }

  .van-slider {
    width: calc(100% - 30px);
    margin: 0 auto;
  }

  .btn-box {
    margin-bottom: 24px;

    .van-button {
      height: 50px;
      background-color: #ff6c1e;
      border-color: #ff6c1e;
      border-radius: 10px;
      font-family: PingFang-SC-Medium;
      font-size: 14px;
      color: #ffffff;

    }
  }

  .complete-box {
    height: 255px;
    background-color: #ffffff;
    border-radius: 5px;
    padding-top: 32px;

    .img-wrap {
      text-align: center;
      margin-bottom: 24px;

      .van-image {
        width: 70px;
        height: 60px;
      }
    }

    .text-wrap {
      font-family: PingFang-SC-Medium;
      font-size: 12px;
      line-height: 18px;
      color: #333333;
      width: 280px;
      height: 36px;
      text-align: center;
      margin: 0 auto 39px;
    }

    .btn-wrap {
      .van-button {
        width: 215px;
        height: 45px;
        background-color: #ff6c1e;
        border-color: #ff6c1e;
        border-radius: 23px;
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        color: #ffffff;
        margin: 0 auto;
      }
    }
  }

  ::v-deep .red-color .van-cell__title {
    color: #f80a2b;
  }
}

.dialog-container {
  width: 325px;
  height: 277px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 54px 20px 17px;
  text-align: center;

  .title {
    font-family: PingFang-SC-Bold;
    font-size: 18px;
    color: #333333;
    line-height: 18px;
    margin-bottom: 52px;
  }

  .text {
    height: 14px;
    font-family: PingFang-SC-Medium;
    font-size: 14px;
    line-height: 18px;
    color: #333333;
    margin-bottom: 72px;
  }

  .btn-wrap {
    display: flex;
    justify-content: space-between;

    .van-button {
      width: 135px;
      height: 50px;
      background-color: #ff6c1e;
      border-color: #ff6c1e;
      border-radius: 10px;
      font-family: PingFang-SC-Bold;
      font-size: 18px;
      color: #ffffff;
    }
  }
}

.click-like-gif {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
