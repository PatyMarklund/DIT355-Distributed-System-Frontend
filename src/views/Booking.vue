<template>
  <b-container fluid>
    <div class="booking">
      <b-row>
        <b-col>
          <a
            class="btn btn-danger"
            href="../"
            role="button"
            @click="goToHomePage"
            >Cancel</a
          >
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <Calendar />
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
// @ is an alias to /src
import Calendar from "../components/Calendar.vue";

export default {
  name: "booking",
  components: { Calendar },
  methods: {
    goToHomePage() {
      console.log("Going to the home page...");
      window.location.href = "../";
    },
  },
};
</script>

<style>
.btn-danger {
  margin: 1vw;
  float: right;
}
.btn-primary:hover {
  background-color: orange;
}
</style>
