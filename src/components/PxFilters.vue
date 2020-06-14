<template>
  <div>
    <div class="d-block text-left">
      <h2>Filters</h2>
    </div>

    <div class="d-flex">
      <div class="form-group mx-4">
        <select class="form-control" v-model="filterSelected" @change="queryDate=''">
          <option disabled selected="selected" value>Select filter</option>
          <option
            v-for="filter in queryFilters"
            :key="filter"
            :value="filter"
          >{{filter | capitalizeFirstLetter}}</option>
        </select>
      </div>
      <div v-if="filterSelected=='day'" class="form-group mx-4">
        <input class="form-control" type="date" id="example-date-input" @change="setQueryDate" />
      </div>
      <div v-if="filterSelected=='month'" class="form-group mx-4">
        <input class="form-control" type="month" id="example-month-input" @change="setQueryDate" />
      </div>
      <div v-if="filterSelected=='year'" class="form-group mx-4 dropdown">
        <select class="form-control" @change="setQueryDate">
          <option disabled selected="selected" value="currentYear">Select year</option>
          <option v-for="year in years" :key="year" :value="year">{{year}}</option>
        </select>
      </div>
      <div>
        <button
          type="button"
          class="btn btn-primary"
          v-if="filterSelected!=''"
          @click="getAccountsByFilter()"
        >Search</button>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/assets/scripts/api.js";
// import cookies from "@/assets/scripts/cookies";
// const { id } = cookies;

export default {
  name: "PxFilters",
  components: {},
  data() {
    return {
      filterSelected: "",
      queryDate: "",
      queryFilters: ["day", "month", "year", "all"],
      years: ["2019", "2020", "2021"]
    };
  },
  methods: {
    setQueryDate(event) {
      this.queryDate = event.target.value;
    },
    getAccountsByFilter() {
      if (this.filterSelected == "all") {
        api.getExpenses().then(queriedExpenses => {
          this.$emit("search-result", queriedExpenses);
        });
      } else {
        if (this.queryDate != "") {
          api
            .getExpenses(this.filterSelected, this.queryDate)
            .then(queriedExpenses => {
              this.$emit("search-result", queriedExpenses);
            });
        } else {
          alert("Please, select a date");
        }
      }
    }
  }
};
</script>