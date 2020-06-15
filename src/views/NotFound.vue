<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 mt-5">
        <div class="error-template">
          <h1>Oops!</h1>
          <h2>404 Not Found</h2>
          <div class="error-details">Sorry, an error has occured, Requested page not found!</div>
          <div class="error-actions mt-5">
            <router-link class="btn btn-primary btn-lg" to="/">Take me home</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound"
};
</script>

<style>
</style>