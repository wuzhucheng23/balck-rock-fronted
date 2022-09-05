<template>
  <div class="activity-detail sub-page">
    <nav-bar :title="$t('活动详情')"/>
    <div class="container">
      <div class="content-box">
        <div class="content" v-html="content"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "activity-detail",
  data() {
    return {
      content: ''
    }
  },
  computed: {
    id() {
      return this.$route.query.id
    }
  },
  created() {
    this.activityDetails()
  },
  methods: {
    async activityDetails() {
      try {
        const params = {id: this.id}
        const resp = await this.$api.mine.activityDetails(params);
        if (resp.code === 1) {
          const data = resp.data
          this.content = data.content
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
.container {
  padding: 15px;
  height: calc(100% - 50px);
  overflow: auto;

  .content-box {
    background: #ffffff;
    border-radius: 10px;
    padding: 15px;
    ont-family: PingFang-SC-Medium;
    font-size: 14px;
    line-height: 18px;
    color: #333333;
    text-align: justify;
  }
}
</style>
