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
              id="name"
              class="form-control"
              required
            >
            <input
              v-model="email"
              type="email"
              name="email"
              placeholder="Email"
              id="email"
              class="form-control"
              required
            >
            <input
              v-model="password"
              type="password"
              name="password"
              placeholder="Password"
              id="password"
              class="form-control"
              required
            >
            <input
              v-model="confirm"
              type="password"
              name="confirm"
              placeholder="Confirm"
              id="confirm"
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
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirm: ""
    };
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
