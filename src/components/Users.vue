<template>
  <div class="content px-5 pt-3">
    <div class="row align-items-center pb-3">
      <div class="col-lg-6 col-xl-6 text-dark">
        <p class="h3 py-2">Upload, Edit and Delete Users</p>
      </div>
      <div class="col-lg-6 col-xl-6 text-lg-right">
        <button
          data-toggle="modal"
          data-target="#createUser"
          class="btn btn-custom btn-custom--alt"
        >Upload User</button>
        <router-link
          to="/messages"
          tag="button"
          class="btn btn-custom btn-custom--alt ml-3"
        >Messages</router-link>
      </div>
    </div>
    <div class="row">
      <div class="col">
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
              <td>{{user.created_at.slice(0, 10)}}</td>
              <td>
                <button
                  @click="showUser(user.id)"
                  data-toggle="modal"
                  data-target="#exampleModal"
                  class="btn btn-edit"
                >Edit</button>&nbsp;
                <button @click="deleteUser(user.id)" class="btn btn-edit">Del</button>
              </td>

              <!-- Modal for creating user -->
              <div
                class="modal fade"
                id="createUser"
                tabindex="-1"
                role="dialog"
                aria-labelledby="createUserLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="createUserLabel">Create user</h5>
                      <button class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <form class="sign-form">
                        <div class="form-group">
                          <input
                            v-model="createName"
                            type="text"
                            name="name"
                            placeholder="Name"
                            class="form-control"
                            required
                          >
                          <input
                            v-model="createEmail"
                            type="email"
                            name="email"
                            placeholder="Email"
                            class="form-control"
                            required
                          >
                          <input
                            v-model="createPassword"
                            type="password"
                            name="password"
                            placeholder="Password"
                            class="form-control"
                            required
                          >
                          <input
                            v-model="createConfirm"
                            type="password"
                            name="confirm"
                            placeholder="Confirm"
                            class="form-control"
                            required
                          >
                        </div>
                      </form>
                    </div>
                    <div class="modal-footer">
                      <button
                        @click="createUser"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                      >Create User</button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- modal -->

              <!-- Modal for edit user-->
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
    <div class="row">
      <div class="col">
        <nav aria-label="Search results pages">
          <ul class="pagination d-flex justify-content-center align-items-center text-center">
            <li @click="firstPage" v-if="this.allPages.currentPage !==1" class="page-item">
              <span class="page-link">First</span>
            </li>
            <li @click="prevPage" v-if="this.allPages.currentPage !==1" class="page-item">
              <span class="page-link">{{ allPages.currentPage - 1 }}</span>
            </li>
            <li class="page-item">
              <span class="page-link current">{{ allPages.currentPage }}</span>
            </li>
            <li
              @click="nextPage"
              v-if="this.allPages.lastPageNo !== this.allPages.currentPage"
              class="page-item"
            >
              <span class="page-link">{{ allPages.currentPage + 1}}</span>
            </li>
            <li
              @click="lastPage"
              v-if="this.allPages.lastPageNo !== this.allPages.currentPage"
              class="page-item"
            >
              <span class="page-link">Last</span>
            </li>
          </ul>
        </nav>
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
      id: null,
      createName: "",
      createEmail: "",
      createPassword: "",
      createConfirm: "",
      pages: {
        proxy: "https://cors-anywhere.herokuapp.com/",
        first:
          "https://cors-anywhere.herokuapp.com/http://comtrade.sytes.net/api/users?page=1",
        current: null
      }
    };
  },
  computed: mapGetters(["allUsers", "allPages"]),
  methods: {
    ...mapActions(["fetchUsers"]),

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
          this.fetchUsers(this.pages.first);
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
            this.fetchUsers(this.pages.first);
          })
          .catch(e => console.log(e));
      }
    },
    createUser() {
      const formData = {
        name: this.createName,
        email: this.createEmail,
        password: this.createPassword,
        password_confirmation: this.createConfirm
      };
      axios
        .post("/auth/signup", formData)
        .then(res => {
          console.log(res);
          alert("User uccessfully created!");
          this.fetchUsers(this.pages.proxy + this.allPages.lastPage);
        })
        .catch(e => {
          console.log(e.response);
          if (e.response.status === 422) {
            alert("The email has already been taken.");
          } else {
            alert("Not valid data. Try again.");
          }
        });
    },
    firstPage() {
      this.fetchUsers(this.pages.first);
    },
    prevPage() {
      this.fetchUsers(this.pages.proxy + this.allPages.prevPage);
    },
    nextPage() {
      this.fetchUsers(this.pages.proxy + this.allPages.nextPage);
    },
    lastPage() {
      this.fetchUsers(this.pages.proxy + this.allPages.lastPage);
      console.log("Last Page");
    }
  },
  created() {
    this.fetchUsers(this.pages.first);
  }
};
</script>

<style lang="scss">
.content {
  background: $white;
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  color: $textColor;
}
.table td,
.table th {
  vertical-align: middle;
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
.btn-edit {
  background: $altColor;
  color: $mainColor;
}
.modal {
  color: $textColor;
  .sign-form {
    .form-control {
      border: 1px solid $mainColor;
    }
  }
}
.page-item {
  cursor: pointer;
}
.page-link {
  color: $altColor;
}
.current {
  padding: 1rem 1.5rem;
  background: $altColor;
  color: white;
}
</style>


