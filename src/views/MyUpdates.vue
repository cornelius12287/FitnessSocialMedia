<template>
    <div class="card">
      <div class="card-header">
          <h4 class="card-title" v-if="Globals.user">{{Globals.user.name}}'s Updates</h4>
      </div>
      <div class="card-body">
          <ul>
              <li v-for="update in updates" :key="update.id">
                  <small>{{update.FirstName}} {{update.LastName}} wrote at {{update.created_at}}:</small>&nbsp;&nbsp;&nbsp;&nbsp;
                  <button type ="submit" width="150px" class="btn btn-danger" @click.prevent="removeUpdate(update)">Remove</button><br>
                  {{update.UpdateText}}<br><br><br>
              </li>
          </ul>
    </div>

      <div class="card-header">
        <h4 class="card-title">Add An Update</h4>
      </div>
      <div class="card-body">
            <form @submit.prevent="submit">
                <div class="form-group">
                  <input type="text" v-model="data.UpdateText"
                  class="form-control" name="Update" id="Update" aria-describedby= "HelpUpdate" placeholder="What's On Your Mind?">
                </div>
                <button type="submit" class="btn btn-success">Add Update</button>
            </form>
      </div>
</div>
</template>

<script>

import {Globals} from "@/models/api";
import {GetUpdates, AddUpdate} from "@/models/users.js";
import toastr from 'toastr';

export default {
    data: ()=> ({
        data: {},
        Globals: Globals,
        updates: []
    }),
    async mounted(){
        this.updates = await GetUpdates();
        console.log(this.updates);
    },
    methods: {
        async submit(){
          try{
            this.data.UserId = Globals.user.UserId;
            this.data.FirstName = Globals.user.FirstName;
            this.data.LastName = Globals.user.LastName;
            const m = await AddUpdate(this.data);
            toastr.success("Goal Successfully Added! Thanks for sharing.");
          }
          catch (error) {
            Globals.errors.push(error);
            toastr.error(error.message);
          }
        }
    }
}
</script>

<style>

</style>
