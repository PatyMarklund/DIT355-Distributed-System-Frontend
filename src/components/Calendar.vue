<template>
  <div id="calendar">
    <h3>Booking schedule for clinic {{ clinicName }}</h3>
    <br />
    <vue-meeting-selector
      ref="meetingSelector"
      class="slots-example__meeting-selector"
      v-model="meeting"
      :date="dates"
      :loading="loading"
      :meetings-days="meetingsDays"
    >
      <template #meeting="{ meeting }">
        <div
          v-if="meeting.date"
          class="meeting"
          :class="meetingSelectedClass(meeting)"
          @click="selectedMeeting(meeting)"
        >
          {{ formatingTime(meeting.date) }}
        </div>
        <div v-else class="empty">&mdash;</div>
      </template>
      <template #button-previous>
        <button class="button-pagination"></button>
      </template>
      <template #button-next>
        <button class="button-pagination"></button>
      </template>
    </vue-meeting-selector>
    <br />
    <p>
      Appointment selected:
      {{ dateToDisplay ? dateToDisplay : "No appointment selected" }}
    </p>
    <BookingForm
      v-if="dateSelected"
      :bindingDate="bindingDate"
      :clinicId="Booking.clinicID"
      :clinicName="clinicName"
      :dateToDisplay="dateToDisplay"
    />
  </div>
</template>

<script>
import VueMeetingSelector from "vue-meeting-selector";
import BookingForm from "../components/BookingForm.vue";

export default {
  name: "calendar",
  components: {
    VueMeetingSelector,
    BookingForm,
  },
  data() {
    return {
      dates: new Date(2022, 11, 4, 10, 0),
      meetingsDays: [],
      meeting: { date: "" },
      loading: false,
      nbDaysToDisplay: 5,
      clinicName: localStorage.getItem("clinicName"),
      dateToDisplay: "",
      Booking: {
        date: "",
        clinicID: this.$route.params.name.substring(1),
      },
      dateSelected: false,
      response: "",
      bindingDate: "",
    };
  },
  created() {
    this.subscribeAvailableTimeslots();
  },
  //timer of 3 seconds to update the calendar
  mounted: function () {
    const timer = setInterval(() => {
      this.subscribeAvailableTimeslots();
    }, 3000);
    console.log(timer);
  },
  methods: {
    //Get the available times from the clinic backend
    subscribeAvailableTimeslots() {
      console.log("Calling for available times:");
      this.$http
        .get(
          "http://localhost:80/clinics/" +
            this.Booking.clinicID +
            "/availability"
        )
        .then((res) => {
          console.log("Received available times:" + res);
          console.log(res.data);
          const timeslots = res.data;
          console.log("Show timeslots");
          console.log(timeslots);
          this.meetingsDays = timeslots;
        });
      this.loading = false;
    },
    //Highlight time selected in the calendar when selected
    meetingSelectedClass(meeting) {
      if (!this.meeting) {
        return "";
      }
      const selectedDate = new Date(meeting.date);
      const date = new Date(this.meeting.date);
      if (selectedDate.getTime() === date.getTime()) {
        return "meeting meeting--selected";
      }
      return "";
    },
    //Formate the time when is selected. Add one hour and save it to send to the modal
    selectedMeeting(meeting) {
      console.log("Selecting meeting..");
      this.dateSelected = true;
      if (this.meeting) {
        const selectedDate = new Date(meeting.date);
        console.log(selectedDate);
        const date = new Date(this.meeting.date);
        console.log(date);
        if (selectedDate.getTime() !== date.getTime()) {
          this.bindingDate = new Date(meeting.date);
          this.meeting = meeting;
          this.formatTimeToDisplay(selectedDate);
          this.dateSelected = true;
        } else {
          this.meeting = undefined;
        }
      } else {
        this.meeting = meeting;
        this.dateSelected = true;
      }
    },
    //Formate the time selected in the calendar to display nicely to the user
    formatTimeToDisplay(time) {
      var timeToFormat = time.toString();
      console.log(timeToFormat);
      let arr = timeToFormat.split("");
      arr[3] = ", ";
      arr[7] = "-";
      arr[10] = "-";
      arr[15] = "  kl. ";
      let timeFormated = arr.join("");
      this.dateToDisplay = timeFormated.slice(0, timeToFormat.length - 39);
    },
    //Formate the date to show in the calendar
    formatingTime(date) {
      if (date) {
        const d = new Date(date);
        const hours = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours();
        const minutes =
          d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();
        return `${hours}:${minutes}`;
      }
    },
  },
};
</script>

<style>
#calendar {
  background-color: white;
  border: 4px solid #187d96;
  padding: 5px;
}
.padding {
  padding: 50px 250px 0px 250px;
}
.title {
  margin: 0 5px;
}
.head {
  font: 26px bold;
  color: black;
  padding: 0px 0px 40px 0px;
  font-family: Arial, sans-serif;
}
.meeting {
  display: inline-block;
  padding: 5px;
  margin: 5px 0;
  background-color: #187d96;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}
.meeting--selected {
  background-color: orange;
}
.empty {
  display: inline-block;
  padding: 5px;
  margin: 5px 0;
  border-radius: 4px;
  cursor: not-allowed;
  background-color: white;
  color: black;
}
.button-pagination {
  border: none;
  padding: 0;
  width: 30px;
}
::v-deep .loading-div {
  top: 32px !important;
}
</style>
