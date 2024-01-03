<template>
  <div>
    <b-alert v-model="alertPopup" dismissible variant="danger">
      We are currently experience more traffick than normal and are not taking
      bookings at the moment. Please try again later, we are sorry for the
      inconvenience.
    </b-alert>
  </div>
</template>

<style></style>

<script>
export default {
  name: "App",
  components: {},
  created() {
    this.onCreate();
  },
  data() {
    return {
      alertPopup: false,
    };
  },
  methods: {
    //This hides/shows the alert based on the latest message from the booking component regarding the Circuit Breaker. Open = not taking new bookings, closes = all good.
    onCreate() {
      this.$mqtt.subscribe("frontend/alert");
      this.$mqtt.on("message", (topic, message) => {
        if (!topic.toString().startsWith("frontend/alert")) return;
        console.log("alert updated, circuit breaker is " + message.toString());
        var messageJSON = JSON.parse(message);
        if (messageJSON.status == "open") {
          this.alertPopup = true;
        } else {
          this.alertPopup = false;
        }
      });
    },
  },
};
</script>
