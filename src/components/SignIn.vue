<template>
  <div class="bg-wrapper">
    <main class="main-content">
      <div class="wrapper text-center px-3 px-sm-0">
        <h1>DEMO</h1>

        <form @submit.prevent="submitForm" id="signIn" class="sign-form">
          <div class="form-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              id="username"
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
          <button type="submit" class="btn btn-custom">Sign in</button>
        </form>

        <p class="links">
          <router-link to="/nopassword" tag="span">Forgot password?</router-link>
          <br class="d-block d-sm-none">Or if you don't have an account
          <router-link to="/signup" tag="span">Click here!</router-link>
        </p>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  methods: {
    submitForm() {
      console.log("Form submited");
    }
  }
};
</script>

<style lang="scss">
.main-content {
  @include flexCenter(column);
  height: 100vh;
  max-width: 500px;
  margin: 0 auto;
  @media #{$vertical} {
    height: auto;
    padding-top: 2rem;
  }
  h1 {
    font-weight: 600;
  }
}
.wrapper {
  @include flexCenter(column);
  width: 100%;
}
.sign-form {
  @include flexCenter(column);
  width: 100%;
}
.form-group {
  width: 100%;
  padding: 3rem 0 1.5rem;
}
.form-control {
  border-radius: 2rem;
  border: none;
  text-align: center;
  font-weight: 600;
  color: $altColor;
  margin-bottom: 1rem;
  &:last-child {
    margin-bottom: 0;
  }
  &::placeholder {
    color: $altColor;
    font-weight: 600;
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-text-fill-color: $altColor;
    -webkit-box-shadow: none;
    box-shadow: none;
    background-color: $white;
  }
  &:focus {
    border: none;
    box-shadow: none;
  }
}
.links {
  padding-top: 1.5rem;
  font-weight: 600;
  span {
    color: $altColor;
    font-weight: 400;
    cursor: pointer;
  }
}
</style>
