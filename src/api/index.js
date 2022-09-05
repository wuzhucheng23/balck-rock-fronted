import Vue from "vue";
import login from "@/api/login"
import home from "@/api/home";
import hall from "@/api/hall";
import robot from "@/api/robot";
import service from "@/api/service";
import mine from "@/api/mine";

const api = {
    login,
    home,
    hall,
    robot,
    service,
    mine,
}

Vue.prototype.$api = api
