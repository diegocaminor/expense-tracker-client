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
              v-on:reload="getExpenses"
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
    <px-add-expense-modal v-on:reload="getExpenses" />
    <px-add-income-modal />
  </div>
</template>

<script>
import PxHeader from "@/components/PxHeader";
import PxExpense from "@/components/PxExpense";
import PxAddExpenseModal from "@/components/PxAddExpenseModal";
import PxAddIncomeModal from "@/components/PxAddIncomeModal";

import api from "@/api.js";

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
    };
  },
  created() {
    console.log("created!()");
    api.getExpenses().then((expenses) => (this.expenses = expenses));
  },
  methods: {
    getExpenses() {
      api.getExpenses().then((expenses) => (this.expenses = expenses));
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
