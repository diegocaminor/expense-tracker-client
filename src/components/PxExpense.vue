<template>
  <tr>
    <th scope="row">{{ expense.index }}</th>
    <td>{{ expense.category.name | capitalizeFirstLetter }}</td>
    <td>{{ expense.notes }}</td>
    <td>{{ expense.amount | dollar }}</td>
    <td>{{ expense.date | moment }}</td>
    <td>
      <font-awesome-icon
        class="faIcon mr-2"
        icon="edit"
        v-on:click="editExpense(expense)"
      />
      <font-awesome-icon
        class="faIcon "
        icon="trash"
        v-on:click="deleteExpense(expense.id)"
      />
    </td>
  </tr>
</template>

<script>
import api from "@/api.js";

export default {
  name: "PxExpense",
  data() {
    return {
      requestMessage: "",
    };
  },
  props: {
    expense: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    async deleteExpense(expenseId) {
      this.requestMessage = await api.deleteExpense(expenseId);
      alert(this.requestMessage);
      this.$emit("actions-event", {
        action: "reload",
        data: null,
      });
    },
    editExpense(expense) {
      this.$emit("actions-event", {
        action: "edit-expense",
        data: expense,
      });
    },
  },
};
</script>

<style scoped>
.faIcon {
  cursor: pointer;
}
</style>
