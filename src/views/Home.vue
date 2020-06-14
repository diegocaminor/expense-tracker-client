<template>
  <div>
    <div class="container">
      <div class="row pt-5">
        <px-filters class="filters" v-on:search-result="reloadAccounts" />
        <table class="table" v-if="accounts.length">
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
        <div v-else class="row pt-5 pb-5 col-sm-4 offset-sm-4">
          <h2>{{ message }}</h2>
        </div>
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
    <div class="fixed-bottom p-3">
      <div>Total</div>
      <div class="total-amount">Incomes {{ incomesTotalAmount | dollar }}</div>
      <div class="total-amount">
        Expenses {{ expensesTotalAmount | dollar }}
      </div>
    </div>
  </div>
</template>

<script>
import PxAccount from "@/components/PxAccount";
import PxAccountModal from "@/components/PxAccountModal";
import PxFilters from "@/components/PxFilters";

import api from "@/assets/scripts/api.js";
import cookies from "@/assets/scripts/cookies";
const { id } = cookies;

class Model {
  constructor(id, userId, amount, category, notes, createdAt) {
    this.id = id || "";
    this.userId = userId || "";
    this.amount = amount || 0;
    this.category = category || "";
    this.notes = notes || "";
    this.createdAt = createdAt || "";
  }
}

export default {
  name: "Home",
  components: {
    PxAccount,
    PxAccountModal,
    PxFilters,
  },
  data() {
    return {
      accounts: [],
      incomes: [],
      incomesTotalAmount: 0,
      expenses: [],
      expensesTotalAmount: 0,
      formattedDate: this.formatDate(new Date()),
      model: new Model("", id, 0, "", "", this.formattedDate),
      updateModel: false,
      accountType: "",
      message:
        "You must learn to save and spend afterwards, let's tracking your accounts!😊",
    };
  },
  async created() {
    await api.getIncomes().then((incomes) => (this.incomes = incomes));
    await api.getExpenses().then((expenses) => (this.expenses = expenses));
    this.accounts = this.accounts.concat(this.incomes);
    this.accounts = this.accounts.concat(this.expenses);
  },
  watch: {
    accounts: function() {
      this.incomesTotalAmount = this.accounts
        .filter((account) => account.type == "income")
        .reduce((accumulator, income) => accumulator + income.amount, 0);

      this.expensesTotalAmount = this.accounts
        .filter((account) => account.type == "expense")
        .reduce((accumulator, expense) => accumulator + expense.amount, 0);
    },
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
        this.model.createdAt = this.formatDate(payload.data.date);

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
    reloadAccounts(queriedExpenses) {
      this.accounts = queriedExpenses || [];
      if (this.accounts.length == 0)
        this.message = "No data available for this date😞";
    },
    reinitializeModel(accountType) {
      this.accountType = accountType;
      if (!this.updateModel) {
        this.model = new Model("", id, 0, "", "", this.formattedDate);
      }
    },
    formatDate(date) {
      let d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },
  },
};
</script>

<style scoped>
.fixed-bottom {
  height: 20%;
  left: 75%;
  right: 1%;
  background: #38686a;
  color: #bbdef2;
  border-radius: 15px;
}

.total-amount {
  font-weight: 600;
}
</style>
