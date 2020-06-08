<template>
  <div id="app">
    <px-header />
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Category</th>
          <th scope="col">Notes</th>
          <th scope="col">Amount</th>
        </tr>
      </thead>
      <tbody>
        <px-expense
          v-for="expense in expenses"
          :key="expense.id"
          :expense="expense"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import PxHeader from "@/components/PxHeader";
import PxExpense from "@/components/PxExpense";
import api from "@/api.js";

export default {
  name: "App",
  components: {
    PxHeader,
    PxExpense,
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
  methods: {},
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
