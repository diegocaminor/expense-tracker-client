import Vue from "vue";
import VueCookies from "vue-cookies";
import Router from "vue-router";

import Home from "@/views/Home";
import PieChart from "@/views/PieChart";
import Login from "@/views/Login";
import SignUp from "@/views/SignUp";
import NotFound from "@/views/NotFound";

Vue.use(VueCookies);
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Vue.$cookies.get("token") ? Home : Login,
    },
    {
      path: "/piechart",
      name: "piechart",
      component: Vue.$cookies.get("token") ? PieChart : Login,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp,
    },
    {
      path: "*",
      name: "notfound",
      component: NotFound,
    },
  ],
});
