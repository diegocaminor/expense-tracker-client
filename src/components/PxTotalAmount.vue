<template>
  <div>
    <div v-show="incomesTotalAmount!=0 || expensesTotalAmount!=0" class="fixed-bottom p-3">
      <div>Total</div>
      <div
        v-show="incomesTotalAmount!=0"
        class="total-amount"
      >Incomes {{ incomesTotalAmount | dollar }}</div>
      <div
        v-show="expensesTotalAmount!=0"
        class="total-amount"
      >Expenses {{ expensesTotalAmount | dollar }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PxTotalAmount",
  props: {
    incomesTotalAmount: {
      type: Number,
      default: () => {}
    },
    expensesTotalAmount: {
      type: Number
    }
  }
};
</script>

<style scoped>
.fixed-bottom {
  height: 20%;
  left: 75%;
  right: 1%;
  background: #38686a;
  color: #bbdef2;
  border-radius: 15px;
}

.total-amount {
  font-weight: 600;
}
</style>