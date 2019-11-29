<template>
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
          <h2 :class="{ 'text-danger': budget.totalExpended > budget.amount }">{{ budget.totalExpended }} &bigcup;</h2>
        </div>
      </div>
      <div class="d-flex flex-column mt-2">
        <small class="text-muted mb-2">Budget Incomes</small>
        <div class="list-group" v-if="budget.incomes.length > 0">
          <li class="list-group-item" v-for="inc of budget.incomes" :key="inc._id">
            <div class="d-flex">
              <div class="mr-auto">{{ inc.name }}</div>
              <div>{{ inc.amount }} &bigcup;</div>
            </div>
          </li>
        </div>
        <p class="text-muted mb-0" v-else>None</p>
      </div>
      <div class="d-flex flex-column mt-4">
        <small class="text-muted mb-2">Budget Expenses</small>
        <div class="list-group" v-if="budget.expenses.length > 0">
          <li class="list-group-item" v-for="exp of budget.expenses" :key="exp._id">
            <div class="d-flex">
              <div class="mr-auto">{{ exp.name }}</div>
              <div>{{ exp.amount }} &bigcup;</div>
            </div>
          </li>
        </div>
        <p class="text-muted mb-0" v-else>None</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: ['budget']
};
</script>

<style>
</style>