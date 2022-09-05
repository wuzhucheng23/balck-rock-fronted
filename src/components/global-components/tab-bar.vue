<!--底部导航栏-->

<template>
  <div class="tab-bar">
    <van-tabbar
        v-model="activeName"
        fixed
        active-color="#cf943f"
        inactive-color="#999999"
        @change="handleTabChange">
      <van-tabbar-item
          v-for="item in tabBarList"
          :key="item.label"
          :name="item.name"
          replace
          :to="item.route">
        <template #icon="{ active }">
          <van-image :src="active ? item.activeImg : item.inactiveImg" class="img"/>
        </template>
        <span style="">{{ item.label }}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "TabBar",
  data() {
    return {
      activeName: 'Home',
      list: [
        {
          name: 'Home',
          route: '/home',
          activeImg: require('@/assets/common/home-active-icon.png'),
          inactiveImg: require('@/assets/common/home-inactive-icon.png')
        },
        {
          name: 'Hall',
          route: '/hall',
          activeImg: require('@/assets/common/hall-active-icon.png'),
          inactiveImg: require('@/assets/common/hall-inactive-icon.png')
        },
        {
          name: 'Robot',
          route: '/robot',
          activeImg: require('@/assets/common/robot-active-icon.png'),
          inactiveImg: require('@/assets/common/robot-inactive-icon.png')
        },
        {
          name: 'Service',
          route: '/service',
          activeImg: require('@/assets/common/service-active-icon.png'),
          inactiveImg: require('@/assets/common/service-inactive-icon.png')
        },
        {
          name: 'Mine',
          route: '/mine',
          activeImg: require('@/assets/common/mine-active-icon.png'),
          inactiveImg: require('@/assets/common/mine-inactive-icon.png')
        }
      ],
      cn: ['首页', '大厅', '机器人', '客服', '我的'],
      en: ['Home', 'Hall', 'Robot', 'Service', 'Mine'],
      hk: ['首頁', '大廳', '機器人', '客服', '我的'],
    };
  },
  computed: {
    tabBarList() {
      const locale = this.$i18n.locale
      const labelList = this[locale]
      return this.list.map((item, index) => {
        return {
          name: item.name,
          route: item.route,
          activeImg: item.activeImg,
          inactiveImg: item.inactiveImg,
          label: labelList[index]
        }
      });
    }
  },
  watch: {
    ['$route.fullPath'](val) {
      this.tabBarList.forEach(item => {
        if (val.indexOf(`/${item.name}/`) > -1) {
          this.activeName = item.name
        }
      })
    }
  },
  methods: {
    handleTabChange(active) {
      this.activeName = active;
    }
  }
};
</script>

<style scoped lang="less">
.van-tabbar {
  height: 60px;
  max-width: 750px;
  margin: 0 auto;
}

.van-tabbar-item {
  height: 60px;
}

.img {
  width: 20px;
  height: 20px;
}

.van-tabbar--fixed {
  left: 50%;
  transform: translateX(-50%);
}

::v-deep .van-tabbar-item__text {
  white-space: nowrap;
}
</style>
