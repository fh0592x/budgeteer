<template>
  <div id="app" class="h-100">
    <app-navbar />
    <transition name="slide-fade" mode="out-in">
      <router-view />
    </transition>
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

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

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

.card {
  cursor: pointer;
}

</style>
