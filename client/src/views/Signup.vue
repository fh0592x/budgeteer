<template>
  <div class="container h-100">
    <div class="row d-flex h-100 justify-content-center align-items-center">
      <div class="col-6">
        <div class="alert bg-dark text-white">
          <i class="fa fa-info-circle mr-2"></i>
          This app is for experimental purposes only, and in no way production-ready. Please
          <u>DO NOT</u> use credentials that you may be using for your other online accounts.
        </div>
        <div class="card p-4">
          <div class="card-body">
            <form>
              <h3>Sign up</h3>
              <div class="form-group mb-3 mt-4">
                <app-alert :error="err" v-if="err" />
                <!-- <label for="exampleInputEmail1">Username</label> -->
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  v-model="credentials.username"
                  placeholder="Enter username"
                />
              </div>
              <div class="form-group mb-4">
                <!-- <label for="exampleInputPassword1">Password</label> -->
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  v-model="credentials.password"
                  placeholder="Enter password"
                />
              </div>
              <button type="button" class="btn btn-dark mr-2" @click.prevent="signup">Submit</button>
              <button type="button" class="btn btn-secondary" @click.prevent="$router.go(-1)">Cancel</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Alert from "../components/Alert.vue";
export default {
  components: {
    "app-alert": Alert
  },
  data() {
    return {
      credentials: {
        username: "",
        password: ""
      },
      err: ""
    };
  },
  methods: {
    signup() {
      if (!!this.credentials.username && !!this.credentials.password) {
        this.$store
          .dispatch("signup", { ...this.credentials })
          .then(() => this.$router.push("/login"))
          .catch(err => {
            this.err = err;
            (this.credentials.username = ""), (this.credentials.password = "");
          });
      } else {
        this.err = `All fields are required`;
        return;
      }
    }
  }
};
</script>

<style>
</style>