<template>
  <h1>
    <a href="/"><img id="img" src="@/assets/DensCuraLogo.png" />Dens Cura</a>
  </h1>
</template>

<script>
export default {
  name: "banner",
};
</script>

<style scoped>
#img {
  margin: 10px;
  height: 8vw;
  max-height: 100;
  max-width: 100%;
  align-self: justify;
}
a:link {
  text-decoration: none;
}
a:hover {
  color: orange;
}
a {
  color: #187d96;
  display: flex;
  align-items: center;
  font-size: 8vw;
  font: bold;
  font-family: "Georgia", Times New Roman, serif;
  text-shadow: 1px 1px 0px black;
}
</style>
