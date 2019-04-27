<template>

<div class="card">
    <div class="card-header">
        <div>
            <h4 class="card-title" v-if="Globals.user">{{Globals.user.name}}'s Activities</h4>
            <ul>
                <li v-for="activity in activities" :key="activity.id">
                    {{activity.Type}} > {{activity.Motion}}: {{activity.Sets}} sets x {{activity.Reps}} reps
                </li>
            </ul>
        </div>
    </div>

      <div class="card-body">
        <h4 class="card-title">Add A New Activity</h4>
        <p class="card-text">
            <form @submit.prevent="submit">
                <div class="form-group">
                  <label for="Type">Type</label>
                  <input type="text" v-model="data.Type"
                    class="form-control" name="Type" id="Type" aria-describedby= "HelpType" placeholder="Type">
                  <small id= "HelpType" class="form-text text-muted">i.e. Cardio, Arms, Legs, Core, etc.</small>
                </div>
                <div class="form-group">
                  <label for="Motion">Motion</label>
                  <input type="text" v-model="data.Motion"
                    class="form-control" name="Motion" id="Motion" aria-describedby= "HelpMotion" placeholder="Motion">
                  <small id= "HelpMotion" class="form-text text-muted">i.e. Run 1km, Curl 30 lbs, Squats 100 lbs, Crunches, etc.</small>
                </div>
                <div class="form-group">
                  <label for="Sets">Sets</label>
                  <input type="text" v-model="data.Sets"
                    class="form-control" name="Sets" id="Sets" aria-describedby= "HelpSets" placeholder="Sets">
                  <small id= "HelpSets" class="form-text text-muted">Please enter a numeric value</small>
                </div>
                <div class="form-group">
                  <label for="Reps">Reps</label>
                  <input type="text" v-model="data.Reps"
                    class="form-control" name="Reps" id="Reps" aria-describedby= "HelpReps" placeholder="Reps">
                  <small id= "HelpReps" class="form-text text-muted">Please enter a numeric value</small>
                </div>
                <button type="submit" class="btn btn-success">Add Activity</button>
            </form>
      </div>
</div>

</template>

<script>

import {Globals} from "@/models/api";
import {GetActivities, AddActivity} from "@/models/users.js";

export default {
    data(){
        return {
            Globals: Globals,
            activities: []
        }
    },
    async mounted(){
        this.activities = await GetActivities();
    },
    methods: {
        async submit(){
          try{
            const m = await AddActivity(this.data);
            toastr.success("Activity Successfully Added!");
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
