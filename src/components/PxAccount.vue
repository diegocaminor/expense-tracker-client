<template>
  <tr
    v-bind:class="[
      { 'text-success': accountData.type == 'income' },
      { 'text-danger': accountData.type == 'expense' },
    ]"
  >
    <th scope="row">{{ accountData.index }}</th>
    <td>{{ accountData.category.name | capitalizeFirstLetter }}</td>
    <td>{{ accountData.notes }}</td>
    <td>{{ accountData.amount | dollar }}</td>
    <td>{{ accountData.date | moment }}</td>
    <td>
      <font-awesome-icon
        class="faIcon mr-2"
        icon="edit"
        v-on:click="editAccount(accountData)"
      />
      <font-awesome-icon
        class="faIcon "
        icon="trash"
        v-on:click="deleteAccount(accountData.id)"
      />
    </td>
  </tr>
</template>

<script>
import api from "@/api.js";

export default {
  name: "PxAccount",
  data() {
    return {
      requestMessage: "",
    };
  },
  props: {
    accountData: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    async deleteAccount(accountId) {
      if (this.accountData.type == "expense") {
        this.requestMessage = await api.deleteExpense(accountId);
      } else if (this.accountData.type == "income") {
        this.requestMessage = await api.deleteIncome(accountId);
      }
      alert(this.requestMessage);
      this.$emit("actions-event", {
        action: "reload",
        data: null,
      });
    },
    editAccount(account) {
      this.$emit("actions-event", {
        action: "edit-account",
        data: account,
      });
    },
  },
};
</script>
