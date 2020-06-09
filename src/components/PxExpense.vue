<template>
  <tr>
    <th scope="row">{{ expense.index }}</th>
    <td>{{ expense.categoryName | capitalizeFirstLetter }}</td>
    <td>{{ expense.notes }}</td>
    <td>{{ expense.amount | dollar }}</td>
    <td>{{ expense.date | moment }}</td>
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
