import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n)

// 引入语言包
import en from "@/locale/en";
import cn from "@/locale/cn";
import po from "@/locale/po";

// 创建VueI18n实例
const i18n = new VueI18n({
    locale: 'po',
    messages: {
        en,
        cn,
        po
    },
    silentTranslationWarn: true
});

export default i18n
