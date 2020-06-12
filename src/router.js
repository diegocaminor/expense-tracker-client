import Vue from "vue";
import Router from "vue-router";

import Home from "@/views/Home";
import Login from "@/views/Login";
import SignUp from "@/views/SignUp";

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
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp,
    },
  ],
});
