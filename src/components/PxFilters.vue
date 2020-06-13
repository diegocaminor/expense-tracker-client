<template>
  <div>
    <div class="d-block text-left">
      <h2>Filters</h2>
    </div>

    <div class="d-flex">
      <div class="form-group mx-4">
        <select class="form-control" v-model="filterSelected" @change="getAllAccounts">
          <option disabled selected="selected" value>Select filter</option>
          <option v-for="filter in filters" :key="filter" :value="filter">{{filter}}</option>
        </select>
      </div>
      <div v-if="filterSelected=='Day'" class="form-group">
        <input
          class="form-control"
          type="date"
          :value="currentDate"
          id="example-date-input"
          @change="getAccountsByDateFilter"
        />
      </div>
      <div v-if="filterSelected=='Month'" class="form-group">
        <input
          class="form-control"
          type="month"
          :value="currentMonth"
          id="example-month-input"
          @change="getAccountsByDateFilter"
        />
      </div>
      <div v-if="filterSelected=='Year'" class="form-group dropdown">
        <select class="form-control" @change="getAccountsByDateFilter">
          <option selected="selected" value="currentYear">{{currentYear}}</option>
          <option v-for="year in years" :key="year" :value="year">{{year}}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
// import api from "@/assets/scripts/api.js";
// import cookies from "@/assets/scripts/cookies";
// const { id } = cookies;

export default {
  name: "PxFilters",
  components: {},
  data() {
    return {
      filterSelected: "",
      filters: ["Day", "Month", "Year", "All"],
      years: ["2019", "2020", "2021"]
    };
  },
  props: {
    currentDate: {
      type: String
    },
    currentMonth: {
      type: String
    },
    currentYear: {
      type: String
    }
  },
  methods: {
    getAccountsByDateFilter(event) {
      alert("get by : " + event.target.value);
    },
    getAllAccounts(event) {
      if (event.target.value === "All") {
        alert("get by : " + event.target.value);
      }
    }
  }
};
</script>