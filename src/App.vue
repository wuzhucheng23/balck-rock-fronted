<template>
  <div id="app">
    <router-view></router-view>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
 export default {
   name: "App",
   created () { // 初始化语言
     const locale = localStorage.getItem('locale')
     if (locale) this.$i18n.locale = locale
   }
 }
</script>

<style lang="less">
#app {
  max-width: 750px;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  margin: 0 auto;
}
</style>
