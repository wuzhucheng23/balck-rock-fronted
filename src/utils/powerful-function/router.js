import router from "@/router";

/**
 * @description 立即跳转
 * @param name {String} 名称
 * @param label {String} 描述
 * @param query {Object} 参数
 * @return undefined
 */
export const toRoute = (name, label, query = undefined) => {
    router.push({
        name,
        label,
        query
    })
};

/**
 * @description 延迟跳转
 * @param name {String} 名称
 * @param label {String} 描述
 * @param query {Object} 参数
 * @param delay {Number} 延迟时间
 * @return undefined
 */
export const delayPush = (name, label, query = undefined, delay = 1500) => {
    setTimeout(() => {
        router.push({
            name,
            label,
            query
        });
    }, delay);
};

/**
 * @description 延迟返回
 * @param delay {Number} 延迟时间
 * @return undefined
 */
export const delayBack = (delay = 1500) => {
    setTimeout(() => {
        router.back();
    }, delay);
};
