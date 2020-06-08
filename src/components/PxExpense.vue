<template>
  <tr>
    <th scope="row">{{ expense.index }}</th>
    <td>{{ expense.categoryName }}</td>
    <td>{{ expense.notes }}</td>
    <td>{{ expense.amount }}</td>
  </tr>
</template>

<script>
export default {
  name: "PxExpense",
  data() {
    return {};
  },
  props: {
    expense: {
      type: Object,
      default: () => {},
    },
  },
  methods: {},
};
</script>
