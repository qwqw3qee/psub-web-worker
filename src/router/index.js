import Vue from "vue";
import VueRouter from "vue-router";
import Subconverter from "../views/Subconverter.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "SubConverter",
    component: Subconverter
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
