<template>
  <div id="app" v-cloak>
    <px-header v-if="token" />
    <router-view />
  </div>
</template>

<script>
import PxHeader from "@/components/PxHeader";

export default {
  name: "App",
  components: {
    PxHeader,
  },
  data() {
    return {
      token: this.$cookies.get("token"),
    };
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
