<template>
  <div class="add-bank-card sub-page">
    <nav-bar :title="title"></nav-bar>
    <div class="container">
      <div class="info-box">
        <div class="title">{{ $t('绑定银行卡') }}</div>
        <div class="content">
          <div class="content-item" v-for="item in showFieldList" :key="item.title">
            <div class="text">{{ item.title }}</div>
            <div class="value">
              <van-field
                  v-model="item.model"
                  :type="item.type"
                  :placeholder="item.placeholder">
              </van-field>
            </div>
          </div>
        </div>
      </div>
      <div class="btn-box">
        <van-button block @click="handleBind" :loading="buttonLoading"
                    loading-type="spinner" :loading-text="$t('正在绑定...')">{{ $t('绑定') }}</van-button>
      </div>
    </div>
    <result-dialog :visible.sync="showResult" :result="$t('添加成功')" :btn="false" :desc="$t('正在跳转页面...')"></result-dialog>
  </div>
</template>

<script>
export default {
  name: "add-bank-card",
  data() {
    const fieldList = [
      {
        title: this.$t('姓名'),
        model: '',
        type: 'text',
        placeholder: this.$t('请输入姓名')
      },
      {
        title: this.$t('银行卡号'),
        model: '',
        type: 'text',
        placeholder: this.$t('请输入银行卡号')
      },
      {
        title: this.$t('银行名称'),
        model: '',
        type: 'text',
        placeholder: this.$t('请输入银行名称')
      },
      {
        title: this.$t('开户省市'),
        model: '',
        type: 'text',
        placeholder: this.$t('请输入开户省市')
      },
      {
        title: this.$t('开户网点'),
        model: '',
        type: 'text',
        placeholder: this.$t('请输入开户网点'),
        international: true,
      },
      {
        title: this.$t('身份Id（护照）'),
        model: '',
        type: 'text',
        placeholder: this.$t('请输入身份Id（护照）'),
        international: true,
      },
      {
        title: this.$t('国际汇款代码'),
        model: '',
        type: 'text',
        placeholder: this.$t('请输入国际汇款代码'),
        international: true,
      },
      {
        title: this.$t('联系电话'),
        model: '',
        type: 'text',
        placeholder: this.$t('请输入联系电话')
      }
    ]
    return {
      fieldList,
      showResult: false,
      buttonLoading: false
    }
  },
  computed: {
    title() {
      return this.$route.query.title
    },
    showFieldList() {
      const list = this.fieldList
      return this.title === this.$t('添加银行卡') ? list.filter(item => !item.international) : list
    }
  },
  created() {
    this.getBank()
  },
  methods: {
    async getBank() {
      try {
        this.loading = true
        const params = { bank_type: this.title === this.$t('添加银行卡') ? 2 : 1 }
        const resp = await this.$api.mine.getBank(params);
        if (resp.code === 1) {
          const data = resp.data
          const fieldList = this.fieldList
          fieldList[0].model = data.name
          fieldList[1].model = data.cardnum
          fieldList[2].model = data.bankname
          fieldList[3].model = data.address
          fieldList[4].model = data.site
          fieldList[5].model = data.passport
          fieldList[6].model = data.pay_code
          fieldList[7].model = data.tel
        } else {
          // this.$toast.fail(resp.msg || resp.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'));
      } finally {
        this.loading = false
      }
    },
    async handleBind () {
      let flag = false
      const fieldList = this.fieldList
      const showList = this.showFieldList
      const type = this.title === this.$t('添加银行卡') ? 2 : 1
      const length = showList.length
      for (let i = 0; i < length; i++) {
        if (!showList[i].model) {
          this.$toast(showList[i].placeholder)
          flag = true;
          break
        }
      }
      if (flag) return
      const params = {
        bank_type: type,
        name: fieldList[0].model,
        cardnum: fieldList[1].model,
        bankname: fieldList[2].model,
        address: fieldList[3].model,
        site: type === 1 ? fieldList[4].model : undefined,
        passport: type === 1 ? fieldList[5].model : undefined,
        pay_code: type === 1 ? fieldList[6].model : undefined,
        tel: fieldList[7].model,
      }
      try {
        this.buttonLoading = true
        const res = await this.$api.mine.addBank(params)
        if (res.code === 1) {
          // this.$toast.success(res.msg)
          this.showResult = true
          this.$utils.delayBack()
        } else {
          this.$toast.fail(res.msg || res.message)
        }
      } catch (e) {
        this.$toast.fail(this.$t('发生错误'))
      } finally {
        this.buttonLoading = false
      }
    }
  },
}
</script>

<style scoped lang="less">
.container {
  height: calc(100% - 50px);
  overflow: auto;

  .info-box {
    margin-bottom: 30px;

    .title {
      font-family: PingFang-SC-Medium;
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 36px;
      letter-spacing: 0px;
      color: #666666;
      padding-left: 20px;
    }

    .content {
      .content-item {
        .text {
          font-family: PingFang-SC-Medium;
          font-size: 12px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 12px;
          letter-spacing: 0px;
          color: #333333;
          padding-top: 15px;
          padding-left: 20px;
          background: #ffffff;
        }

        .van-cell {
          padding-left: 21px;

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
        }

        ::v-deep .van-field .van-field__control {
          font-family: PingFang-SC-Medium;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #333333;
        }
      }
    }
  }

  .btn-box {
    padding: 0 15px 15px;

    .van-button {
      height: 48px;
      background-color: #fc6324;
      border-radius: 10px;
      font-family: PingFang-SC-Medium;
      font-size: 18px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 12px;
      letter-spacing: 0px;
      color: #ffffff;
    }
  }
}
</style>