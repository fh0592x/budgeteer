<template>
  <div class="alert bg-danger text-white fade show" role="alert">
      <i class="fas fa-exclamation-circle mr-2"></i>{{ error }}
  </div>
</template>

<script>
export default {
    props: ['error']
};
</script>

<style>
</style>