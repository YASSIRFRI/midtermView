<template>
    <HomeLayout>
      <h1 class="text-3xl font-bold mb-4">Votes</h1>
      <router-link to="/categories/new" class="auth-button mb-4 inline-block">Add New Category</router-link>
      
      <!-- Category Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="category in categories"
          :key="category.id"
          class="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
        >
          <div>
            <h3 class="text-lg font-semibold mb-2">{{ category.name }}</h3>
            <p class="text-gray-700 mb-4">{{ category.description }}</p>
          </div>
          <div class="flex space-x-2">
            <router-link :to="`/categories/${category.id}/edit`" class="edit-button">Edit</router-link>
            <button @click="deleteCategory(category.id)" class="delete-button">Delete</button>
          </div>
        </div>
      </div>
    </HomeLayout>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
  import { db } from "../firebase";
  import HomeLayout from "./HomeLayout.vue";
  
  export default {
    name: "CategoryList",
    components: {
      HomeLayout,
    },
    setup() {
      const categories = ref([]);
  
      const fetchCategories = async () => {
        const querySnapshot = await getDocs(collection(db, "categories"));
        categories.value = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      };
  
      const deleteCategory = async (id) => {
        await deleteDoc(doc(db, "categories", id));
        fetchCategories();
      };
  
      onMounted(() => {
        fetchCategories();
      });
  
      return { categories, deleteCategory };
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
  </style>
  