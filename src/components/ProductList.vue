<template>
    <HomeLayout>
        <!-- flex container-->
        <div class="flex justify-between items-center">
      <h1 class="text-blue-600 text-3xl font-bold mb-4">Events
        <i class="fa fa-calendar-alt text-blue-600 mr-2"></i>
      </h1>
      <router-link to="/products/new" class="auth-button mb-4 inline-block">Add New Event
        <i class="fa fa-plus text-white ml-2"></i>
      </router-link>
        </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="product in products"
          :key="product.id"
          class="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center"
        >
          <img
            :src="product.imageUrl"
            alt="Event Image"
            class="h-48 w-48 object-cover rounded-md mb-4"
          />
          <h3 class="text-lg font-semibold mb-2">
            <i class="fa fa-tag mr-2 text-blue-500"></i>{{ product.name }}
          </h3>
          <p class="text-gray-700 font-semibold mb-2">
            <i class="fa fa-calendar-alt mr-2 text-blue-500"></i>{{ product.event_date }}
          </p>
          <p class="text-gray-700 font-semibold mb-2">
            <i class="fa fa-dollar-sign mr-2 text-green-500" v-if="!product.isFree && product.price > 0"></i>
            <i class="fa fa-gift mr-2 text-yellow-500" v-else></i>
            {{ product.isFree || product.price === 0 ? 'Free Event' : formatCurrency(product.price) }}
          </p>
          
          <div v-if="product.user_id === currentUser.uid" class="mt-4 flex space-x-2">
            <router-link
              :to="`/products/${product.id}/edit`"
              class="edit-button"
            >
              <i class="fa fa-edit mr-1"></i>Edit
            </router-link>
            <button @click="deleteProduct(product.id)" class="delete-button">
              <i class="fa fa-trash mr-1"></i>Delete
            </button>
          </div>
          <div v-else class="mt-4 flex flex-col items-center">
            <div class="flex space-x-2" v-if="!hasVoted(product.id)">
              <button @click="vote(product.id, 'yes')" class="vote-button">
                <i class="fa fa-thumbs-up mr-1"></i>Yes
              </button>
              <button @click="vote(product.id, 'no')" class="vote-button">
                <i class="fa fa-thumbs-down mr-1"></i>No
              </button>
            </div>
            <div class="w-full mt-4">
              <div class="flex justify-between text-sm">
                <span>Yes: {{ product.votes_yes }}</span>
                <span>No: {{ product.votes_no }}</span>
              </div>
              <div class="relative h-4 bg-gray-200 rounded-full mt-2">
                <div
                  class="absolute top-0 left-0 h-full bg-green-500 rounded-full"
                  :style="{ width: `${(product.votes_yes / (product.votes_yes + product.votes_no)) * 100}%` }"
                ></div>
                <div
                  class="absolute top-0 right-0 h-full bg-red-500 rounded-full"
                  :style="{ width: `${(product.votes_no / (product.votes_yes + product.votes_no)) * 100}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import { collection, getDocs, deleteDoc, doc, updateDoc, getDoc } from "firebase/firestore";
  import { db } from "../firebase";
  import HomeLayout from "./HomeLayout.vue";
  import { auth } from "../firebase";
  
  export default {
    name: "ProductList",
    components: {
      HomeLayout,
    },
    setup() {
      const products = ref([]);
      const currentUser = ref(auth.currentUser);
      const votedEvents = ref(JSON.parse(localStorage.getItem('votedEvents')) || []);
  
      const fetchProducts = async () => {
        const querySnapshot = await getDocs(collection(db, "products"));
        products.value = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      };
  
      const deleteProduct = async (id) => {
        await deleteDoc(doc(db, "products", id));
        fetchProducts();
      };
  
      const vote = async (id, type) => {
        const productDoc = doc(db, "products", id);
        const productSnap = await getDoc(productDoc);
        if (productSnap.exists()) {
          const productData = productSnap.data();
          if (type === "yes") {
            productData.votes_yes += 1;
          } else {
            productData.votes_no += 1;
          }
          await updateDoc(productDoc, productData);
          votedEvents.value.push(id);
          localStorage.setItem('votedEvents', JSON.stringify(votedEvents.value));
          fetchProducts();
        }
      };
  
      const hasVoted = (id) => {
        return votedEvents.value.includes(id);
      };
  
      const formatCurrency = (value) => `$${parseFloat(value).toFixed(2)}`;
  
      onMounted(fetchProducts);
  
      return { products, deleteProduct, vote, formatCurrency, currentUser, hasVoted };
    },
  };
  </script>
  
  <style scoped>
  .auth-button {
    background-color: #2563eb;
    color: #fff;
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.2s ease-in-out;
    text-decoration: none;
    display: inline-block;
  }
  .auth-button:hover {
    background-color: #1d4ed8;
  }
  
  .grid {
    display: grid;
    gap: 1.5rem;
  }
  
  .edit-button {
    background-color: #4CAF50;
    color: #fff;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.2s ease-in-out;
  }
  .edit-button:hover {
    background-color: #45a049;
  }
  
  .delete-button {
    background-color: #f44336;
    color: #fff;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.2s ease-in-out;
  }
  .delete-button:hover {
    background-color: #e53935;
  }
  
  .vote-button {
    background-color: #2563eb;
    color: #fff;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.2s ease-in-out;
  }
  .vote-button:hover {
    background-color: #1d4ed8;
  }
  </style>