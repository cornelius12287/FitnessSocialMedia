<template>
    <div class="card">
      <div class="card-header">
          <h4 class="card-title" v-if="Globals.user">{{Globals.user.name}}'s Friends</h4>
      </div>
      <div class="card-body">
          <ul>
              <li v-for="friend in friends" :key="friend.id">
                  <router-link class="nav-link" to="/AboutUser" active-class="active" exact>
                  <span v-on:click="setFriend(friend)">{{friend.FriendFirst}} {{friend.FriendLast}}</span></router-link>
              </li>
          </ul>
    </div>



    <div class="card-header">
        <h4 class="card-title">Search by Email</h4>
    </div>
    <div class="card-body">
        <form @submit.prevent="showEmail">
            <div class="form-group">
                <input type="text" v-model="data.SearchEmail"
                  class="form-control" name="SearchEmail" id="SearchEmail" aria-describedby= "HelpSearchEmail"
                  placeholder="Search by Email">
            </div>
            <button type="submit" class="btn btn-success">Search</button>
        </form>
    </div>




    <div class="card-header">
        <h4 class="card-title">Add a Friend</h4>
    </div>
    <div class="card-body">
        <form @submit.prevent="submit">
            <div class="form-group">
                <label for="FriendFirst">First Name</label>
                <input type="text" v-model="data.FriendFirst" class="form-control" name="FriendFirst" id="FriendFirst" aria-describedby= "HelpFriendFirst" placeholder="First Name">
            </div>
            <div class="form-group">
                <label for="FriendLast">Last Name</label>
                <input type="text" v-model="data.FriendLast" class="form-control" name="FriendLastt" id="FriendLast" aria-describedby= "HelpFriendLast" placeholder="Last Name">
            </div>
            <button type="submit" class="btn btn-success">Add Friend</button>
        </form>
      </div>
    </div>
</template>

<script>

import {Globals} from "@/models/api";
import {GetFriends, AddFriend, SetFriend} from "@/models/users.js";
import toastr from 'toastr';


import { getEmail } from "@/models/users";
/* VUE SELECT
import vSelect from 'vue-select'
Vue.component('v-select', vSelect)
*/


export default {
    data: ()=> ({
        data: {},
        Globals: Globals,
        friends: []
    }),
    async mounted(){
        this.friends = await GetFriends();
    },
    methods: {
        async submit(){
          try{
            this.data.UserId = Globals.user.UserId;
            const m = await AddFriend(this.data);
            this.$router.push(Globals.redirectRoute);
            toastr.success("Friend Added!");
          }
          catch (error) {
            Globals.errors.push(error);
            toastr.error(error.message);
          }
        },
        async setFriend(input){
            this.data = input;
            const m = await SetFriend(this.data);
        },
        async showEmail(input){
            const m = await getEmail(this.data.SearchEmail);
            //document.write(m);
        },
    }
}
</script>

<style>

</style>
