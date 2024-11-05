<template>
  <HomeLayout>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 class="text-3xl font-bold text-center text-blue-600 mb-6">
          <i :class="isEditMode ? 'fa fa-edit' : 'fa fa-plus'"></i>
          {{ isEditMode ? "Edit Event" : "Add New Event" }}
        </h1>
        <form @submit.prevent="saveProduct">
          <!-- Name -->
          <div class="mb-6">
            <label class="block text-gray-700 font-semibold mb-2">
              <i class="fa fa-tag mr-2 text-blue-500"></i>Name
            </label>
            <input v-model="product.name" type="text" class="input-field" required />
          </div>

          <!-- Description -->
          <div class="mb-6">
            <label class="block text-gray-700 font-semibold mb-2">
              <i class="fa fa-align-left mr-2 text-blue-500"></i>Description
            </label>
            <textarea v-model="product.description" class="input-field" rows="3" required></textarea>
          </div>

          <!-- Price -->
          <div class="mb-6">
            <label class="block text-gray-700 font-semibold mb-2">
              <i class="fa fa-dollar-sign mr-2 text-blue-500"></i>Price
            </label>
            <input v-model.number="product.price" type="number" class="input-field" required />
          </div>

          <!-- Event Date -->
          <div class="mb-6">
            <label class="block text-gray-700 font-semibold mb-2">
              <i class="fa fa-calendar-alt mr-2 text-blue-500"></i>Event Date
            </label>
            <input v-model="product.event_date" type="date" class="input-field" required />
          </div>

          <!--is free checkbox-->
          <div class="mb-6">
            <label class="block text-gray-700 font-semibold mb-2">
              <i class="fa fa-check-square mr-2 text-blue-500"></i>Is Free
            </label>
            <input v-model="product.isFree" type="checkbox" class="input-field" />
          </div>

          <!-- Image URL -->
          <div class="mb-6">
            <label class="block text-gray-700 font-semibold mb-2">
              <i class="fa fa-image mr-2 text-blue-500"></i>Image URL
            </label>
            <input v-model="product.imageUrl" type="text" class="input-field" required />
            <div v-if="product.imageUrl" class="mt-4 flex justify-center">
              <img :src="product.imageUrl" alt="Image Preview" class="h-32 w-32 object-cover rounded-md shadow-md" />
            </div>
          </div>
          <button type="submit" class="submit-button w-full mt-6">
            {{ isEditMode ? "Update" : "Create" }} Event 
          </button>
        </form>
      </div>
    </div>
  </HomeLayout>
</template>

<script>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, addDoc, collection } from "firebase/firestore";
import HomeLayout from "./HomeLayout.vue";
import { auth } from "../firebase";

export default {
  name: "ProductForm",
  components: {
    HomeLayout,
  },
  setup() {
    const product = ref({
      name: "",
      description: "",
      price: 0,
      imageUrl: "",
      isFree: false,
      user_id: auth.currentUser.uid,
      votes_yes: 0,
      votes_no: 0,
      event_date: new Date().toISOString().substr(0, 10),
    });
    const isEditMode = ref(false);
    const router = useRouter();
    const route = useRoute();

    const saveProduct = async () => {
      if (isEditMode.value) {
        await updateDoc(doc(db, "products", route.params.id), product.value);
      } else {
        await addDoc(collection(db, "products"), product.value);
      }
      router.push("/products");
    };

    const fetchProduct = async () => {
      const docSnap = await getDoc(doc(db, "products", route.params.id));
      if (docSnap.exists()) {
        product.value = docSnap.data();
      } else {
        router.push("/products");
      }
    };

    if (route.params.id) {
      isEditMode.value = true;
      fetchProduct();
    }

    return {
      product,
      saveProduct,
      isEditMode,
    };
  },
};
</script>

<style scoped>
.input-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  transition: border-color 0.2s ease-in-out;
  background-color: #f9fafb;
}
.input-field:focus {
  border-color: #2563eb;
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
