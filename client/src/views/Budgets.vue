<template>
  <div class="container">
    <div class="d-flex">
      <div class="mr-auto p-2">
        <h2>Active Budgets</h2>
      </div>
      <div class="p-2">
        <router-link tag="button" to="/app/new-budget" exact class="btn btn-dark">
          <i class="fa fa-plus mr-2"></i>
          New Budget
        </router-link>
      </div>
    </div>
    <hr />
    <div class="row" v-if="budgets.length > 0">
      <app-budget class="col-4" v-for="budget of budgets" :key="budget._id" :budget="budget"/>
    </div>
    <h4 class="text-muted text-center mt-5" v-else>No Budgets. Add one.</h4>
  </div>
</template>

<script>
import Budget from "../components/Budget";

export default {
  components: {
    "app-budget": Budget
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