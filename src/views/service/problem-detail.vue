<template>
  <div class="problem-detail sub-page">
    <nav-bar :title="title"/>
    <div class="container">
      <div class="container__content">
        <div class="content" v-html="detail"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProblemDetail",
  computed: {
    title() {
      return this.$route.query.title
    },
    detail() {
      return this.$route.query.detail
    },
  },
}
</script>

<style scoped lang="less">
.container {
  height: calc(100% - 50px);
  overflow: auto;
  padding: 15px;
}
</style>
