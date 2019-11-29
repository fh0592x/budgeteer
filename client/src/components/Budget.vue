<template>
  <div class="col-4 mb-4">
    <router-link tag="div" :to="`/app/budgets/${ budget._id }`" exact class="card" >
      <div class="card-body">
        <h5 class="card-title">{{ budget.name }}</h5>
        <h6 class="card-subtitle mb-2 text-muted">
          Total Budgeted
          <span class="float-right">
            {{ budget.amount }}
            &bigcup;
          </span>
        </h6>
        <div class="progress mt-3" style="height: 5px;">
          <div
            class="progress-bar"
            :class="[ expendedPercentage == 100 ? 'bg-danger' : 'bg-info' ]"
            :style="{ 'width': `${ expendedPercentage }%` }"
            role="progressbar"
            aria-valuenow="0"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
    computed: {
        expendedPercentage() {
            const prcnt = (this.budget.totalExpended / this.budget.amount) * 100;
            /* eslint no-console: 0 */
            return prcnt > 100 ? '100' : prcnt;
        }
    },
    props: ['budget']
};
</script>

<style>
</style>