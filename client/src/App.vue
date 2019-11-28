<template>
  <div id="app">
    <app-navbar />
  </div>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
  components: {
    "app-navbar": Navbar
  }
};
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Rubik|Miriam+Libre);

#app {
  font-family: "Rubik", sans-serif;
}

.navbar {
  font-family: 'Miriam Libre';
  text-transform: uppercase;
}

</style>
