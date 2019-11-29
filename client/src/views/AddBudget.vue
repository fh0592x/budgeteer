<template>
  <div class="container h-100">
    <div class="row d-flex h-100 justify-content-center align-items-center">
      <div class="col-6">
        <div class="card p-4">
          <div class="card-body">
            <form>
              <h3>New Budget</h3>
              <div class="form-group mb-3 mt-4">
                <app-alert :error="err" v-if="err" />
                <input
                  type="text"
                  class="form-control"
                  v-model="budget.name"
                  placeholder="Enter budget name"
                />
              </div>
              <div class="form-group mb-3">
                <input
                  type="number"
                  class="form-control"
                  v-model="budget.amount"
                  placeholder="Enter budget amount"
                />
              </div>
              <div class="input-group mb-3" v-for="(idx, exp) in budget.expenses" :key="idx * 1234">
                <input
                  type="text"
                  class="form-control"
                  v-model="exp.name"
                  placeholder="Expense name"
                />
                <input
                  type="text"
                  class="form-control"
                  v-model="exp.amount"
                  placeholder="Expense amount"
                />
              </div>
              <div class="form-group">
                <div class="d-flex">
                  <div class="mr-auto">
                    <button type="button" class="btn btn-dark mr-2" @click.prevent="add">Submit</button>
                    <button
                      type="button"
                      class="btn btn-secondary"
                      @click.prevent="$router.go(-1)"
                    >Cancel</button>
                  </div>
                  <div>
                    <button type="button" class="btn btn-dark mr-2" @click.prevent="addExpense">
                      <i class="fa fa-plus mr-2"></i>
                      New Expense
                    </button>

                    <button
                      v-if="budget.expenses.length > 0"
                      class="btn btn-danger"
                      type="button"
                      @click.prevent="removeExpense"
                    >
                      <i class="fa fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Alert from '../components/Alert';

export default {
  components: {
      'app-alert': Alert
  },
  data() {
    return {
      budget: {
        name: "",
        amount: "",
        expenses: []
      },
      err: ""
    };
  },
  methods: {
    add() {},
    addExpense() {
      if (this.budget.expenses.length < 5) {
          this.budget.expenses.push({
            name: "",
            amount: 0
        });
      } else {
          this.err = 'You may add up to 5 expenses at a time.'
      }
    },
    removeExpense() {
        this.budget.expenses.pop();
        if (this.err) this.err = '';
    }
  }
};
</script>

<style>
</style>