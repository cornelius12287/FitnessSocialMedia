<template>
<div class="card">
    <div class="card-header">
        <div>
            <h4 class="card-title" v-if="Globals.user">{{Globals.user.name}}'s Updates</h4>
            <ul>
                <li v-for="update in updates" :key="update.id">
                    {{update.created_at}}: {{update.Test}}
                </li>
            </ul>
        </div>
    </div>

      <div class="card-body">
        <h4 class="card-title">What's on your mind?</h4>
        <p class="card-text">
            <form @submit.prevent="submit">
                <div class="form-group">
                  <label for="update">Update</label>
                  <input type="text" v-model="data.Text"
                    class="form-control" name="Update" id="Update" aria-describedby= "HelpUpdate" placeholder="Update">
                </div>
                <button type="submit" class="btn btn-success">Add Update</button>
            </form>
      </div>
</div>
</template>

<script>

import {Globals} from "@/models/api";
import {GetUpdates, AddUpdate} from "@/models/users.js";

export default {
    data(){
        return {
            Globals: Globals,
            updates: []
        }
    },
    async mounted(){
        this.updates = await GetUpdates();
    },
    methods: {
        async submit(){
          try{
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
