<template>
  <div>
    <div class="form-group d-flex">
      <div class="form-group">
        <div v-if="errors.length">
          <div class="text-left alert alert-danger" role="alert">
            <p v-for="error in errors" :key="error">{{ error }}</p>
          </div>
        </div>
      </div>
      <div class="input-group mb-3 col-sm-10">
        <input
          type="text"
          v-model="category.name"
          placeholder="New category name"
          class="form-control"
        />
      </div>
      <font-awesome-icon
        class="faIcon mt-2 mr-2"
        icon="save"
        v-on:click="saveCategory()"
      />
      <font-awesome-icon
        class="faIcon mt-2"
        icon="times"
        v-on:click="cancelAddCategory()"
      />
    </div>
  </div>
</template>

<script>
import api from "@/assets/scripts/api.js";

export default {
  name: "PxAddCategory",

  data() {
    return {
      errors: [],
    };
  },
  props: {
    category: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    async saveCategory() {
      this.errors = [];
      if (!this.category.name) {
        this.errors.push("Name required");
      }
      if (!this.category.type) {
        this.errors.push("Type required");
      }
      if (!this.errors.length) {
        if (!this.category.id) {
          this.responseMessage = await api.addCategory(this.category);
          this.$swal({
            icon: "success",
            title: "Successful!",
            text: this.responseMessage,
          });
        }
        this.$emit("toggle-get-categories");
      }
    },
    cancelAddCategory() {
      this.$emit("toggle-get-categories");
    },
  },
};
</script>
