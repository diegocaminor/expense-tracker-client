<template>
  <div>
    <div id="chart">
      <apexchart
        type="pie"
        width="380"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
  </div>
</template>

<script>
import api from "@/assets/scripts/api.js";

export default {
  name: "PieChart",

  data() {
    return {
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
    const expenses = await api.getPieChart();
    this.series = expenses.map((expense) => expense.totalAmount);
    this.chartOptions = {
      labels: expenses.map((expense) => expense._id),
    };
  },
  methods: {},
};
</script>

<style scoped>
#chart {
  position: absolute;
  left: 50%;
  margin-left: -10%;
  top: 50%;
  margin-top: -10%;
}
</style>
