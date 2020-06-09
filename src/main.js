import Vue from "vue";
import App from "./App.vue";

import { dollarFilter } from "@/filters";
import { momentFilter } from "@/filters";
import { capitalizeFirstLetterFilter } from "@/filters";

Vue.filter("dollar", dollarFilter);
Vue.filter("moment", momentFilter);
Vue.filter("capitalizeFirstLetter", capitalizeFirstLetterFilter);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
