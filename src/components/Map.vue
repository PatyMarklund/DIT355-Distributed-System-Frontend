<template>
  <div class="map">
    <GmapMap
      :center="center"
      :zoom="13"
      map-type-id="terrain"
      style="width: 100%; height: 800px"
    >
      <gmap-info-window
        :options="infoWindowOptions"
        :position="infoWindowContext.position"
        :opened="infoWindowOpened"
        @closeclick="handleInfoWindowClose"
      >
        <div class="info-window">
          <h2 v-text="currentDentist.name"></h2>
          <h4>Address: {{ currentDentist.address }}</h4>
          <h4>Opening hours</h4>
          <ul>
            <li v-for="(hours, day) in currentDentist.openinghours" :key="day">
              {{ day }}: {{ hours.start }} - {{ hours.end }}
            </li>
          </ul>
          <p>Owner: {{ currentDentist.owner }}</p>
          <b-button
            @click="openBookingPage(currentDentist.id, currentDentist.name)"
            >Go to booking</b-button
          >
        </div>
      </gmap-info-window>

      <gmap-marker
        v-for="(dentist, index) in dentists"
        :key="index"
        :position="getPosition(dentist)"
        :clickable="true"
        :draggable="false"
        @click="handleMarkerClick(dentist)"
      />
    </GmapMap>
  </div>
</template>

<script>
export default {
  name: "Map",
  data() {
    return {
      dentists: [],
      center: {
        lat: 57.688644,
        lng: 11.97565,
      },
      infoWindowOptions: {
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
      infoWindowContext: {
        position: {
          lat: 57.688644,
          lng: 11.97565,
        },
      },
      currentDentist: {}, // The dental clinic that has been clicked on the map
      infoWindowOpened: false,
    };
  },
  created() {
    this.subscribeDentists();
  },
  methods: {
    getPosition(dentist) {
      return {
        lat: parseFloat(dentist.coordinate.latitude),
        lng: parseFloat(dentist.coordinate.longitude),
      };
    },
    subscribeDentists() {
      console.log("Calling api");
      this.$http.get("http://localhost:80/clinics").then((res) => {
        const data = res.data;
        for (let i = 0; i < data.length; i++) {
          this.dentists.push(data[i]);
          console.log(this.dentists);
        }
      });
    },
    handleMarkerClick(dentist) {
      this.currentDentist = {
        id: dentist.id,
        owner: dentist.owner.firstName + " " + dentist.owner.lastName,
        name: dentist.name,
        openinghours: dentist.appointments,
        openinghourStart: dentist.appointments,
        openinghourEnd: dentist.appointments.end,
        address: dentist.address,
      };
      this.infoWindowContext.position = this.getPosition(dentist);
      this.infoWindowOpened = true;
    },
    handleInfoWindowClose() {
      this.currentDentist = {};
      this.infoWindowOpened = false;
    },
    openBookingPage(clinicId, clinicName) {
      console.log(clinicId);
      localStorage.setItem("clinicName", clinicName);
      window.location = "/booking/:" + clinicId;
    },
  },
};
</script>

<style scoped>
.map {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 4px solid #187d96;
  margin-top: 2vw;
  margin-left: 1vw;
  margin-bottom: 5vw;
  min-width: 300px;
}
</style>
