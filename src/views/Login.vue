<template>
    <div class="card">
      <div class="card-header">
        <ul class="nav nav-pills card-header-pills">
          <li class="nav-item">
            <a class="nav-link" href="/Register">Register New User</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="/Login">Login with Existing User</a>
          </li>
        </ul>
      </div>
      <div class="card-body">
        <h4 class="card-title">Login</h4>
        <p class="card-text">
            <form @submit.prevent="submit">
                <div class="form-group">
                  <label for="email">Email</label>
                  <input type="text" v-model="data.email"
                    class="form-control" name="Email" id="Email" aria-describedby= "HelpEmail" placeholder="Email">
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <input type="password" v-model="data.password"
                    class="form-control" name="Password" id="Password" placeholder="Password">
                </div><br>
                <button type="submit" class="btn btn-success">Login</button>&nbsp;&nbsp;&nbsp;&nbsp;
            </form><br>
            <!--<button class="btn btn-info" @click.prevent="facebookLogin">Log In with Facebook</button>-->
      </div>

      <div class="col-lg-6">
        <div class="card border-success" v-if="newUser">
          <div class="card-body">
            <h4 class="card-title">You are now Logged In!</h4>
            <p class="card-text">
              {{newUser.FirstName}} {{newUser.LastName}}
            </p>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
import { Globals } from "@/models/api";
import { Login } from "@/models/users";
import * as fb from "@/models/facebook";
import toastr from 'toastr';

export default {
    data: ()=> ({
        data: {},
        newUser: null
    }),

    methods: {
        async submit(){
          try{
            await Login(this.data);
            this.$router.push(Globals.redirectRoute)
            toastr.success("You've logged in successfully!");
          }
          catch(error){
            Globals.errors.push(error);
            toastr.error(error.message);
          }
        },

        async facebookLogin(){
          const m = await fb.Login();
        }
    }
}
</script>

<style>

</style>
