<template>
  <div class="index main-page">
    <div class="container">
      <div class="info-box">
        <div class="logo">
          <van-image :src="require('@/assets/home/logo-icon.png')"/>
        </div>
        <div class="name-money">
          <span class="money">{{ username }}</span>
        </div>
      </div>
      <div class="swiper-box">
        <van-swipe
            class="my-swipe"
            :autoplay="3000"
            indicator-color="white">
          <van-swipe-item
              v-for="item in bannerList"
              :key="item.id">
            <van-image :src="item.image"/>
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="announcement-box">
        <van-notice-bar
            :left-icon="require('@/assets/home/horn-icon.png')"
            :text="announcement"
        />
      </div>
      <div class="popular-brand-box">
        <div class="title">{{ $t('任务领取') }}</div>
        <div class="content">
          <div class="content-item"
               v-for="(item, index) in popularBrandList"
               @click="handleToGrabOrder(item)"
               :key="item.id">
            <div class="text">{{ item.name }}</div>
            <div class="box" :class="'box-' + (index  +1)">
              <van-image :src="require('@/assets/home/crown-icon.png')"/>
              <span class="number">{{ index + 1 }}</span>
              <div class="right-wrap">
                <div>
                  <span>{{ $t('收益') }}</span>
                  <span>{{ item.bili }}U</span>
                </div>
              </div>
            </div>
            <van-image :src="item.cate_pic" class="goods-image"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeIndex",
  data() {
    return {
      bannerList: [],
      loading: false,
      announcement: '',
      popularBrandList: [],
      recommendation: [],
      username: '',
      balance: '',
    }
  },
  created() {
    this.profile()
    this.getShowContent()
  },
  methods: {
    async profile() {
      try {
        const resp = await this.$api.home.profile();
        if (resp.code === 1) {
          const data = resp.data
          this.username = data.username
          this.balance = data.balance
        } else {
          this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      }
    },
    async getShowContent() {
      try {
        const resp = await this.$api.home.getShowContent();
        if (resp.code === 1) {
          const data = resp.data
          this.announcement = data.bulletin
          this.bannerList = data.top_banner
          this.popularBrandList = data.cate
          this.recommendation = data.goods
        } else {
          this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      }
    },
    handleToGrabOrder(item) {
      this.$router.push({
        name: 'GrabOrder',
        label: '抢单',
        query: {
          id: item.id,
          title: item.name,
          img: item.cate_pic,
          open: item.open,
          recharge: item.recharge
        }
      })
    },
  },
}
</script>

<style scoped lang="less">
.container {
  padding: 12px 15px 0;
  background: #ffffff;

  .info-box {
    padding: 12px 0 0;
    margin-bottom: 12px;
    margin-left: 1px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
      .van-image {
        width: 145px;
        height: 32px;
      }
    }

    .name-money {
      display: flex;

      .name {
        font-family: PingFang-SC-Bold;
        font-size: 12px;
        line-height: 20px;
        color: #666666;
        margin-right: 9px;
      }

      .money {
        height: 20px;
        padding: 0 10px;
        line-height: 20px;
        background-color: #f2d8a7;
        border-radius: 10px;
        font-family: PingFang-SC-Bold;
        font-size: 12px;
        color: #333333;
        text-align: center;
        line-height: 20px;
      }
    }
  }

  .swiper-box {
    margin-bottom: 20px;
  }

  .announcement-box {
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 16px;

    ::v-deep .van-icon__image {
      width: 20px;
      height: 20px;
      margin-right: 9px;
    }

    ::v-deep .van-notice-bar__content {
      font-family: PingFang-SC-Medium;
      font-size: 14px;
      color: #333333;
    }
  }

  .operation-box {
    margin-bottom: 18px;

    ::v-deep .van-grid-item__icon img {
      width: 54px;
      height: 54px;
    }

    ::v-deep .van-grid-item__text {
      font-family: PingFang-SC-Bold;
      font-size: 12px;
      color: #333333;
    }
  }

  .popular-brand-box {
    margin: 0 -15px;
    background: #f8faf9;
    padding: 28px 15px 0;

    .title {
      font-family: PingFang-SC-Bold;
      font-size: 18px;
      color: #333333;
      margin-bottom: 18px;
    }

    .content {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    .content-item {
      height: 158px;
      width: calc((100% - 15px) / 2);
      border-radius: 2px;
      padding: 10px;
      margin-bottom: 15px;
      background: #ffffff;
      position: relative;

      .text {
        padding-left: 68px;
        font-family: PingFang-SC-Bold;
        font-size: 14px;
        line-height: 18px;
        height: 58px;
        display: flex;
        align-items: center;
        color: #333333;
        margin-bottom: 6px;
        position: relative;
        z-index: 1;
      }

      .money {
        margin-bottom: 12px;

        .van-image {
          margin-right: 6px;
          width: 14px;
          height: 13px;
        }

        span {
          font-family: PingFang-SC-Medium;
          font-size: 12px;
          line-height: 12px;
          color: #f1723e;
          position: relative;
          top: -0.5px;
        }
      }

      .box {
        width: 100%;
        height: 75px;
        display: flex;
        align-items: center;
        background-image: linear-gradient(90deg, #a9a5a4 0%, #a9a5a4 100%), linear-gradient(#b9b9b9, #b9b9b9);
        background-blend-mode: normal, normal;
        border-radius: 5px;
        position: relative;
        color: #b9b9b9;

        .van-image {
          width: 44px;
          height: 38px;
          margin-left: 10px;
          margin-right: 8px;
        }

        .number {
          position: absolute;
          top: 31px;
          left: 27.5px;
          font-family: SourceHanSansCN-Medium;
          font-size: 13px;
        }

        .right-wrap {
          font-family: PingFang-SC-Medium;
          font-size: 11px;
          color: #ffffff;

          div span:first-child {
            margin-right: 8px;
          }
        }
      }

      .box-1 {
        background-image: linear-gradient(90deg, #a9a5a4 0%, #a9a5a4 100%), linear-gradient(#b9b9b9, #b9b9b9);
        color: #b9b9b9;
      }

      .box-2 {
        background-image: linear-gradient(90deg, #e3b470 0%, #e2b472 100%), linear-gradient(#ebd099, #ebd099);
        color: #eace96;
      }

      .box-3 {
        background-image: linear-gradient(90deg, #ec8579 0%, #ec8579 100%), linear-gradient(#eaa596, #eaa596);
        color: #eaa394;
      }

      .box-4 {
        background-image: linear-gradient(90deg, #a589e1 0%, #a589e1 100%), linear-gradient(#c09fee, #c09fee);
        color: #be9ded;
      }

      .box-5 {
        background-image: linear-gradient(90deg, #6ad7d1 0%, #6ad7d1 100%), linear-gradient(#74d9e1, #74d9e1);
        color: #74d9e0;
      }

      .box-6 {
        background-image: linear-gradient(90deg, #7fc87f 0%, #7fc87f 100%), linear-gradient(#98dd9e, #98dd9e);
        color: #96dc9c;
      }

      .box-7 {
        background-image: linear-gradient(90deg, #ff6c1e 0%, #ff6c1e 100%), linear-gradient(#ff6c1e, #ff6c1e);
        color: #ff6c1e;
      }

      .goods-image {
        width: 58px;
        height: 58px;
        position: absolute;
        left: 10px;
        top: 10px;
        z-index: 0;
      }
    }
  }

  .recommendation-box {
    margin: 0 -15px;
    background: #f8faf9;
    padding: 28px 15px 12px;

    .title {
      font-family: PingFang-SC-Bold;
      font-size: 18px;
      color: #333333;
      margin-bottom: 18px;
    }

    .content {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    .content-item {
      height: 200px;
      width: calc((100% - 15px) / 2);
      background-color: #ffffff;
      border-radius: 2px;
      padding: 10px;
      margin-bottom: 15px;

      .img {
        text-align: center;

        .van-image {
          width: 124px;
          height: 146px;
          margin-bottom: 10px;
        }
      }

      .text {
        font-family: PingFang-SC-Medium;
        font-size: 12px;
        line-height: 14px;
        color: #333333;
        overflow: hidden;
        text-overflow: ellipsis;
        line-break: anywhere;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }

      .money-brand {
        display: flex;
        justify-content: space-between;

        .money {
          font-family: PingFang-SC-Bold;
          font-size: 12px;
          line-height: 19px;
          color: #dc9110;
        }

        .brand {
          font-family: PingFang-SC-Medium;
          font-size: 12px;
          line-height: 19px;
          color: #999999;
        }
      }
    }
  }
}
</style>
