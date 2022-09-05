import Vue from "vue";
import {copy} from "./powerful-function/copy";
import {delayPush, delayBack, toRoute} from "./powerful-function/router";
import {debounce} from "./powerful-function/debounce";
import Stack from './data-structures/stack'
import Queue from './data-structures/queue'
import Deque from './data-structures/deque'
import LinkList from './data-structures/link-list'
import DoubleLinkList from './data-structures/double-link-list'
import CircleLinkList from './data-structures/circle-link-list'

const utils = {
    // 以下为功能函数
    copy,
    debounce,
    delayPush,
    delayBack,
    toRoute,
    // 以下为构造函数
    Stack,
    Queue,
    Deque,
    LinkList,
    DoubleLinkList,
    CircleLinkList
};

Vue.prototype.$utils = utils;
