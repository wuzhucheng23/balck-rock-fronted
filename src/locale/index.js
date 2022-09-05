import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n)

// 引入语言包
import en from "@/locale/en";
import cn from "@/locale/cn";
import hk from "@/locale/hk";

// 创建VueI18n实例
const i18n = new VueI18n({
    locale: 'cn',
    silentTranslationWarn: true,
    messages: {
        cn, // 简体中文
        hk, // 繁体中文
        en, // 英语
    }
});

export default i18n
