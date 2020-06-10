<template>
  <!-- Modal -->
  <div
    class="modal fade"
    ref="vuemodal"
    id="addExpenseModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="addExpenseModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addExpenseModalLabel">New expense</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <div v-if="errors.length">
                <div class="text-left alert alert-danger" role="alert">
                  <p v-for="error in errors" :key="error">{{ error }}</p>
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">$</span>
                </div>
                <input
                  type="number"
                  v-model="expense.amount"
                  placeholder="Amount"
                  class="form-control"
                />
              </div>
            </div>
            <div class="form-group dropdown d-flex">
              <select
                v-if="!isAddCategoryForm"
                v-model="expense.category"
                class="form-control col-sm-10"
              >
                <option disabled selected="selected" value>Category</option>
                <option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category"
                  >{{ category.name | capitalizeFirstLetter }}</option
                >
              </select>
              <px-add-category
                @toggle-is-add-category-form="getCategories()"
                :category="newCategory"
                v-else
              />
              <div class="col-sm-2">
                <font-awesome-icon
                  v-if="!isAddCategoryForm"
                  class="faIcon mt-2"
                  icon="plus"
                  @click="isAddCategoryForm = !isAddCategoryForm"
                />
              </div>
            </div>
            <div class="form-group">
              <textarea
                type="text"
                v-model="expense.notes"
                placeholder="Notes"
                class="form-control"
                cols="20"
                row="10"
              ></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            id="closeExpenseModal"
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
          >
            Close
          </button>
          <button
            v-if="expense.id"
            @click="addExpense"
            type="button"
            class="btn btn-primary"
          >
            Update
          </button>
          <button
            v-else
            @click="addExpense"
            type="button"
            class="btn btn-primary"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api.js";
import PxAddCategory from "@/components/PxAddCategory";

export default {
  name: "PxAddExpenseModal",
  components: {
    PxAddCategory,
  },
  data() {
    return {
      newCategory: {
        id: "",
        name: "",
        type: "expense",
      },
      categories: [],
      requestMessage: "",
      errors: [],
      isAddCategoryForm: false,
    };
  },
  props: {
    expense: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    this.getCategories();
  },
  methods: {
    async addExpense() {
      console.log(this.expense);
      this.errors = [];
      if (!this.expense.amount || this.expense.amount == 0) {
        this.errors.push("Amount required");
      }
      if (!this.expense.category) {
        this.errors.push("Category required");
      }
      if (!this.expense.notes) {
        this.errors.push("Notes required");
      }
      if (!this.errors.length) {
        if (!this.expense.id) {
          this.requestMessage = await api.addExpense(this.expense);
        } else {
          this.requestMessage = await api.updateExpense(this.expense);
        }
        alert(this.requestMessage);
        document.getElementById("closeExpenseModal").click();
        this.$emit("actions-event", {
          action: "reload",
          data: null,
        });
      }
    },
    getCategories() {
      this.isAddCategoryForm = false;
      api
        .getCategories("expense")
        .then((categories) => (this.categories = categories));
    },
  },
};
</script>
