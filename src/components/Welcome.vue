<template>
  <div class="bg-wrapper--alt">
    <div class="full-screen">
      <div class="container">
        <router-link to="/" tag="h1" class="title">DEMO</router-link>

        <main class="main-content--alt">
          <div class="text-center text-md-left">
            <p class="h1 text-capitalize pt-3">Thanks for using our service!</p>
            <p
              class="py-3"
            >Sed ut erspiciatios unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis</p>

            <router-link
              to="/dashboard"
              tag="button"
              class="btn btn-custom text-uppercase"
            >Let's start</router-link>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.bg-wrapper--alt {
  background-color: $mainColor;
  background-image: url("../assets/clouds.png"), url("../assets/rocket.png");
  background-repeat: no-repeat;
  background-position: center top 50px, right bottom;
  // background-size: 70% 60%;
  height: 100%;
}
</style>
