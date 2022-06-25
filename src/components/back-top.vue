<template>
  <div class="back-top">
    <div class="back-top-box" @click="handleClick" v-if="visible">
      <van-icon name="back-top" size="20px" color="#ffffff"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "back-top",
  props: {
    container: {
      type: HTMLElement,
      default: () => document.documentElement
    }
  },
  data() {
    return {
      timer: undefined,
      distanceTimer: undefined,
      distanceTop: 0
    };
  },
  computed: {
    visible() {
      return this.distanceTop >= 800
    }
  },
  methods: {
    init() {
      this.distanceTimer = setInterval(() => {
        this.distanceTop = this.container.scrollTop
      }, 100)
    },
    handleClick() {
      if (!this.timer) this.timer = setInterval(this.handleBackTop, 10);
    },
    handleBackTop() {
      if (this.container.scrollTop <= 10) {
        if (this.timer) {
          clearInterval(this.timer);
          this.timer = undefined
        }
        return this.container.scrollTop = 0;
      }
      this.container.scrollTop -= 40;
    }
  },
  created() {
    this.init();
  },
  beforeDestroy() {
    if (this.timer) clearInterval(this.timer);
    if (this.distanceTimer) clearInterval(this.distanceTimer)
  }
};
</script>

<style scoped lang="less">
.back-top-box {
  border-radius: 50%;
  background-color: #cf943f;
  width: 30px;
  height: 30px;
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
