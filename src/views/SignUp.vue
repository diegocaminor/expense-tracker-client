<template>
  <div class="login-form">
    <form v-on:submit.prevent="signUp">
      <h2 class="text-center">Sign up</h2>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          placeholder="First name"
          required="required"
          v-model="user.firstName"
        />
      </div>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          placeholder="Last name"
          required="required"
          v-model="user.lastName"
        />
      </div>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          placeholder="UserName"
          required="required"
          v-model="user.userName"
        />
      </div>
      <div class="form-group">
        <input
          type="email"
          pattern=".+@.+.com"
          class="form-control"
          placeholder="Email"
          required="required"
          v-model="user.email"
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
        <button type="submit" class="btn btn-primary btn-block">Sign up</button>
      </div>
      <div class="clearfix">
        <router-link to="/login" class="call-to-action"
          >Already have account? <b>Login!</b></router-link
        >
      </div>
    </form>
  </div>
</template>

<script>
import api from "@/assets/scripts/api.js";

export default {
  name: "SignUp",
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async signUp() {
      const responseMessage = await api.signUp(this.user);
      if (responseMessage != undefined) {
        this.$swal({
          icon: "success",
          title: "Successful",
          text: responseMessage,
        });
        this.$router.push({ name: "login" });
      } else {
        this.$swal({
          icon: "error",
          title: "Oops...",
          text: "Username is taken",
        });
      }
    },
  },
};
</script>

<style scoped></style>
