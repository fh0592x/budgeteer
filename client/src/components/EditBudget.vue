<template>
  <div class="card p-4">
    <div class="card-body">
      <form>
        <div class="d-flex">
          <div class="mr-auto">
            <h2>Edit Budget</h2>
          </div>
        </div>
        <div class="form-group mb-3 mt-4">
          <app-alert :error="err" v-if="err" />
          <label for class="text-muted">Budget Name</label>
          <input
            type="text"
            class="form-control"
            v-model="budget.name"
            placeholder="Enter budget name"
          />
        </div>
        <label for class="text-muted" v-if="budget.incomes.length > 0">Incomes: Name and Amount</label>
        <div class="input-group mb-3" v-for="(inc, ix) in budget.incomes" :key="ix + 'abc'">
          <input type="text" class="form-control" v-model="inc.name" placeholder="Income name" />
          <input
            type="text"
            class="form-control"
            min="0"
            v-model="inc.amount"
            placeholder="Income amount"
          />
        </div>
        <label for class="text-muted" v-if="budget.expenses.length > 0">Expenses: Name and Amount</label>
        <div class="input-group mb-3" v-for="(exp, idx) in budget.expenses" :key="idx + 'def'">
          <input type="text" class="form-control" v-model="exp.name" placeholder="Expense name" />
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
            <button type="button" class="btn btn-dark mr-2" @click.prevent="edit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Alert from "../components/Alert";

import { EventBus } from "../main";

export default {
  components: {
    "app-alert": Alert
  },
  data() {
    return {
      //   budget: {
      //     name: "",
      //     expenses: [],
      //     incomes: []
      //   },
      err: ""
    };
  },
  props: ["budget"],
  methods: {
    edit() {
      this.$store
        .dispatch("editBudget", {
          _id: this.budget._id,
          budget: this.budget,
          token: this.$store.getters.auth.token
        })
        .then(budget => EventBus.$emit("refreshBudget", budget))
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
      return (
        this.budget.incomes.reduce(
          (acc, val) => acc + parseFloat(val.amount),
          0
        ) || 0
      );
    }
  }
};
</script>

<style>
</style>