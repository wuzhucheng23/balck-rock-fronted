<template>
  <div class="invite-friend sub-page">
    <nav-bar :title="$t('邀请好友')"></nav-bar>
    <div class="container">
      <div class="code-box">
        <div class="text">{{ $t('我的邀请码') }}</div>
        <div class="code" ref="code">{{ inviteCode }}</div>
        <div class="btn">
          <van-button @click="handleCopyCode">{{ $t('复制') }}</van-button>
        </div>
      </div>
      <div class="link-box">
        <span ref="link" v-show="false">{{ link }}</span>
        <div class="title">{{ $t('分享链接') }}</div>
        <div class="content">
          <van-field v-model="link" type="text">
            <template #button>
              <van-button @click="handleCopyLink" class="copy-btn" >{{ $t('复制') }}</van-button>
            </template>
          </van-field>
        </div>
      </div>
      <div class="qr-code-box">
        <div class="title">{{ $t('分享二维码') }}</div>
        <div class="qr-code">
          <canvas ref="myCanvas" width="180" height="180"></canvas>
        </div>
        <div class="save-btn">
          <van-button @click="handleDownloadCode">{{ $t('保存二维码') }}</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qrCode from 'qrcode'
export default {
  name: "invite-friend",
  data() {
    return {
      link: 'http://localhost:8080/#/login/register',
      inviteCode: ''
    }
  },
  created() {
    this.profile()
  },
  methods: {
    async profile() {
      try {
        this.loading = true
        const resp = await this.$api.home.profile();
        if (resp.code === 1) {
          const data = resp.data
          this.inviteCode = data.invite_code
          this.link = data.share_url
          this.initImg(data.share_url)
        } else {
          this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      } finally {
        this.loading = false
      }
    },
    initImg (url) {
      this.$nextTick(() => {
        qrCode.toCanvas(this.$refs.myCanvas, url)
        console.log('123')
      })
    },
    handleCopyCode() {
      this.$utils.copy(this.$refs.code)
      this.$toast(this.$t('邀请码复制成功'))
    },
    handleCopyLink () {
      this.$utils.copy(this.$refs.link)
      this.$toast(this.$t('邀请链接复制成功'))
    },
    handleDownloadCode () {
      const canvasElement = this.$refs.myCanvas;
      const MIME_TYPE = "image/png";
      const imgURL = canvasElement.toDataURL(MIME_TYPE);
      const dlLink = document.createElement('a');
      dlLink.download = 'qrcode.png';
      dlLink.href = imgURL;
      dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');
      document.body.appendChild(dlLink);
      dlLink.click();
      this.$toast(this.$t('保存成功'))
    }
  },
}
</script>

<style scoped lang="less">
.container {
  height: calc(100% - 50px);
  overflow: auto;
  padding: 104px 15px 15px;
  background: url("../../../assets/home/invite-friend-bk.png") no-repeat center top/cover;

  .code-box {
    height: 193px;
    background-color: #ffffff;
    border-radius: 10px;
    margin-bottom: 15px;
    padding-top: 18px;

    .text {
      font-family: PingFang-SC-Bold;
      font-size: 18px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 18px;
      letter-spacing: 0px;
      color: #333333;
      margin-bottom: 26px;
      text-align: center;
      position: relative;
    //  &::before {
    //    content: '';
    //    display: block;
    //    width: 44px;
    //    height: 9px;
    //    background: url("../../../assets/home/text-right-img.png") no-repeat center/cover;
    //    position: absolute;
    //    left: 50%;
    //    top: 3px;
    //    transform: translateX(-106px);
    //  }
    //  &::after {
    //    content: '';
    //    display: block;
    //    width: 44px;
    //    height: 9px;
    //    background: url("../../../assets/home/text-left-img.png") no-repeat center/cover;
    //    position: absolute;
    //    right: 50%;
    //    top: 4.5px;
    //    transform: translateX(106px);
    //  }
    }

    .code {
      width: 174px;
      height: 59px;
      background-color: #f6f6f6;
      border-radius: 10px;
      font-family: PingFang-SC-Bold;
      font-size: 22px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 59px;
      letter-spacing: 0px;
      color: #333333;
      text-align: center;
      margin: 0 auto 18px;
    }

    .btn {
      text-align: center;

      .van-button {
        width: 76px;
        height: 30px;
        background-color: #ffffff;
        border-radius: 10px;
        border: solid 1px #fc6324;
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 12px;
        letter-spacing: 0px;
        color: #fc6324;
      }
    }
  }

  .link-box {
    height: 108px;
    background-color: #ffffff;
    border-radius: 10px;
    margin-bottom: 15px;
    padding: 16px 15px;

    .title {
      font-family: PingFang-SC-Bold;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 14px;
      letter-spacing: 0px;
      color: #333333;
      margin-bottom: 15px;
    }

    .van-cell {
      padding: 0;
    }

    ::v-deep .van-field__body {
      height: 44px;
      background-color: #f6f6f6;
      border-radius: 10px;
      padding-left: 15px;
    }

    .copy-btn {
      width: 76px;
      height: 34px;
      background-color: #fc6324;
      border-radius: 10px;
      font-family: PingFang-SC-Medium;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 12px;
      letter-spacing: 0px;
      color: #ffffff;
      margin-right: 5px;
    }
  }

  .qr-code-box {
    height: 300px;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 16px;

    .title {
      font-family: PingFang-SC-Bold;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 14px;
      letter-spacing: 0px;
      color: #333333;
      margin-bottom: 19px;
    }

    .qr-code {
      width: 164px;
      height: 164px;
      border-radius: 10px;
      overflow: hidden;
      margin: 0 auto 20px;

      .canvas {
        width: 100%;
        height: 100%;
      }
    }

    .save-btn {
      text-align: center;

      .van-button {
        //width: 115px;
        height: 34px;
        background-color: #fc6324;
        border-color: #fc6324;
        border-radius: 10px;
        font-family: PingFang-SC-Medium;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 12px;
        letter-spacing: 0px;
        color: #ffffff;
      }
    }
  }
}
</style>