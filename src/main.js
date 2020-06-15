import Vue from "vue";
import App from "./App.vue";
import "@/assets/css/styles.css";
import router from "@/router";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import { dollarFilter } from "@/filters";
import { momentFilter } from "@/filters";
import { capitalizeFirstLetterFilter } from "@/filters";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEdit,
  faTrash,
  faMinus,
  faPlus,
  faSave,
  faTimes,
} from "@fortawesome/free-solid-svg-icons/";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueApexCharts from "vue-apexcharts";

Vue.filter("dollar", dollarFilter);
Vue.filter("moment", momentFilter);
Vue.filter("capitalizeFirstLetter", capitalizeFirstLetterFilter);

library.add(faEdit, faTrash, faMinus, faPlus, faSave, faTimes);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("apexchart", VueApexCharts);

const options = {
  confirmButtonColor: "#38686a",
  cancelButtonColor: "#ff7674",
};
Vue.use(VueSweetalert2, options);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
