<template>
  <div class="container">
    <div class="row">
      <div class="col-3">
        <ul class="list-group list-group-flush mb-2">
          <router-link
            exact
            tag="a"
            class="list-group-item list-group-item-action"
            to="/app/new-budget"
          >New Budget</router-link>
          <a
            class="list-group-item list-group-item-action"
            href="#"
            @click.prevent="editMode = !editMode"
            :class="{ 'active' : editMode }"
          >Edit Budget</a>
          <a
            class="list-group-item list-group-item-action"
            href="#"
            @click.prevent="removeBudget"
          >Delete Budget</a>
          <a
            class="list-group-item list-group-item-action bg-dark text-white"
            href="#"
            @click.prevent="$router.go(-1)"
          >Go Back</a>
        </ul>
      </div>
      <div class="col-9">
        <app-budgetdetail :budget="budget" v-if="!editMode" />
        <app-editbudget :budget="budget" v-else />
      </div>
    </div>
  </div>
</template>

<script>
import BudgetDetail from "../components/BudgetDetail";
import EditBudget from "../components/EditBudget";

import { EventBus } from "../main";

export default {
  components: {
    "app-budgetdetail": BudgetDetail,
    "app-editbudget": EditBudget
  },
  created() {
    EventBus.$on("refreshBudget", budget => {
      this.budget = budget;
      this.editMode = false;
    });
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
  },
  methods: {
    removeBudget() {
      if (confirm(`Delete budget?`)) {
        this.$store
        .dispatch("removeBudget", {
        _id: this.$route.params.id,
        token: this.$store.getters.auth.token
        })
        .then(() => this.$router.push('/app/budgets'))
        .catch(err => (this.err = err));
      }
    }
  }
};
</script>

<style scoped>
li.bg-primary {
  background-color: #772953 !important;
}
</style>