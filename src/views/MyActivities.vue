<template>
    <div class="card">
      <div class="card-header">
          <h4 class="card-title" v-if="Globals.user">{{Globals.user.name}}'s Activities</h4>
          <ul>
              <li v-for="activity in activities" :key="activity.id">
                  {{activity.Category}}:  {{activity.Motion}}  -  {{activity.Sets}}, {{activity.Reps}}&nbsp;&nbsp;&nbsp;&nbsp;
                  <button type ="submit" width="150px" class="btn btn-danger" @click.prevent="removeAct(activity)">Remove</button>
              </li>
          </ul>
      </div>
      <div class="card-body">
        <h4 class="card-title">Add New Activity</h4>
        <p class="card-text">
          <form @submit.prevent="submit" id="NewActivity">
                  <div class="form-group">
                    <label for="Category">Category<br></label>
                    <select class="form-control" name="Category" form="NewActivity" v-model="data.Category">
                        <option value="Cardio">Cardio</option>
                        <option value="Lifting">Weightlifting</option>
                        <option value="Yoga">Yoga</option>
                        <option value="Diet">Diet</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="Motion">Action</label>
                    <input type="text" v-model="data.Motion"
                      class="form-control" name="Motion" id="Motion" aria-describedby= "HelpMotion" placeholder="ex: Run 1km, Curl 30 lbs, Smoothie for breakfast, etc.">
                  </div>
                  <div class="form-group">
                    <label for="Sets">Frequency/Sets</label>
                    <input type="text" v-model="data.Sets"
                      class="form-control" name="Sets" id="Sets" aria-describedby= "HelpSets" placeholder="ex: 5 for sets, 1 for daily, etc.">
                    <small id= "HelpSets" class="form-text text-muted">Please enter a numeric value</small>
                  </div>
                  <div class="form-group">
                    <label for="Reps">Time/Reps</label>
                    <input type="text" v-model="data.Reps"
                      class="form-control" name="Reps" id="Reps" aria-describedby= "HelpReps" placeholder="ex: 5 for reps, 30 for seconds">
                    <small id= "HelpReps" class="form-text text-muted">Please enter a numeric value</small>
                  </div>
                  <button type="submit" class="btn btn-success">Add Activity</button>
        </form>
      </div>
    </div>
</template>



<script>

import {Globals} from "@/models/api";
import {GetActivities, AddActivity, RemoveActivity} from "@/models/users.js";
import toastr from 'toastr';

export default {
    data: ()=> ({
      data: {},
      Globals: Globals,
      activities: []
    }),
    async mounted(){
        this.activities = await GetActivities();
    },
    methods: {
        async submit(){
          try{
            this.data.UserId = Globals.user.UserId;
            const m = await AddActivity(this.data);
            this.$router.push(Globals.redirectRoute);
            toastr.success("Activity Successfully Added!");
          }
          catch (error) {
            Globals.errors.push(error);
            toastr.error(error.message);
          }
        },
        async removeAct(input){
            try{
              this.data.id = input.id;
                const m = await RemoveActivity(this.data);
                toastr.success("Activity Removed. Try Something Else.");
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
