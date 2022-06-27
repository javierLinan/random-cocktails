import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DrinkModal from "../views/DrinkModal.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 };
  },

  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      children: [
        {
          path: "drinks/:id",
          name: "drink",
          component: DrinkModal,
        },
      ],
    },
  ],
});

export default router;
