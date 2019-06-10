<template>
  <div class="outside-wrapper">
    <div class="logo">
      <router-link to="/" tag="h1">Demo</router-link>
    </div>
    <div class="logout d-flex justify-content-end align-items-center pr-5">
      <button @click="onLogout" class="btn btn-custom btn-custom--alt">Logout</button>
    </div>
    <div class="color"></div>
    <div class="content px-5 pt-5">
      <div class="row align-items-center">
        <div class="col-lg-6 col-xl-6 text-dark">
          <p class="h3 py-2">Edit and Delete Messages</p>
          <p>If you would like to seed your mailing with names of people within your organization, add their names here</p>
        </div>
        <div class="col-lg-6 col-xl-3 offset-xl-3 text-lg-right">
          <button class="btn btn-custom btn-custom--alt">Upload User</button>
          <button class="btn btn-custom btn-custom--alt ml-3">
            <span>&#9993;</span>
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <table class="table">
            <thead>
              <tr>
                <td scope="col">#Id</td>
                <td scope="col">User Name</td>
                <td scope="col">Email</td>
                <td scope="col">Uploaded</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="mssg in allMessages" :key="mssg.id">
                <td>{{ mssg.id }}</td>
                <td>{{ mssg.body }}</td>
                <td>{{ mssg.name }}</td>
                <td>
                  {{mssg.created_at.slice(0, 10)}}
                  <button class="edit">...</button>
                  <button class="del">x</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Messages",
  computed: mapGetters(["allMessages"]),
  methods: {
    ...mapActions(["fetchMssg"]),
    onLogout() {
      this.$store.dispatch("logout");
    }
  },
  created() {
    this.fetchMssg();
  }
};
</script>

<style scoped lang="scss">
.outside-wrapper {
  height: 100vh;
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 80px 1fr;
  justify-content: center;
  @media #{$xx-large} {
    grid-template-columns: 350px 1fr;
    grid-template-rows: 120px 1fr;
  }
}
.logo {
  background: $mainColor;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  display: flex;
  @include flexCenter(row);
  h1 {
    margin: 0;
    text-transform: uppercase;
    font-size: 3rem;
    font-weight: 600;
    cursor: pointer;
    @media #{$xx-large} {
      font-size: 3.5rem;
    }
  }
}
.logout {
  background: $mainColor;
  grid-column: 2 / 3;
  grid-row: 1 / 2;
}
.color {
  background: $mainColor;
  grid-column: 1 / 2;
  grid-row: 2 / 3;
}
.content {
  background: $white;
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  color: $textColor;
}
.btn-custom--alt {
  color: $altColor;
  background: $white;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  display: inline-block;
  width: auto;
  padding: 0.6rem 1.25rem;
  text-transform: capitalize;
  &:hover {
    color: $mainColor;
  }
}
</style>

