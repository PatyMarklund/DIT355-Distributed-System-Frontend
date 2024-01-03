<template>
  <div>
    <b-carousel
      id="carousel"
      style="text-shadow: 0px 0px 2px #000"
      fade
      indicators
      :interval="6000"
      img-width="1024"
      img-height="480"
    >
      <b-carousel-slide
        img-src="https://images.pexels.com/photos/4269700/pexels-photo-4269700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      ></b-carousel-slide>
      <b-carousel-slide
        img-src="https://images.pexels.com/photos/4297519/pexels-photo-4297519.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      ></b-carousel-slide>
      <b-carousel-slide
        img-src="https://images.pexels.com/photos/4971505/pexels-photo-4971505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      ></b-carousel-slide>
      <b-carousel-slide
        img-src="https://images.pexels.com/photos/4269942/pexels-photo-4269942.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      ></b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
export default {
  name: "Carousel",
};
</script>

<style scoped>
#carousel {
  margin-top: 10px;
  margin-bottom: 15px;
}
</style>
