<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <div class="home-md-8">
          <Map />
        </div>
      </b-col>
      <b-col class="col-sm-4" id="rightColumn">
        <b-row class="box">
          <Carousel />
          <h5>This is how Dens Cura can help you</h5>
          <InfoText />
          <h5>&#129463; &#129463; &#129463;</h5>
        </b-row>
        <hr />
        <b-row class="box">
          <FindBooking />
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// @ is an alias to /src
import Map from "../components/Map.vue";
import InfoText from "../components/InfoText.vue";
import FindBooking from "../components/FindBooking.vue";
import Carousel from "../components/Carousel.vue";

export default {
  name: "home",
  components: {
    Map,
    Carousel,
    InfoText,
    FindBooking,
  },
};
</script>

<style>
#rightColumn {
  margin: 2vw;
  margin-top: 2vw;
  justify-content: center;
  align-items: center;
}
.box {
  border: 4px solid #187d96;
  justify-content: center;
  background: white;
}
</style>
