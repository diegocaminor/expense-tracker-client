<template>
  <div>
    <div class="d-block text-left">
      <h2>Filters</h2>
    </div>

    <div class="d-flex">
      <div class="form-group mx-4">
        <select
          class="form-control"
          v-model="filterSelected"
          @change="queryDate = ''"
        >
          <option disabled selected="selected" value>Select filter</option>
          <option
            v-for="filter in queryFilters"
            :key="filter"
            :value="filter"
            >{{ filter | capitalizeFirstLetter }}</option
          >
        </select>
      </div>
      <div v-if="filterSelected == 'day'" class="form-group mx-4">
        <input
          class="form-control"
          type="date"
          id="example-date-input"
          @change="setQueryDate"
        />
      </div>
      <div v-if="filterSelected == 'month'" class="form-group mx-4">
        <input
          class="form-control"
          type="month"
          id="example-month-input"
          @change="setQueryDate"
        />
      </div>
      <div v-if="filterSelected == 'year'" class="form-group mx-4 dropdown">
        <select class="form-control" @change="setQueryDate">
          <option disabled selected="selected" value="currentYear"
            >Select year</option
          >
          <option v-for="year in years" :key="year" :value="year">
            {{ year }}
          </option>
        </select>
      </div>
      <div>
        <button
          type="button"
          class="btn btn-primary"
          v-if="filterSelected != ''"
          @click="getAccountsByFilter()"
        >
          Search
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/assets/scripts/api.js";

export default {
  name: "PxFilters",
  components: {},
  data() {
    return {
      filterSelected: "",
      queryDate: "",
      queryFilters: ["day", "month", "year", "all"],
      years: ["2019", "2020", "2021", "2022", "2023", "2024", "2025"],
    };
  },
  props: {
    isPieChart: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    setQueryDate(event) {
      this.queryDate = event.target.value;
    },
    async getAccountsByFilter() {
      let accounts = [];
      let queriedIncomes;
      let queriedExpenses;
      let reloadData = false;
      if (this.filterSelected == "all") {
        reloadData = true;
        if (!this.isPieChart) {
          queriedIncomes = await api.getIncomes();
          accounts = accounts.concat(queriedIncomes);
          queriedExpenses = await api.getExpenses();
          accounts = accounts.concat(queriedExpenses);
        } else {
          queriedExpenses = await api.getExpenses(
            undefined,
            undefined,
            this.isPieChart
          );
          accounts = accounts.concat(queriedExpenses);
        }
      } else {
        if (this.queryDate != "") {
          reloadData = true;
          if (!this.isPieChart) {
            queriedIncomes = await api.getIncomes(
              this.filterSelected,
              this.queryDate
            );
            accounts = accounts.concat(queriedIncomes);
            queriedExpenses = await api.getExpenses(
              this.filterSelected,
              this.queryDate
            );
            accounts = accounts.concat(queriedExpenses);
          } else {
            queriedExpenses = await api.getExpenses(
              this.filterSelected,
              this.queryDate,
              this.isPieChart
            );
            accounts = accounts.concat(queriedExpenses);
          }
        } else {
          reloadData = false;
          this.$swal({
            icon: "info",
            title: "Please, select a date",
          });
        }
      }
      if (reloadData) this.$emit("search-result", accounts);
    },
  },
};
</script>
