<template>
  <HomeLayout>
    <div class="container mx-auto px-4 py-8 bg-gradient-to-br via-purple-100 to-pink-100 min-h-screen">
      <!-- Welcome Section -->
      <div class="text-center mb-12">
        <h1 class="text-5xl font-extrabold text-blue-700 mb-4">
          <span class="text-red-700">Midterm</span>
          Event Voting System
        </h1>
        <p class="text-lg text-gray-800 mb-8 max-w-xl mx-auto">
          Manage your events and votes with ease. Get started by exploring the latest events and products.
        </p>
        <div class="flex justify-center space-x-4">
          <router-link to="/events" class="auth-button">Manage Votes 
            <i class="fa fa-box-open ml-2"></i>
          </router-link>
          <router-link to="/events" class="auth-button">Manage Events 
            <i class="fa fa-tags ml-2"></i>
          </router-link>
        </div>
        <!--add centered image -->
        <img src="/welcome.jpg" alt="Decorative background" class="h-64 w-full object-cover rounded-lg mt-8 shadow-lg" />
      </div>

      <!-- Recent Categories Section -->
      <section class="mb-16">
        <h2 class="text-3xl font-semibold text-purple-800 mb-6">
          <i class="fa fa-tags text-purple-600 mr-2"></i>
          Recent Events 
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="category in categories"
            :key="category.id"
            class="relative p-4 border border-gray-200 rounded-lg shadow-lg bg-white bg-opacity-90 hover:bg-purple-50 transition-all duration-300"
          >
            <div class="relative">
              <h3 class="text-2xl font-bold text-purple-600 mb-2">{{ category.name }}</h3>
              <img :src="category.imageUrl" alt="Category Image" class="h-32 w-full object-cover rounded mb-2 shadow-sm" />
              <p class="text-gray-700">{{ category.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="mb-16">
        <h2 class="text-3xl font-semibold text-blue-800 mb-6">
          Recent Events
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="product in products"
            :key="product.id"
            class="relative p-4 border border-gray-200 rounded-lg shadow-lg bg-white bg-opacity-90 hover:bg-blue-50 transition-all duration-300"
          >
            <div class="relative">
              <h3 class="text-2xl font-bold text-blue-600 mb-2">{{ product.name }}</h3>
              <img :src="product.imageUrl" alt="Product Image" class="h-32 w-full object-cover rounded mb-2 shadow-sm" />
              <p class="text-gray-700">{{ product.description }}</p>
              <p class="text-yellow-400 font-bold mt-2">Price: ${{ product.price }}</p>
              <p class="text-gray-500 font-bold mt-2">
                Date: {{ product.event_date }}
                <i class="fa fa-calendar-alt text-blue-600 mr-2"></i>
              </p>

            </div>
          </div>
        </div>
      </section>

      <section class="mb-16">
        <h2 class="text-3xl font-semibold text-pink-800 mb-6">
          <i class="fa fa-star text-pink-600 mr-2"></i> Popular Events
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="item in popularItemsData"
            :key="item.id"
            class="relative p-4 border border-gray-200 rounded-lg shadow-lg bg-white bg-opacity-90 hover:bg-pink-50 transition-all duration-300"
          >
            <div class="relative">
              <h3 class="text-2xl font-bold text-pink-600 mb-2">{{ item.name }}</h3>
              <img :src="item.imageUrl" alt="Popular Product Image" class="h-32 w-full object-cover rounded mb-2 shadow-sm" />
              <p class="text-gray-700">{{ item.description }}</p>
              <p class="text-gray-800 font-bold mt-2">Price: ${{ item.price }}</p>
              <!--Date-->
              <p class="text-gray-800 font-bold mt-2">Date: {{ item.event_date }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </HomeLayout>
</template>

<script>
import HomeLayout from "./HomeLayout.vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default {
  name: "HomeBase",
  components: {
    HomeLayout,
  },
  data() {
    return {
      firebaseCategories: [],
      firebaseProducts: [],
      firebasePopularItems: [],
      popularItems: [
        { id: 1, name: "Yassir Marriage", description: "Yassir is getting married.", price: 900, imageUrl: "/marriage.jpg" ,votes_yes:2,votes_no:1},
        { id: 2, name: "Yassir Birthday", description: "Yassir is celebrating his birthday.", price: 200, imageUrl: "/birthday.jpg" ,votes_yes:3,votes_no:1},
        { id: 3, name: "Yassir Graduation", description: "Yassir is graduating from college.", price: 80, imageUrl: "/graduation.jpg",votes_yes:4,votes_no:2,event_date:"2022-12-12"},
      ],
      defaultCategoryImage: "/abstract.jpg",
      defaultProductImage: "/abstract.jpg",
      defaultPopularImage: "/abstract.jpg",
    };
  },
  computed: {
    categories() {
      return this.firebaseCategories.length ? this.firebaseCategories : this.recentCategories;
    },
    products() {
      return this.firebaseProducts.length ? this.firebaseProducts : this.recentProducts;
    },
    popularItemsData() {
      return this.firebasePopularItems.length ? this.firebasePopularItems : this.popularItems;
    },
  },
  async created() {
    await this.fetchFirebaseData();
  },
  methods: {
    async fetchFirebaseData() {
      try {
        const categoriesSnapshot = await getDocs(collection(db, "categories"));
        this.firebaseCategories = categoriesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          imageUrl: doc.data().imageUrl || this.defaultCategoryImage, // Set default image if null
        }));
        
        const productsSnapshot = await getDocs(collection(db, "products"));
        this.firebaseProducts = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          imageUrl: doc.data().imageUrl || this.defaultProductImage, // Set default image if null
        }));
        
        const popularItemsSnapshot = await getDocs(collection(db, "popularItems"));
        this.firebasePopularItems = popularItemsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          imageUrl: doc.data().imageUrl || this.defaultPopularImage,
        }));
      } catch (error) {
        console.error("Error fetching data from Firebase:", error);
      }
    },
  },
};
</script>

<style scoped>
.auth-button {
  color: #fff;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  background-color: #1d4ed8;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s ease-in-out;
  text-decoration: none;
  display: inline-block;
}
</style>
