import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/booking", // Maybe this should be removed since we are not going to have a page with all times for all clinics
      name: "booking",
      component: () => import("./views/Booking.vue"),
    },
    {
      path: "/booking/:name",
      name: "specificBooking",
      component: () => import("./views/Booking.vue"), //
    },
  ],
});
