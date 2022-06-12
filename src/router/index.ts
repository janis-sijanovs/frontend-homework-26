import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import PeopleView from "../views/PeopleView.vue";
import FilmsView from "../views/FilmsView.vue";
import PlanetsView from "../views/PlanetsView.vue";
import PlanetView from "../views/PlanetView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/people",
    name: "people",
    component: PeopleView,
  },
  {
    path: "/films",
    name: "films",
    component: FilmsView,
  },
  {
    path: "/planets",
    name: "planets",
    component: PlanetsView,
  },
  {
    path: "/planets/:id",
    name: "planet",
    component: PlanetView,
    props: true,
  },
  {
    path: "/",
    redirect: "people",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
