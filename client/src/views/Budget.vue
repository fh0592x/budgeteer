<template>
  <div class="container">
    <div class="row">
      <div class="col-3">
        <ul class="list-group list-group-flush mb-2">
          <li class="list-group-item bg-primary text-white">Budget</li>
          <a class="list-group-item list-group-item-action" href="/app/new-budget">New Budget</a>
          <a class="list-group-item list-group-item-action" href="/app/new-budget">Edit Budget</a>
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
        <div class="card p-4">
          <div class="card-body">
            <div class="d-flex">
              <div class="mr-auto">
                <small class="text-muted">Budget Name</small>
                <h2>{{ budget.name }}</h2>
              </div>
              <div class="mr-4">
                <small class="text-muted">Total Amount</small>
                <h2>{{ budget.amount }} &bigcup;</h2>
              </div>
              <div>
                <small class="text-muted">Total Expended</small>
                <h2>{{ budget.totalExpended }} &bigcup;</h2>
              </div>
            </div>
            <div class="d-flex flex-column mt-2">
              <small class="text-muted mb-2">Budget Incomes</small>
              <div class="list-group">
                <li
                  class="list-group-item"
                  v-for="inc of budget.incomes"
                  :key="inc._id"
                >
                    <div class="d-flex">
                        <div class="mr-auto">{{ inc.name }}</div>
                        <div>{{ inc.amount }} &bigcup;</div>
                    </div>
                </li>
              </div>
            </div>
            <div class="d-flex flex-column mt-4">
              <small class="text-muted mb-2">Budget Expenses</small>
              <div class="list-group">
                <li
                  class="list-group-item"
                  v-for="exp of budget.expenses"
                  :key="exp._id"
                >
                    <div class="d-flex">
                        <div class="mr-auto">{{ exp.name }}</div>
                        <div>{{ exp.amount }} &bigcup;</div>
                    </div>
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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