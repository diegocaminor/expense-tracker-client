<template>
  <div class="login-form">
    <form v-on:submit.prevent="signIn">
      <h2 class="text-center">Log in</h2>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          placeholder="Username"
          required="required"
          v-model="user.userName"
        />
      </div>
      <div class="form-group">
        <input
          type="password"
          class="form-control"
          placeholder="Password"
          required="required"
          v-model="user.password"
        />
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary btn-block">Log in</button>
      </div>
      <div class="clearfix">
        <label class="pull-left checkbox-inline">
          <input
            type="checkbox"
            v-model="user.rememberMe"
            @click="user.rememberMe=!user.rememberMe"
          /> Remember me
        </label>
        <router-link to="/signup">Don't you have account? Sign-up!</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import api from "@/api.js";

export default {
  name: "Login",
  data() {
    return {
      user: {
        userName: "",
        password: "",
        rememberMe: false
      }
    };
  },
  methods: {
    async signIn() {
      const token = await api.signIn(this.user);
      if (token) this.$router.push({ name: "home" });
    }
  }
};
</script>

<style scoped></style>
