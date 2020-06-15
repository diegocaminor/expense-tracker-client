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
        class="faIcon"
        icon="trash"
        v-on:click="deleteAccount(accountData.id)"
      />
    </td>
  </tr>
</template>

<script>
import api from "@/assets/scripts/api.js";

export default {
  name: "PxAccount",
  data() {
    return {
      responseMessage: "",
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
        this.responseMessage = await api.deleteExpense(accountId);
      } else if (this.accountData.type == "income") {
        this.responseMessage = await api.deleteIncome(accountId);
      }
      this.$swal({
        icon: "success",
        title: "Deleted!",
        text: this.responseMessage,
      });

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
