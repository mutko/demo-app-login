<template>
  <div class="content px-5 pt-3">
    <div class="row align-items-center pb-3">
      <div class="col-lg-6 col-xl-6 text-dark">
        <p class="h3 py-2">Edit and Delete Messages</p>
      </div>
      <div class="col-lg-6 col-xl-6 text-lg-right">
        <router-link to="/dashboard" tag="button" class="btn btn-custom btn-custom--alt">Users</router-link>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <table class="table">
          <thead>
            <tr>
              <td scope="col">#Id</td>
              <td scope="col">Message</td>
              <td scope="col">From</td>
              <td scope="col">Uploaded</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="mssg in allMessages" :key="mssg.id">
              <td>{{ mssg.id }}</td>
              <td>{{ mssg.body.length > 40 ?` ${mssg.body.slice(0, 40)}[...]` : mssg.body }}</td>
              <td>{{ mssg.name }}</td>
              <td>{{mssg.created_at.slice(0, 10)}}</td>
              <td>
                <button
                  @click="showMssg(mssg.id)"
                  data-toggle="modal"
                  data-target="#messageModal"
                  class="btn btn-edit"
                >Edit</button>&nbsp;
                <button @click="deleteMssg(mssg.id)" class="btn btn-edit">Del</button>
              </td>
              <!-- Modal -->
              <div
                class="modal fade"
                id="messageModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="messageModal"
                aria-hidden="true"
              >
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="messageModal">Edit message</h5>
                      <button class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <p>{{name }}</p>
                      <form>
                        <textarea v-model="message" cols="40" rows="10"></textarea>
                      </form>
                    </div>
                    <div class="modal-footer">
                      <button
                        @click="updateMssg"
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
              <span class="page-link">Prev</span>
            </li>
            <li class="page-item">
              <span class="page-link">{{ allPages.currentPage }}</span>
            </li>
            <li
              @click="nextPage"
              v-if="this.allPages.lastPageNo !== this.allPages.currentPage"
              class="page-item"
            >
              <span class="page-link">Next</span>
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
  name: "Messages",
  data() {
    return {
      name: "",
      message: "",
      id: null,
      pages: {
        proxy: "https://cors-anywhere.herokuapp.com/",
        first:
          "https://cors-anywhere.herokuapp.com/http://comtrade.sytes.net/api/users?page=1",
        firstMssg:
          "https://cors-anywhere.herokuapp.com/http://comtrade.sytes.net/api/messages?page=1",
        current: null
      }
    };
  },
  computed: mapGetters(["allMessages", "allPages"]),
  methods: {
    ...mapActions(["fetchMssg"]),
    showMssg(id) {
      console.log(id);
      axios
        .get(`/messages/${id}`, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        })
        .then(res => {
          console.log(res);
          this.name = res.data.data.name;
          this.message = res.data.data.body;
          this.id = res.data.data.id;
        })
        .catch(e => console.log(e));
    },
    updateMssg() {
      console.log("Message updated");
      axios
        .put(
          `/messages/${this.id}`,
          { body: this.message },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          }
        )
        .then(res => {
          console.log(res);
          this.fetchMssg(this.pages.firstMssg);
        })
        .catch(e => console.log(e));
    },
    deleteMssg(id) {
      let answer = confirm(
        "Are you sure that you want to delete this message? You can not get him back after this"
      );
      if (answer) {
        axios
          .delete(`/messages/${id}`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          })
          .then(res => {
            console.log(res);
            alert(`Message with id of ${id} deleted!`);
            this.fetchMssg(this.pages.firstMssg);
          })
          .catch(e => console.log(e));
      }
    },
    firstPage() {
      this.fetchMssg(this.pages.firstMssg);
    },
    prevPage() {
      this.fetchMssg(this.pages.proxy + this.allPages.prevPage);
    },
    nextPage() {
      this.fetchMssg(this.pages.proxy + this.allPages.nextPage);
    },
    lastPage() {
      this.fetchMssg(this.pages.proxy + this.allPages.lastPage);
      console.log("Last Page");
    }
  },
  created() {
    this.fetchMssg(this.pages.firstMssg);
  }
};
</script>