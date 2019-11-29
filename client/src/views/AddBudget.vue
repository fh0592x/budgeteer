<template>
  <div class="container h-100">
    <div class="row d-flex h-100 justify-content-center align-items-center">
      <div class="col-6">
        <div class="card p-4">
          <div class="card-body">
            <form>
              <div class="d-flex">
                <div class="mr-auto p-2">
                  <h2>New Budget</h2>
                </div>
                <div class="p-2">
                  <h3 class="text-muted">{{ amount }} &bigcup;</h3>
                </div>
              </div>
              <div class="form-group mb-3 mt-4">
                <app-alert :error="err" v-if="err" />
                <input
                  type="text"
                  class="form-control"
                  v-model="budget.name"
                  placeholder="Enter budget name"
                />
              </div>
              <div class="input-group mb-3" v-for="(inc, ix) in budget.incomes" :key="ix + 'abc'">{{ ix }}
                <input
                  type="text"
                  class="form-control"
                  v-model="inc.name"
                  placeholder="Income name"
                />
                <input
                  type="text"
                  class="form-control"
                  min="0"
                  v-model="inc.amount"
                  placeholder="Income amount"
                />
              </div>
              <div class="input-group mb-3" v-for="(exp, idx) in budget.expenses" :key="idx + 'def'"> {{ idx }}
                <input
                  type="text"
                  class="form-control"
                  v-model="exp.name"
                  placeholder="Expense name"
                />
                <input
                  type="text"
                  class="form-control"
                  min="0"
                  v-model="exp.amount"
                  placeholder="Expense amount"
                />
              </div>
              <div class="form-group">
                <div class="d-flex">
                  <div class="mr-auto">
                    <button type="button" class="btn btn-dark mr-2" @click.prevent="addIncome">
                      <i class="fa fa-plus mr-2"></i>
                      New Income
                    </button>
                    <button
                      v-if="budget.incomes.length > 0"
                      class="btn btn-danger"
                      type="button"
                      @click.prevent="removeIncome"
                    >
                      <i class="fa fa-trash-alt"></i>
                    </button>
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
              <hr />
              <div class="form-group">
                <div class="mr-auto">
                  <button type="button" class="btn btn-dark mr-2" @click.prevent="add">Submit</button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    @click.prevent="$router.go(-1)"
                  >Cancel</button>
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
import Alert from "../components/Alert";

export default {
  components: {
    "app-alert": Alert
  },
  data() {
    return {
      budget: {
        name: "",
        expenses: [],
        incomes: []
      },
      err: ""
    };
  },
  methods: {
    add() {
      this.$store
        .dispatch("addBudget", {
          budget: this.budget,
          token: this.$store.getters.auth.token
        })
        .then(() => this.$router.push("/app/budgets"))
        .catch(err => (this.err = err));
    },
    addExpense() {
      if (this.budget.expenses.length < 5) {
        this.budget.expenses.push({
          name: "",
          amount: 0
        });
      } else {
        this.err = "You may add up to 5 expenses at a time.";
      }
    },
    removeExpense() {
      this.budget.expenses.pop();
      if (this.err) this.err = "";
    },
    addIncome() {
      if (this.budget.incomes.length < 5) {
        this.budget.incomes.push({
          name: "",
          amount: 0
        });
      } else {
        this.err = "You may add up to 5 incomes at a time.";
      }
    },
    removeIncome() {
      this.budget.incomes.pop();
      if (this.err) this.err = "";
    }
  },
  computed: {
      amount() {
          return this.budget.incomes.reduce((acc, val) => acc + parseFloat(val.amount), 0) || 0;
      }
  }
};
</script>

<style>
</style>