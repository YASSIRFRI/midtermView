<template>
    <div class="auth-container bg-white shadow-lg rounded-lg p-8">
      <h2 class="text-center text-3xl font-bold text-gray-800 mb-6">Sign Up</h2>
  
      <div class="mb-4">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="input-field"
        />

      </div>
      <div class="mb-4">
        <input
          v-model="password"
          type="password"
          placeholder="Create password"
          class="input-field"
        />
      </div>
      <div class="mb-4">
        <input
          v-model="confirmPassword"
          type="password"
          placeholder="Confirm password"
          class="input-field"
        />
      </div>
  
      <!-- Sign Up Button -->
      <button @click="handleSignUp" class="auth-button mb-4">Sign Up</button>
  
      <!-- Login Link -->
      <p class="text-center text-sm text-gray-600">
        Already have an account?
        <router-link to="/login" class="text-blue-500 hover:underline">Log in</router-link>
      </p>
  
      <!-- Social Sign Up Option -->
      <div class="social-login mt-6">
        <button class="social-button google-button" @click="handleGoogleLogin">
          <i class="fab fa-google mr-2"></i> Sign up with Google
        </button>
      </div>
  
      <!-- Error Message -->
      <p v-if="errorMessage" class="error mt-4">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  import { signUp, signInWithGoogle } from "../firebase";
  import { router } from "../router";
  
  export default {
    name: "SignupPage",
    setup() {
      const email = ref("");
      const password = ref("");
      const confirmPassword = ref("");
      const errorMessage = ref("");
  
      const handleSignUp = async () => {
        if (password.value !== confirmPassword.value) {
          errorMessage.value = "Passwords do not match";
          return;
        }
        try {
          await signUp(email.value, password.value);
          console.log("Signed up successfully!");
          router.push({ name: "Login" });
          errorMessage.value = "";
        } catch (error) {
          errorMessage.value = error.message;
          console.error("Sign up error:", error);
        }
      };
  
      const handleGoogleLogin = async () => {
        try {
          await signInWithGoogle();
          console.log("Signed up with Google!");
          errorMessage.value = "";
        } catch (error) {
          errorMessage.value = error.message;
          console.error("Google sign-up error:", error);
        }
      };
  
      return { email, password, confirmPassword, handleSignUp, handleGoogleLogin, errorMessage };
    },
  };
  </script>
  
  <style scoped>
.auth-container {
  width: 400px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

  
  .input-field {
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    width: 100%;
    transition: all 0.2s ease-in-out;
  }
  .input-field:focus {
    border-color: #2563eb;
    box-shadow: 0 0 5px rgba(37, 99, 235, 0.3);
    outline: none;
  }
  
  .auth-button {
    background-color: #2563eb;
    color: #fff;
    padding: 12px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.2s ease-in-out;
  }
  .auth-button:hover {
    background-color: #1d4ed8;
  }
  
  .social-login {
    display: flex;
    justify-content: center;
    margin-top: 16px;
  }
  
  .social-button {
    padding: 10px;
    border: none;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }
  
  .google-button {
    background-color: #4285f4;
    color: #fff;
  }
  .google-button:hover {
    background-color: #357ae8;
  }
  
  .error {
    color: red;
    font-weight: bold;
    text-align: center;
  }
  </style>
  