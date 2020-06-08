<template>
  <div id="app">
    <px-header />
  </div>
</template>

<script>
import PxHeader from "@/components/PxHeader";
import api from "@/api.js";

export default {
  name: "App",
  components: {
    PxHeader,
  },
  data() {
    return {
      expenses: [],
    };
  },
  created() {
    console.log("created!()");
    api.getExpenses().then((expenses) => (this.expenses = expenses));
  },
  methods: {},
};
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
