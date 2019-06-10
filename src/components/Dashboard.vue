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
          <p class="h3 py-2">Upload, Edit and Delete Users</p>
        </div>
        <div class="col-lg-6 col-xl-3 offset-xl-3 text-lg-right">
          <!-- <button class="btn btn-custom btn-custom--alt">Upload User</button> -->
          <router-link
            to="/messages"
            tag="button"
            class="btn btn-custom btn-custom--alt ml-3"
          >Messages</router-link>
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
              <tr v-for="user in allUsers" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>
                  {{user.created_at.slice(0, 10)}}
                  <button
                    @click="showUser(user.id)"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    class="edit"
                  >...</button>
                  <button @click="deleteUser(user.id)" class="del">x</button>
                </td>

                <!-- Modal -->
                <div
                  class="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Update user</h5>
                        <button class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <form>
                          <input v-model="name" type="text" placeholder="Name">
                          <input v-model="email" type="emai" placeholder="Email">
                        </form>
                      </div>
                      <div class="modal-footer">
                        <button
                          @click="updateUser"
                          class="btn btn-secondary"
                          data-dismiss="modal"
                        >Save changes</button>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- modal -->
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
import axios from "axios";
export default {
  name: "Dashboard",
  data() {
    return {
      name: "",
      email: "",
      id: null
    };
  },
  computed: mapGetters(["allUsers"]),
  methods: {
    ...mapActions(["fetchUsers"]),
    onLogout() {
      this.$store.dispatch("logout");
    },
    showUser(id) {
      console.log(id);
      axios
        .get(`/users/${id}`, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        })
        .then(res => {
          console.log(res);
          this.name = res.data.data.name;
          this.email = res.data.data.email;
          this.id = res.data.data.id;
        })
        .catch(e => console.log(e));
    },
    updateUser() {
      axios
        .put(
          `/users/${this.id}`,
          { name: this.name, email: this.email },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          }
        )
        .then(res => {
          console.log(res);
          this.$store.dispatch("fetchUsers");
        })
        .catch(e => console.log(e));
    },
    deleteUser(id) {
      let answer = confirm(
        "Are you sure that you want to delete this user? You can not get him back after this"
      );
      if (answer) {
        axios
          .delete(`/users/${id}`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          })
          .then(res => {
            console.log(res);
            alert(`User with id of ${id} deleted!`);
            this.$store.dispatch("fetchUsers");
          })
          .catch(e => console.log(e));
      }
    }
  },
  created() {
    this.fetchUsers();
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
.modal {
  color: $textColor;
}
</style>

