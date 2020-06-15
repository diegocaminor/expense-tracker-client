<template>
  <div id="app" v-cloak>
    <px-header v-show="token" />
    <router-view />
  </div>
</template>

<script>
import PxHeader from "@/components/PxHeader";
import cookies from "@/assets/scripts/cookies";
const { token } = cookies;

export default {
  name: "App",
  components: {
    PxHeader
  },
  data() {
    return {
      token
    };
  },
  methods: {}
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
