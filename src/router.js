import Vue from "vue";
import Router from "vue-router";

import Home from "@/views/Home";
import PieChart from "@/views/PieChart";
import Login from "@/views/Login";
import SignUp from "@/views/SignUp";
import NotFound from "@/views/NotFound";

Vue.use(Router);

import cookies from "@/assets/scripts/cookies";

let { token } = cookies;

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: token ? Home : Login,
    },
    {
      path: "/piechart",
      name: "piechart",
      component: token ? PieChart : Login,
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
