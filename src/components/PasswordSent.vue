<template>
  <div class="bg-wrapper">
    <div class="full-screen">
      <div class="container">
        <router-link to="/" tag="h1" class="title">DEMO</router-link>

        <main class="main-content--alt text-center">
          <img src="../assets/message.png" alt="Message icon">
          <p class="h1 text-capitalize pt-3">New password is sent to you</p>
          <p class="py-3">Please do check it, and continue with using our service</p>
          <router-link to="/" tag="button" class="btn btn-custom">Sign In</router-link>
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-content--alt {
  left: 0;
  right: 0;
  margin: 0 auto;
}
</style>
