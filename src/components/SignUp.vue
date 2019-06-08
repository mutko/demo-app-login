<template>
  <div class="bg-wrapper">
    <main class="main-content">
      <div class="wrapper text-center px-3 px-sm-0">
        <h1>DEMO</h1>

        <form @submit.prevent="submitForm" id="signIn" class="sign-form">
          <div class="form-group">
            <input
              type="text"
              name="name"
              placeholder="Name"
              id="name"
              class="form-control"
              required
            >
            <input
              type="text"
              name="organization"
              placeholder="Organization"
              id="organization"
              class="form-control"
              required
            >
            <input
              type="email"
              name="email"
              placeholder="Email"
              id="email"
              class="form-control"
              required
            >
            <input
              type="password"
              name="password"
              placeholder="Password"
              id="password"
              class="form-control"
              required
            >
          </div>
          <router-link to="/welcome" tag="button" class="btn btn-custom" type="submit">Submit</router-link>
        </form>
      </div>
    </main>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
