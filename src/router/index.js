// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import Signup from "../components/Signup.vue";
import Home from "../components/Home.vue";
import ProductList from "../components/ProductList.vue";
import ProductForm from "../components/ProductForm.vue";
import CategoryList from "../components/CategoryList.vue";
import CategoryForm from "../components/CategoryForm.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/events",
    name: "ProductList",
    component: ProductList,
  },
  {
    path: "/events/new",
    name: "ProductCreate",
    component: ProductForm,
  },
  {
    path: "/events/:id/edit",
    name: "ProductEdit",
    component: ProductForm,
  },

  {
    path: "/:pathMatch(.*)*",
    redirect: "/home",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Function to ensure auth state is resolved before proceeding
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

// Navigation guard to check authentication
router.beforeEach(async (to, from, next) => {
  const user = await getCurrentUser();
  const isAuthenticated = !!user;

  if (to.name !== 'Login' && to.name !== 'Signup' && !isAuthenticated) {
    next({ name: 'Login' });
  } else if ((to.name === 'Login' || to.name === 'Signup') && isAuthenticated) {
    next({ name: 'Home' });
  } else {
    next();
  }
});

export default router;
