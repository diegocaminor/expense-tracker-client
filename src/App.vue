<template>
  <div id="app">
    <px-header />
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
            <px-expense
              v-for="expense in expenses"
              :key="expense.id"
              :expense="expense"
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
            data-target="#addExpenseModal"
            @click="reinitializeModel"
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
            data-target="#addIncomeModal"
          >
            Add income +
          </button>
        </div>
      </div>
    </div>
    <px-add-expense-modal v-on:actions-event="actionsEvent" :expense="model" />
    <px-add-income-modal />
  </div>
</template>

<script>
import PxHeader from "@/components/PxHeader";
import PxExpense from "@/components/PxExpense";
import PxAddExpenseModal from "@/components/PxAddExpenseModal";
import PxAddIncomeModal from "@/components/PxAddIncomeModal";

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
  name: "App",
  components: {
    PxHeader,
    PxExpense,
    PxAddExpenseModal,
    PxAddIncomeModal,
  },
  data() {
    return {
      expenses: [],
      model: new Model(),
      updateModel: false,
    };
  },
  created() {
    api.getExpenses().then((expenses) => (this.expenses = expenses));
  },
  methods: {
    actionsEvent(payload) {
      if (payload.action == "reload") {
        api.getExpenses().then((expenses) => (this.expenses = expenses));
      } else if (payload.action == "edit-expense") {
        console.log(payload);
        this.model = payload.data;
        this.updateModel = true;
        document.getElementById("addExpenseButton").click();
        this.updateModel = false;
      }
    },
    reinitializeModel() {
      if (!this.updateModel) {
        this.model = new Model();
      }
    },
  },
};
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
