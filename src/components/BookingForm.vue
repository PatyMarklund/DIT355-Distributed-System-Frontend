<template>
  <div>
    <b-button id="button" @click="clickReserveButton()">Reserve Time</b-button>
    <b-modal
      id="bookingModal"
      title="Enter your information to complete the booking!"
      no-close-on-backdrop
      hide-header-close
      cancel-variant="danger"
      ok-title="Confirm Booking"
      ok-variant="success"
      @cancel="cancelReserve"
      @ok="confirmReservation"
    >
      <p class="my-4">Clinic: {{ clinicTitle }}</p>
      <p>
        <b-form-input
          id="inputForms"
          type="email"
          v-model="booking.patient.email"
          placeholder="Email"
          required
        ></b-form-input>
        <br />
        <b-form-input
          id="inputForms"
          v-model="booking.patient.firstName"
          placeholder="First Name"
          required
        ></b-form-input>
        <br />
        <b-form-input
          id="inputForms"
          v-model="booking.patient.lastName"
          placeholder="Last Name"
          required
        ></b-form-input>
        <br />
        <b-form-input
          id="inputForms"
          v-model="booking.patient.ssn"
          placeholder="SSN"
          type="number"
          required
        ></b-form-input>
      </p>
      <p>Date selected: {{ displayedDate }}</p>
      <p>Please complete your booking before the time run out:</p>
      <!-- Change below time depending on what time we decide on for backend session -->
      <p id="showTime">{{ sessiontimer }}</p>
    </b-modal>
    <b-modal
      id="bookingNotAvailableModal"
      hide-header-close
      ok-only
      @ok="refreshCalendar"
    >
      <p class="my-4">This time is not available anymore. Try another time!</p>
    </b-modal>
    <b-modal
      id="confirmationModal"
      title="Your booking was completed successful!"
      no-close-on-backdrop
      hide-header-close
      ok-only
    >
      <p class="my-4">
        <b>Here are your confirmation details, please save it for later! </b>
        <br />
        <br />
        <b>Booking ID:</b> {{ bookingId }} <br />
        <b>Date:</b> {{ displayedDate }} <br />
        <b>Clinic:</b> {{ clinicTitle }}
      </p>
    </b-modal>
  </div>
</template>

<script>
let intervalID;
export default {
  name: "BookingForm",
  props: {
    bindingDate: Date,
    clinicId: String,
    clinicName: String,
    dateToDisplay: String,
  },
  data() {
    return {
      dateAvailable: false,
      clinicTitle: this.clinicName,
      displayedDate: "",
      preBooking: {
        date: "",
        clinicID: "",
      },
      sessionID: "",
      bookingId: "",
      booking: {
        _id: "",
        patient: {
          email: "",
          firstName: "",
          lastName: "",
          ssn: "",
        },
        date: "",
        clinicID: "",
      },
      sessiontimer: "00:40",
    };
  },
  methods: {
    clickReserveButton() {
      console.log("check the information");
      console.log(this.bindingDate.toString());
      if (this.bindingDate.toString() === "Invalid Date") {
        console.log("Do nothing");
      } else {
        console.log("this.reserveTime()");
        this.reserveTime();
      }
    },
    //Publish the time that was selected by the user to create a booking and reserve the time
    reserveTime() {
      this.preBooking.date = this.bindingDate;
      this.displayedDate = this.dateToDisplay;
      this.booking.date = this.bindingDate;
      this.preBooking.clinicID = this.clinicId;
      this.booking.clinicID = this.clinicId;
      this.$http
        .post("http://localhost:80/bookings/availability", this.preBooking)
        .then((res) => {
          console.log("Reserved time..");
          const data = res.data;
          console.log(this.bookingId);
          if (data.toString() === "false") {
            console.log("Show not available modal");
            this.$bvModal.show("bookingNotAvailableModal");
          } else {
            const booking = res.data;
            console.log(booking);
            this.sessionID = booking.session;
            console.log("Show modal");
            console.log("Session: " + booking.session);
            this.$bvModal.show("bookingModal");
            this.startCountdown();
          }
        });
      this.subscribeIfIsAvailable();
    },
    //Checks if booking was created and calls the appropriate modal
    subscribeIfIsAvailable() {
      console.log("Checking if booking was created");
      this.$http
        .get("http://localhost:80/clinics/" + this.clinicID + "/availability")
        .then((res) => {
          const booking = JSON.parse(res.toString());
          this.bookingId = booking._id;
          this.booking._id = booking._id;
          console.log(this.bookingId);
          if (booking.toString() === "false") {
            this.$bvModal.show("bookingNotAvailableModal");
          } else {
            this.$bvModal.show("bookingModal");
            this.startCountdown();
          }
        });
      this.loading = false;
    },
    refreshCalendar() {
      window.location.reload();
    },
    //Cancel the booking created when reserving time
    cancelReserve() {
      console.log("Canceling Reservation" + this.sessionID);
      this.resetForm();
      this.$http
        .post(
          "http://localhost:80/booking/sessions/" + this.sessionID + "/cancel"
        )
        .then((res) => {
          console.log(res.data);
          this.sessionID = "";
          // What to do after canceling?
        });
      this.clearCountdownTimer();
      this.refreshCalendar();
    },
    //creates a countdown timer for each specific bookingModal(intervalID), reloads the page if timer comes to 0
    startCountdown() {
      console.log("Starting countdown timer");
      let seconds = 40; // change depending on what time we decide for the backend session
      if (!intervalID) {
        intervalID = setInterval(() => {
          if (seconds <= 0) {
            this.clearCountdownTimer();
            window.location.reload();
          } else {
            seconds--;
            //document.getElementById("showTime").innerHTML = `00:${seconds}`; // this updates the showtime <p> to countdown the seconds
            this.sessiontimer =
              seconds < 10 ? "00:0" + seconds : "00:" + seconds;
          }
        }, 1000);
      }
    },
    //clears the specific interval and sets intervalID back to null to be used again
    clearCountdownTimer() {
      clearInterval(intervalID);
      intervalID = null;
    },
    //Update the booking created with the user information
    confirmReservation() {
      const booking = {
        session: this.sessionID,
        patient: this.booking.patient,
      };
      console.log("Booking details: ");
      console.log(booking);
      this.$http
        .post("http://localhost:80/booking/reserve", booking)
        .then((res) => {
          // What to do after updating ?
          this.sessionID = "";
          console.log(res.data);
          this.bookingId = res.data;
          this.$bvModal.show("confirmationModal");
          this.resetForm();
          this.clearCountdownTimer();
        });
    },
    //Reset the form after the user enter the information
    resetForm() {
      (this.booking.patient.email = ""),
        (this.booking.patient.firstName = ""),
        (this.booking.patient.lastName = ""),
        (this.booking.patient.ssn = "");
    },
  },
};
</script>

<style scoped>
#modal-1 {
  background-color: #187d96;
}
#showTime {
  font-size: large;
  color: red;
}
#button {
  background-color: #2c3e50;
}
#button:hover {
  background-color: orange;
}
</style>
