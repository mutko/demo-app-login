<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
</script>

<style lang="scss">
html {
  height: 100%;
}
body {
  font-family: $mainFont;
  color: $white;
  height: 100%;
}
.btn-custom {
  background: $altColor;
  color: $white;
  border-radius: 2rem;
  padding: 0.55rem 3.5rem;
  font-weight: 600;
  text-transform: uppercase;
  &:hover {
    color: $mainColor;
  }
}
.bg-wrapper {
  background: $mainColor url("./assets/bg.png") no-repeat;
  background-position: right -250px bottom -90px;
  background-size: 70% 60%;
  height: 100%;
}
</style>
