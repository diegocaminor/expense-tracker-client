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
        <label class="pull-left checkbox-inline mx-3">
          <input
            type="checkbox"
            v-model="user.rememberMe"
            @click="user.rememberMe = !user.rememberMe"
          />
          Remember me
        </label>
        <router-link to="/signup" class="call-to-action"
          >Don't you have account? <b>Sign-up!</b>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import api from "@/assets/scripts/api.js";

export default {
  name: "Login",
  data() {
    return {
      user: {
        userName: "",
        password: "",
        rememberMe: false,
      },
    };
  },
  methods: {
    async signIn() {
      const data = await api.signIn(this.user);
      if (data.token) {
        this.$cookies.set("token", data.token);
        this.$cookies.set("id", data.user.id);
        this.$cookies.set("userName", data.user.userName);
        this.$router.go("/");
      } else {
        this.$swal({
          icon: "error",
          title: "Oops...",
          text: "Incorrect username or password!",
        });
      }
    },
  },
};
</script>

<style scoped>
.checkbox-inline {
  font-size: 0.8em;
}
</style>
