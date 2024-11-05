<template>
    <HomeLayout>
      <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
          <h1 class="text-3xl font-bold text-center text-blue-600 mb-6">
            <i :class="isEditMode ? 'fa fa-edit' : 'fa fa-plus'"></i>
            {{ isEditMode ? "Edit Category" : "Add New Category" }}
          </h1>
          <form @submit.prevent="saveCategory">
            <!-- Name -->
            <div class="mb-6">
              <label class="block text-gray-700 font-semibold mb-2">
                <i class="fa fa-tag mr-2 text-blue-500"></i>Name
              </label>
              <input
                v-model="category.name"
                type="text"
                class="input-field"
                required
              />
            </div>
  
            <!-- Description -->
            <div class="mb-6">
              <label class="block text-gray-700 font-semibold mb-2">
                <i class="fa fa-align-left mr-2 text-blue-500"></i>Description
              </label>
              <textarea
                v-model="category.description"
                class="input-field"
                rows="3"
                required
              ></textarea>
            </div>
  
            <!-- Category Image (Placeholder) -->
            <div class="mb-6">
              <label class="block text-gray-700 font-semibold mb-2">
                <i class="fa fa-image mr-2 text-blue-500"></i>Category Image
              </label>
              <div class="h-32 w-32 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 text-lg">
                <i class="fa fa-image"></i>
              </div>
              <p class="text-gray-500 text-sm mt-2">* Image upload functionality will be added later.</p>
            </div>
  
            <button type="submit" class="submit-button w-full mt-6">
              {{ isEditMode ? "Update" : "Create" }} Category
            </button>
          </form>
        </div>
      </div>
    </HomeLayout>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import { db } from "../firebase";
  import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
  import { useRoute, useRouter } from "vue-router";
  import HomeLayout from "./HomeLayout.vue";
  
  export default {
    name: "CategoryForm",
    components: {
      HomeLayout,
    },
    setup() {
      const route = useRoute();
      const router = useRouter();
      const category = ref({
        name: "",
        description: "",
      });
      const isEditMode = ref(false);
  
      const saveCategory = async () => {
        if (isEditMode.value) {
          await updateDoc(doc(db, "categories", route.params.id), category.value);
        } else {
          await addDoc(collection(db, "categories"), category.value);
        }
        router.push("/categories");
      };
  
      const fetchCategory = async () => {
        const docSnap = await getDoc(doc(db, "categories", route.params.id));
        if (docSnap.exists()) {
          category.value = docSnap.data();
        } else {
          router.push("/categories");
        }
      };
  
      onMounted(() => {
        if (route.params.id) {
          isEditMode.value = true;
          fetchCategory();
        }
      });
  
      return { category, isEditMode, saveCategory };
    },
  };
  </script>
  
  <style scoped>
  .input-field {
    padding: 12px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    width: 100%;
    transition: all 0.2s ease-in-out;
    background-color: #f9fafb;
  }
  .input-field:focus {
    border-color: #2563eb;
    box-shadow: 0 0 5px rgba(37, 99, 235, 0.3);
    outline: none;
  }
  
  .submit-button {
    background-color: #2563eb;
    color: #fff;
    padding: 12px;
    border-radius: 8px;
    font-weight: bold;
    transition: background-color 0.2s ease-in-out;
  }
  .submit-button:hover {
    background-color: #1d4ed8;
  }
  </style>
  