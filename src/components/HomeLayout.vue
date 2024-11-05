<template>
  <div>
    <!-- Navigation Bar -->
    <nav class="bg-gray-800 p-4">
      <div class="container mx-auto flex justify-between items-center">
        <div class="text-white text-2xl font-bold">MidTerm Voting
            <i class="fas fa-vote-yea ml-2"></i>
        </div>
        <div class="flex items-center">
          <router-link
            to="/home"
            class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
          >
            <i class="fas fa-home mr-2"></i> Home
          </router-link>
          <router-link
            to="/events"
            class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
          >
           <i class="fas fa-glass-cheers mr-2"></i>
          Explore Events 
          </router-link>
          <!-- notifications bell-->
            <router-link
                to="/notifications"
                class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
            >
                <i class="fas fa-bell mr-2"></i>
            </router-link>
          <!-- Account Dropdown -->
          <div class="relative ml-3">
            <button
              @click="toggleDropdown"
              class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
            >
              <span>Account</span>
              <svg
                class="ml-1 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 011.414 1.414L10 14.414l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <div
              v-if="dropdownOpen"
              class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
            >
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
              <a @click.prevent="logout" href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout 
                <i class="fas fa-sign-out-alt ml-2"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content Slot -->
    <div class="container mx-auto p-4">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getAuth, signOut } from "firebase/auth";

export default {
  name: "HomeLayout",
  setup() {
    const dropdownOpen = ref(false);
    const router = useRouter();
    const auth = getAuth();

    const toggleDropdown = () => {
      dropdownOpen.value = !dropdownOpen.value;
    };

    const logout = async () => {
      try {
        await signOut(auth);
        router.push({ name: "Login" });
      } catch (error) {
        console.error("Error signing out:", error);
      }
    };

    return {
      dropdownOpen,
      toggleDropdown,
      logout,
    };
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
</style>
