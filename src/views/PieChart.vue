<template>
  <div class="container">
    <div class="row pt-5">
      <bounce-loader
        :loading="isLoading"
        class="spinner-loader"
        color="#38686a"
        :size="100"
      />
      <px-filters
        v-if="!isLoading"
        class="filters"
        :isPieChart="isPieChart"
        v-on:search-result="reloadAccounts"
      />
      <div id="chart" v-if="series.length">
        <apexchart
          type="pie"
          width="380"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
      <div v-else class="row pt-5 pb-5 col-sm-4 offset-sm-4">
        <h2>{{ message }}</h2>
      </div>
    </div>
    <px-total-amount
      :incomesTotalAmount="incomesTotalAmount"
      :expensesTotalAmount="expensesTotalAmount"
    />
  </div>
</template>

<script>
import api from "@/assets/scripts/api.js";
import PxFilters from "@/components/PxFilters";
import PxTotalAmount from "@/components/PxTotalAmount";

export default {
  name: "PieChart",
  components: {
    PxFilters,
    PxTotalAmount,
  },
  data() {
    return {
      message: "",
      incomesTotalAmount: 0,
      expensesTotalAmount: 0,
      accounts: [],
      isPieChart: true,
      series: [],
      isLoading: false,
      chartOptions: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: [],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  },
  async created() {
    this.isLoading = true;
    this.accounts = await api
      .getExpenses(undefined, undefined, true)
      .then((expenses) => (this.expenses = expenses));
    if (this.accounts == 0) {
      this.message = "No data available for this date😞";
    } else {
      this.reloadAccounts(this.accounts);
    }
    this.isLoading = false;
  },
  watch: {
    accounts: function() {
      console.log("WATHC!!!!");
      console.log(this.accounts);

      this.expensesTotalAmount = this.accounts.reduce(
        (accumulator, expense) => accumulator + expense.totalAmount,
        0
      );
    },
  },
  methods: {
    reloadAccounts(queriedExpenses) {
      this.accounts = queriedExpenses;
      if (queriedExpenses.length == 0) {
        this.series = [];
        this.message = "No data available for this date😞";
      } else {
        this.series = queriedExpenses.map((expense) => expense.totalAmount);
        this.chartOptions = {
          labels: queriedExpenses.map((expense) => expense._id),
        };
      }
    },
  },
};
</script>

<style scoped>
#chart {
  position: absolute;
  left: 50%;
  margin-left: -10%;
  top: 50%;
  margin-top: -5%;
}
</style>
