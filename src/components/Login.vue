<template>
  <div class="auth-container bg-white shadow-lg rounded-lg p-6">
    <h2 class="text-center text-3xl font-bold text-gray-800 mb-6">Login
      <i class="fas fa-sign-in-alt ml-2"></i>

    </h2>
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
        placeholder="Password"
        class="input-field"
      />
    </div>


    <!-- Forgot Password Link -->
    <p class="text-sm text-right text-blue-500 hover:underline cursor-pointer mb-4">Forgot password?</p>

    <!-- Login Button -->
    <button @click="handleLogin" class="auth-button mb-4">Login
      <i class="fas fa-sign-in-alt ml-2"></i>
    </button>



    <!-- Sign Up Link -->
    <p class="text-center text-sm text-gray-600">
      Don’t have an account?
      <router-link to="/signup" class="text-blue-500 hover:underline">Sign up</router-link>
    </p>

    <!-- Social Login Options -->
    <div class="social-login mt-6">
      <button class="social-button google-button m-2" @click="handleGoogleLogin">
        <i class="fab fa-google mr-2"></i> Login with Google
      </button>
      <button class="social-button facebook-button m-2">
        <i class="fab fa-facebook-f mr-2"></i> Login with Facebook
      </button>
    </div>

    <div class="g-recaptcha" data-sitekey="6Lc7tXUqAAAAAFf6HR5uqqsaxLebqV7VvOOOP9dh"></div>
    <!-- Error Message -->
    <p v-if="errorMessage" class="error mt-4">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { ref } from "vue";
import { signIn, signInWithGoogle } from "../firebase";
import { useRouter } from "vue-router";

export default {
  name: "LoginPage",
  setup() {
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const router = useRouter();

    const handleLogin = async () => {
      try {
        await signIn(email.value, password.value);
        console.log("Logged in successfully!");
        errorMessage.value = "";
        router.push({ name: "Home" }); // Redirect to Home after successful login
      } catch (error) {
        errorMessage.value = error.message;
        console.error("Login error:", error);
      }
    };

    const handleGoogleLogin = async () => {
      try {
        await signInWithGoogle();
        console.log("Logged in with Google!");
        errorMessage.value = "";
        router.push({ name: "Home" }); // Redirect to Home after successful Google login
      } catch (error) {
        errorMessage.value = error.message;
        console.error("Google login error:", error);
      }
    };

    return { email, password, handleLogin, handleGoogleLogin, errorMessage };
  },
};

</script>

<style scoped>

.auth-container {
  background: linear-gradient(135deg, #d9dadb 0%, #90c2f1 100%);
  width: 600px;
  margin: 0 auto;
  padding: 100px;
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

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
  background-size: cover;
}

.login-form {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.google-button {
  background-color: #4285f4;
  color: #fff;
}
.google-button:hover {
  background-color: #357ae8;
}

.facebook-button {
  background-color: #3b5998;
  color: #fff;
}
.facebook-button:hover {
  background-color: #2d4373;
}


.error {
  color: red;
  font-weight: bold;
  text-align: center;
}
</style>