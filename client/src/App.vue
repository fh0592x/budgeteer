<template>
  <div id="app" class="h-100">
    <app-navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
  created() {
    this.$store.dispatch('refreshAuth');
  },
  components: {
    "app-navbar": Navbar
  }
};
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Rubik|Miriam+Libre);

body,
html {
  height: 100%;
}

#app {
  font-family: "Rubik", sans-serif;
}

h1, h2, h3, h4, h5, h6, .btn, .navbar {
  font-family: 'Miriam Libre';
  text-transform: uppercase;
}

</style>
