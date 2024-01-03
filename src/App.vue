<template>
  <div id="app">
    <CircuitBreakerWarning />
    <Banner />
    <Navbar />
    <router-view id="router-view" />
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#router-view {
  background: #2c3e50;
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
}
</style>

<script>
// @ is an alias to /src
import Banner from "@/components/Banner.vue";
import Navbar from "@/components/Navbar.vue";
import CircuitBreakerWarning from "@/components/CircuitBreakerWarning.vue";

export default {
  name: "App",
  components: {
    Banner,
    Navbar,
    CircuitBreakerWarning,
  },
};
</script>
