<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" href="#">
        Budgeteer
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav">
          <li class="nav-item" v-if="!!auth.token">
              <a href="#" class="nav-link">Budgets</a>
          </li>
          <li class="nav-item" v-if="!!auth.token">
              <a href="#" class="nav-link">Categories</a>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item" v-if="!auth.token" :class="{ 'active' : route === '/login' }">
              <router-link to="/login" exact class="nav-link">Log in</router-link>
          </li>
          <li class="nav-item" v-if="!auth.token" :class="{ 'active' : route === '/signup' }">
              <router-link to="/signup" exact class="nav-link">Sign up</router-link>
          </li>
          <li class="nav-item dropdown" 
          v-if="auth.username">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >{{ auth.username }}</a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#" @click.prevent="logout">Log out</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    auth() {
      return this.$store.getters.auth || { token: '', username: '' };
    },
    route() {
      return this.$route.path;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.replace('/login');
    }
  }
};
</script>

<style scoped>
</style>