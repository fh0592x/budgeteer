<template>
  <div class="container">
    <div class="row">
      <div class="col-3">
        <ul class="list-group list-group-flush mb-2">
          <li class="list-group-item bg-primary text-white">Budget</li>
          <router-link exact tag="a" class="list-group-item list-group-item-action" to="/app/new-budget">New Budget</router-link>
          <a class="list-group-item list-group-item-action" href="#" @click.prevent="editMode = !editMode" :class="{ 'active' : editMode }">Edit Budget</a>
          <a class="list-group-item list-group-item-action" href="/app/new-budget">Delete Budget</a>
          <li class="list-group-item bg-primary text-white">Income</li>
          <a class="list-group-item list-group-item-action" href="/app/new-budget">New Income</a>
          <a class="list-group-item list-group-item-action" href="/app/new-budget">Edit Income</a>
          <a class="list-group-item list-group-item-action" href="/app/new-budget">Delete Income</a>
          <li class="list-group-item bg-primary text-white">Expense</li>
          <a class="list-group-item list-group-item-action" href="/app/new-budget">New Expense</a>
          <a class="list-group-item list-group-item-action" href="/app/new-budget">Edit Expense</a>
          <a class="list-group-item list-group-item-action" href="/app/new-budget">Delete Expense</a>
          <a
            class="list-group-item list-group-item-action bg-success text-white"
            href="/app/new-budget"
          >Save Changes</a>
          <a
            class="list-group-item list-group-item-action"
            href="#"
            @click.prevent="$router.go(-1)"
          >Go Back</a>
        </ul>
      </div>
      <div class="col-9">
        <app-budgetdetail :budget="budget" v-if="!editMode"/>
        <app-editbudget :budget="budget" v-else/>
      </div>
    </div>
  </div>
</template>

<script>
import BudgetDetail from '../components/BudgetDetail';
import EditBudget from '../components/EditBudget';

export default {
  components: {
      'app-budgetdetail': BudgetDetail,
      'app-editbudget': EditBudget
  },
  created() {
    const idx = this.$store.getters.budgets
      .map(x => x._id)
      .indexOf(this.$route.params.id);
    if (idx !== -1) {
      this.budget = this.$store.getters.budgets[idx];
    } else {
      this.$store
        .dispatch("getBudget", {
          _id: this.$route.params.id,
          token: this.$store.getters.auth.token
        })
        .then(budget => (this.budget = budget))
        .catch(err => (this.err = err));
    }
  },
  data() {
    return {
      budget: {},
      editMode: false,
      err: ""
    };
  }
};
</script>

<style scoped>
li.bg-primary {
  background-color: #772953 !important;
}
</style>