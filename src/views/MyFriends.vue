<template>
    <div class="card">
      <div class="card-header">
          <h4 v-if="Globals.user">{{Globals.user.name}}'s Friends</h4>
          <ul>
              <li v-for="friend in friends" :key="friend.id">
                  {{friend.FirstName}} {{friend.LastName}}
              </li>
          </ul>
      </div>
      <div class="card-body">
        <h4 class="card-title">Add New Friend</h4>
        <p class="card-text" />
        <form @submit.prevent="submit">
            ADD NEW FRIEND CODE HERE
        </form>
      </div>
    </div>
</template>

<script>

import {Globals} from "@/models/api";
import {GetFriends} from "@/models/users.js";
import toastr from 'toastr';

export default {
    //data(){return{Globals:Globals,friends:[]}},
    data: ()=> ({
        data: {},
        Globals: Globals,
        friends: []
    }),
    async mounted(){
        this.friends = await GetFriends();
    }
}
</script>

<style>

</style>
