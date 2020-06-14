<template>
  <div class="container">
    <div class="row pt-5">
      <px-filters
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
  </div>
</template>

<script>
// import api from "@/assets/scripts/api.js";
import PxFilters from "@/components/PxFilters";

export default {
  name: "PieChart",
  components: {
    PxFilters,
  },
  data() {
    return {
      message: "No data available for this date😞",
      isPieChart: true,
      series: [],
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
    // const expenses = await api.getPieChart();
    // this.series = expenses.map((expense) => expense.totalAmount);
    // this.chartOptions = {
    //   labels: expenses.map((expense) => expense._id),
    // };
  },
  methods: {
    reloadAccounts(queriedExpenses) {
      console.log("debería haber entrado aqyí");
      console.log("queriedExpenses.length: " + queriedExpenses.length);
      if (queriedExpenses.length == 0) {
        this.series = [];
        this.message = "No data available for this date😞";
      } else {
        console.log("y luego aquí");
        console.log(queriedExpenses);
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
