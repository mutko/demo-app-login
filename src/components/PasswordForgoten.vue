<template>
  <div class="bg-wrapper">
    <div class="full-screen">
      <div class="container">
        <router-link to="/" tag="h1" class="title">DEMO</router-link>

        <main class="main-content--alt">
          <div class="text-center text-md-left">
            <p class="h1 text-capitalize pt-3">Forgot your password?</p>
            <p
              class="py-3"
            >Enter the email address associated with this account. We will email you a link with instructions on how to reset your password.</p>
            <input
              type="email"
              name="email"
              placeholder="Enter your e-mail"
              class="form-control"
              required
            >
            <router-link to="/passwordsent" tag="button" class="btn btn-custom" type="submit">SEND</router-link>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.full-screen {
  height: 100vh;
}
.title {
  padding-top: 3rem;
  font-size: 3rem;
  font-weight: 600;
  display: inline-block;
  width: auto;
  cursor: pointer;
  @media #{$xx-large} {
    font-size: 5rem;
    padding-top: 5rem;
  }
}
.main-content--alt {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  max-width: 500px;
  @media #{$xx-large} {
    max-width: 600px;
  }
}
</style>
