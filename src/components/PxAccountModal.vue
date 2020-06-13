<template>
  <!-- Modal -->
  <div
    class="modal fade"
    ref="vuemodal"
    id="accountModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="accountModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <div v-if="accountType == 'expense'">
            <h5 class="modal-title" id="accountModalLabel" v-if="!accountData.id">New expense</h5>
            <h5 class="modal-title" id="accountModalLabel" v-else>Update expense</h5>
          </div>
          <div v-else>
            <h5 class="modal-title" id="accountModalLabel" v-if="!accountData.id">New income</h5>
            <h5 class="modal-title" id="accountModalLabel" v-else>Update income</h5>
          </div>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
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
                  v-model="accountData.amount"
                  placeholder="Amount"
                  class="form-control"
                />
              </div>
            </div>
            <div class="form-group dropdown d-flex">
              <select
                v-if="!showAddCategoryForm"
                v-model="accountData.category"
                class="form-control col-sm-10"
              >
                <option disabled selected="selected" value>Category</option>
                <option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category"
                >{{ category.name | capitalizeFirstLetter }}</option>
              </select>
              <!--add category form-->
              <px-add-category
                @toggle-get-categories="getCategories(accountType)"
                :category="newCategory"
                v-else
              />
              <!--end add category form-->
              <div class="col-sm-2">
                <font-awesome-icon
                  v-if="!showAddCategoryForm"
                  class="faIcon mt-2"
                  icon="plus"
                  @click="showAddCategoryForm = !showAddCategoryForm"
                />
              </div>
            </div>
            <div class="form-group">
              <textarea
                type="text"
                v-model="accountData.notes"
                placeholder="Notes"
                class="form-control"
                cols="20"
                row="10"
              ></textarea>
            </div>
            <div class="form-group">
              <input class="form-control" v-model="accountData.createdAt" type="date" />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            id="closeAccountModal"
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
            @click="showAddCategoryForm = false"
          >Close</button>

          <div v-if="accountType == 'expense'">
            <button
              v-if="accountData.id"
              @click="addAccount"
              type="button"
              class="btn btn-primary"
            >Update expense</button>
            <button v-else @click="addAccount" type="button" class="btn btn-primary">Save expense</button>
          </div>
          <div v-else>
            <button
              v-if="accountData.id"
              @click="addAccount"
              type="button"
              class="btn btn-primary"
            >Update income</button>
            <button v-else @click="addAccount" type="button" class="btn btn-primary">Save income</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/assets/scripts/api.js";
import PxAddCategory from "@/components/PxAddCategory";
import cookies from "@/assets/scripts/cookies";
const { id } = cookies;

export default {
  name: "PxAccountModal",
  components: {
    PxAddCategory
  },
  data() {
    return {
      newCategory: {
        id: "",
        userId: id,
        name: "",
        type: ""
      },
      categories: [],
      responseMessage: "",
      errors: [],
      showAddCategoryForm: false
    };
  },
  props: {
    accountData: {
      type: Object,
      default: () => {}
    },
    accountType: {
      type: String
    }
  },
  watch: {
    accountType: function() {
      this.getCategories(this.accountType);
      this.newCategory.id = "";
      this.newCategory.name = "";
      this.newCategory.type = this.accountType;
    }
  },
  methods: {
    async addAccount() {
      this.errors = [];
      if (!this.accountData.amount || this.accountData.amount == 0) {
        this.errors.push("Amount required");
      }
      if (!this.accountData.category) {
        this.errors.push("Category required");
      }
      if (!this.accountData.notes) {
        this.errors.push("Notes required");
      }
      if (!this.errors.length) {
        if (this.accountType == "expense") {
          if (!this.accountData.id) {
            this.responseMessage = await api.addExpense(this.accountData);
          } else {
            this.responseMessage = await api.updateExpense(this.accountData);
          }
        } else if (this.accountType == "income") {
          if (!this.accountData.id) {
            this.responseMessage = await api.addIncome(this.accountData);
          } else {
            this.responseMessage = await api.updateIncome(this.accountData);
          }
        }
        alert(this.responseMessage);
        document.getElementById("closeAccountModal").click();
        this.$emit("actions-event", {
          action: "reload",
          data: null
        });
      }
    },
    getCategories(accountType) {
      // hide 'add category form'
      this.showAddCategoryForm = false;
      api
        .getCategories(accountType)
        .then(categories => (this.categories = categories));
    },
    hideAddCategoryForm() {
      if (this.showAddCategoryForm) this.showAddCategoryForm = false;
    }
  }
};
</script>
