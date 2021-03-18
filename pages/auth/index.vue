<template>
  <div class="w-full flex flex-col items-center justify-center">
    <div class="w-full">
      <nuxt-link to="/">
        <img
          class="h-16 mb-16 mt-6 ml-6"
          src="@/assets/images/logo.png"
          alt="logo"
        />
      </nuxt-link>
    </div>
    <main
      class="w-full sm:w-1/2 lg:w-1/3 bg-detailsGrad1 rounded-lg p-10 flex flex-col"
    >
      <h1 class="text-3xl text-white font-extrabold mb-8">Login</h1>
      <div class="space-y-5 mb-8 text-white">
        <div>
          <input
            class="w-full bg-gray700 rounded-md mb-1"
            @blur="validateUsername"
            type="text"
            v-model="username"
            placeholder="Username"
          />
          <p
            v-if="usernameValidity === 'invalid'"
            class="text-red-500 text-xs italic"
          >
            This field is required.
          </p>
        </div>
        <div>
          <input
            class="w-full bg-gray700 rounded-md mb-1"
            @blur="validatePassword"
            type="password"
            v-model="password"
            placeholder="Password"
          />
          <p
            v-if="passwordValidity === 'invalid'"
            class="text-red-500 text-xs italic"
          >
            This field is required.
          </p>
        </div>
      </div>
      <button
        @click="login"
        class="bg-red-600 text-white p-3 rounded-md mb-5 font-bold"
      >
        Login
      </button>
      <p class="text-sm text-gray-500">
        Do not have an account yet?
        <a
          class="text-white font-medium hover:underline"
          href="https://www.themoviedb.org/signup"
          >Signup.</a
        >
      </p>
      <div v-if="error" class="bg-detailsGrad2 p-2 mt-6 rounded-md">
        <p class="text-white">{{ error }}</p>
      </div>
    </main>
  </div>
</template>

<script>
import validator from "validator";
export default {
  data() {
    return {
      username: "",
      password: "",
      usernameValidity: "pending",
      passwordValidity: "pending",
      error: null
    };
  },
  methods: {
    async login() {
      this.error = null;
      try {
        await this.$store.dispatch("authentication/login", {
          username: this.username,
          password: this.password
        });
        this.$router.replace("/");
      } catch (e) {
        if (e.response) {
          return $nuxt.error({ code: e.response.status, message: e.message });
        } else {
          return $nuxt.error({
            code: 500,
            message: "Check your internet connection and/or refresh the page"
          });
        }
      }
    },
    validateUsername() {
      if (validator.isEmpty(this.username)) {
        this.usernameValidity = "invalid";
      } else {
        this.usernameValidity = "valid";
      }
    },
    validatePassword() {
      if (validator.isEmpty(this.password)) {
        this.passwordValidity = "invalid";
      } else {
        this.passwordValidity = "valid";
      }
    }
  },
  layout: "auth"
};
</script>
