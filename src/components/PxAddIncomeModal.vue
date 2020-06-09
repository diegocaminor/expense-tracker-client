<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="addIncomeModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="addIncomeModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addIncomeModalLabel">New income</h5>
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
              <input
                type="number"
                v-model="income.amount"
                placeholder="Amount"
                class="form-control"
              />
            </div>
            <div class="form-group dropdown">
              <select v-model="income.category" class="form-control">
                <option disabled selected="selected" value>Category</option>
                <option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category"
                >{{ category.name }}</option>
              </select>
            </div>
            <div class="form-group">
              <textarea
                type="text"
                v-model="income.notes"
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
            id="closeIncomeModal"
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
          >Close</button>
          <button @click="addIncome" type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api.js";

class Income {
  constructor(userId, amount, categoryId, categoryName, notes) {
    this.userId = userId || "5ed9f0c97745d7515f0910b0";
    this.amount = amount || 0;
    this.category = categoryId || "";
    this.notes = notes || "";
  }
}

export default {
  name: "PxAddIncomeModal",

  data() {
    return {
      income: new Income(),
      categories: [
        {
          categoryId: "5ed878eb1863db2e8822633b",
          name: "Salary"
        },
        {
          categoryId: "5ed878eb1863db2e88f26332",
          name: "Deposits"
        },
        {
          categoryId: "5ed878eb1863db2e88f26334",
          name: "Savings"
        }
      ],
      requestMessage: "",
      errors: []
    };
  },
  methods: {
    async addIncome() {
      this.errors = [];
      if (!this.income.amount || this.income.amount == 0) {
        this.errors.push("Amount required");
      }
      if (!this.income.category) {
        this.errors.push("Category required");
      }
      if (!this.income.notes) {
        this.errors.push("Notes required");
      }
      if (!this.errors.length) {
        this.requestMessage = await api.addIncome(this.income);
        alert(this.requestMessage);
        this.income = new Income();
        document.getElementById("closeIncomeModal").click();
      }
    }
  }
};
</script>
