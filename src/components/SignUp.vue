<template>
  <div class="bg-wrapper">
    <main class="main-content">
      <div class="wrapper text-center px-3 px-sm-0">
        <h1>DEMO</h1>

        <form @submit.prevent="onSubmit" class="sign-form">
          <div class="form-group">
            <input
              v-model="name"
              type="text"
              name="name"
              placeholder="Name"
              class="form-control"
              required
            >
            <input
              v-model="email"
              @input="$v.email.$touch()"
              type="email"
              name="email"
              placeholder="Email"
              class="form-control"
              required
            >
            <input
              v-model="password"
              type="password"
              name="password"
              placeholder="Password"
              class="form-control"
              required
            >
            <input
              v-model="confirm"
              type="password"
              name="confirm"
              placeholder="Confirm"
              class="form-control"
              required
            >
          </div>
          <button class="btn btn-custom" type="submit">Submit</button>
        </form>
      </div>
    </main>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirm: ""
    };
  },
  validations: {
    email: {
      required,
      email
    }
  },
  methods: {
    onSubmit() {
      const formData = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.confirm
      };
      console.log(formData);
      this.$store.dispatch("signUp", formData);
    }
  }
};
</script>

<style>
</style>
