<template>
  <div class="find-booking">
    <h2>Find your booking</h2>
    <div id="find-body">
      <input
        v-model="inputId"
        type="text"
        required
        placeholder="Enter booking ID"
      />
      <b-button @click="searchBooking" id="searchButton">Search</b-button>
      <b-modal id="modal-1" ref="modal-1" title="Your booking information">
        <template #modal-footer>
          <b-button @click="hideModal()"> Close </b-button>
          <b-button variant="danger" @click="cancelBooking">
            Cancel booking
          </b-button>
        </template>
        <b>Date</b>: {{ this.date }}<br />
        <b>Time</b>: {{ this.time }}<br />
        <b>Clinic Name</b>: {{ this.clinicName }}<br />
        <b>Clinic Address</b>: {{ this.clinicAddress }}<br />
      </b-modal>
      <b-modal
        id="confirmCancelBooking"
        hide-header-close
        ok-only
        @ok="hideConfirmationModal"
      >
        <p class="my-4">
          Your booking was cancelled! Check the calendar to book a new time
        </p>
      </b-modal>
    </div>
  </div>
</template>

<script>
export default {
  name: "booking",
  props: {},
  data() {
    return {
      inputId: "",
      date: "",
      time: "",
      clinicID: "",
      clinicName: "",
      clinicAddress: "",
    };
  },
  methods: {
    searchBooking: function () {
      var letterNumber = /^[0-9a-zA-Z]+$/;
      if (this.inputId === "") {
        alert("Booking ID is required.");
        //Check if the input includes any letter other than alphabets and numbers
      } else if (!letterNumber.test(this.inputId)) {
        alert("This is an incorrect booking ID.");
      } else {
        this.findBookingInfo();
      }
    },

    findBookingInfo: function () {
      const id = this.inputId;
      this.$http.get("http://localhost:80/bookings/" + id).then((res) => {
        const message = JSON.stringify(res.data);
        if (message == "not-found") {
          alert("There is no booking with the provided ID.");
        } else {
          const bookingInfo = res.data;
          console.log(bookingInfo);
          const rawDate = bookingInfo.date;
          const isoDate = new Date(rawDate);
          const now = new Date();
          const offset = now.getTimezoneOffset();
          const localNow = new Date(isoDate.getTime() - offset * 60000);
          const convertedDate = localNow.toISOString();
          this.date = convertedDate.split("T").at(0);
          this.time = convertedDate.split("T").at(1).slice(0, 5);
          this.clinicID = bookingInfo.clinicID;
          if (this.clinicID) {
            this.findClinicName();
          }
        }
      });
    },
    findClinicName: function () {
      var id = this.clinicID;

      this.$http.get("http://localhost:80/clinics/" + id).then((res) => {
        const data = res.data;
        if (data === "not-found") {
          alert("This booking does not have a existing clinic.");
        } else {
          this.clinicName = data.name;
          this.clinicAddress = data.address;
        }
      });
      this.showModal();
    },
    showModal: function () {
      this.$bvModal.show("modal-1");
    },
    cancelBooking() {
      var bookingID = this.inputId;
      this.$http
        .delete("http://localhost:80/bookings/" + bookingID)
        .then((res) => {
          const data = res.data;
          if (data === "not-found") {
            alert(data);
          } else {
            alert(data);
          }
        });
      this.inputId = "";
      this.hideModal();
      this.$bvModal.show("confirmCancelBooking");
    },
    hideModal() {
      this.$refs["modal-1"].hide();
    },
    hideConfirmationModal() {
      this.$refs["confirmCancelBooking"].hide();
    },
  },

  mounted() {},
};
</script>

<style>
.find-booking {
  padding: 4px;
}

#searchButton {
  margin: 4px;
  text-align: justify;
  justify-content: center;
}

#searchButton:hover {
  background-color: orange;
}
</style>
