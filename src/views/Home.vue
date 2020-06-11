<template>
  <div>
    <div class="container">
      <div class="row pt-5">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Category</th>
              <th scope="col">Notes</th>
              <th scope="col">Amount</th>
              <th scope="col">Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <px-account
              v-for="account in accounts"
              :key="account.id"
              :accountData="account"
              v-on:actions-event="actionsEvent"
            />
          </tbody>
        </table>
      </div>
      <div class="row pt-3 pb-5">
        <div class="offset-sm-3 col-sm-3 pb-2">
          <button
            id="addExpenseButton"
            type="button"
            class="btn btn-danger"
            data-toggle="modal"
            data-target="#accountModal"
            @click="reinitializeModel('expense')"
          >
            Add expense -
          </button>
        </div>
        <div class="col-sm-3">
          <button
            id="addIncomeButton"
            type="button"
            class="btn btn-success"
            data-toggle="modal"
            data-target="#accountModal"
            @click="reinitializeModel('income')"
          >
            Add income +
          </button>
        </div>
      </div>
    </div>
    <px-account-modal
      v-on:actions-event="actionsEvent"
      :accountData="model"
      :accountType="accountType"
    />
  </div>
</template>

<script>
import PxAccount from "@/components/PxAccount";
import PxAccountModal from "@/components/PxAccountModal";

import api from "@/api.js";

class Model {
  constructor() {
    this.id = "";
    this.userId = "5ed9f0c97745d7515f0910b0";
    this.amount = 0;
    this.category = "";
    this.notes = "";
  }
}

export default {
  name: "Home",
  components: {
    PxAccount,
    PxAccountModal,
  },
  data() {
    return {
      accounts: [],
      incomes: [],
      expenses: [],
      model: new Model(),
      updateModel: false,
      accountType: "",
    };
  },
  async created() {
    await api.getIncomes().then((incomes) => (this.incomes = incomes));
    await api.getExpenses().then((expenses) => (this.expenses = expenses));
    this.accounts = this.accounts.concat(this.incomes);
    this.accounts = this.accounts.concat(this.expenses);
  },
  methods: {
    async actionsEvent(payload) {
      if (payload.action == "reload") {
        await api.getIncomes().then((incomes) => (this.incomes = incomes));
        await api.getExpenses().then((expenses) => (this.expenses = expenses));
        this.accounts = [];
        this.accounts = this.accounts.concat(this.incomes);
        this.accounts = this.accounts.concat(this.expenses);
      } else if (payload.action == "edit-account") {
        this.model = payload.data;
        this.updateModel = true;
        // open 'AddAccountModal'
        if (this.model.type == "expense") {
          document.getElementById("addExpenseButton").click();
        } else {
          document.getElementById("addIncomeButton").click();
        }
        this.updateModel = false;
      }
    },
    reinitializeModel(accountType) {
      this.accountType = accountType;
      if (!this.updateModel) {
        this.model = new Model();
      }
    },
  },
};
</script>