import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/HomePage.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/LoginPage.vue"),
  },
  {
    path: "/registration",
    name: "Registration",
    component: () => import("../views/RegistrationPage.vue"),
  },
  {
    path: "/user/:id",
    name: "User Profile",
    component: () => import("../views/UserProfilePage.vue"),
  },
  {
    path: "/shop",
    name: "Shop",
    component: () => import("../views/ShopPage.vue"),
  },
  {
    path: "/activationUsers",
    name: "Activation Users",
    component: () => import("../views/ActivationUser.vue"),
  },
  {
    path: "/Characteristic",
    name: "Characteristic",
    component: () => import("../views/AdminTable.vue"),
  },
  {
    path: "/edit",
    name: "Edit",
    component: () => import("../views/EditProfilePage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (
    !localStorage.getItem("token") &&
    to.name !== "Login" &&
    to.name !== "Registration"
  ) {
    next({name: "Login"});
  } else {
    next();
  }
});

export default router;
