<template>
  <header>
    <nav class="navbar navbar-expand-lg">
      <router-link class="navbar-brand" to="/">Expense Tracker!</router-link>

      <button
        class="navbar-toggler navbar-light"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div class="navbar-nav mr-auto"></div>
        <ul class="nav navbar-nav">
          <li class="nav-item">
            <router-link :to="{ name: 'home' }" class="nav-link"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'piechart' }" class="nav-link"
              >See Expenses Pie Chart!</router-link
            >
          </li>
          <li class="dropdown">
            <a
              href="#"
              class="nav-link dropdown-toggle"
              id="navbarDropdown"
              data-toggle="dropdown"
            >
              Welcome, {{ userName }}
              <b class="caret"></b>
            </a>
            <div
              class="dropdown-menu dropdown-menu-right "
              aria-labelledby="navbarDropdown"
            >
              <a class="dropdown-item text-center" @click="logout">Logout</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "PxHeader",
  data() {
    return {
      token: "",
      userName: "",
    };
  },
  created() {
    this.userName = this.$cookies.get("userName");
  },
  methods: {
    logout() {
      this.$cookies.remove("token");
      this.$cookies.remove("id");
      this.$cookies.remove("userName");
      this.userName = "";
      this.$router.go("/");
    },
  },
};
</script>

<style scoped>
.navbar {
  background: #38686a;
}
.dropdown-menu {
  background: #38686a;
}
a {
  color: #bbdef2;
}
a:hover {
  color: #1f8fb1;
}
</style>
