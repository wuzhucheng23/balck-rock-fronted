import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n)

// 引入语言包
import en from "@/locale/en";
import cn from "@/locale/cn";
import hk from "@/locale/hk";
import fr from "@/locale/fr";
import it from "@/locale/it";
import de from "@/locale/de";

// 创建VueI18n实例
const i18n = new VueI18n({
    locale: 'en',
    messages: {
        en, // 英语
        cn, // 简体中文
        hk, // 繁体中文
        fr, // 法语
        it, // 意大利语
        de, // 德语
    },
    silentTranslationWarn: true
});

export default i18n
