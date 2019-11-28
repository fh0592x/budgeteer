<template>
  <div class="container">
    <h2>Active Budgets</h2>
    <hr />
    <div class="row">
      <app-budget class="col-4" v-for="budget of budgets" :key="budget._id" :budget="budget"/>
    </div>
  </div>
</template>

<script>
import Budget from '../components/Budget';

export default {
  components: {
    'app-budget': Budget
  },
  created() {
    this.$store
      .dispatch("getBudgets", { token: this.$store.getters.auth.token })
      .then(budgets => (this.budgets = budgets))
      .catch(err => (this.err = err));
  },
  data() {
    return {
      budgets: [],
      err: ""
    };
  }
};
</script>

<style>
</style>