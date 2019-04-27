<template>

<div class="card">
    <div class="card-header">
        <div>
            <h4 class="card-title" v-if="Globals.user">{{Globals.user.name}}'s Goals</h4>
            <ul>
                <li v-for="goal in goals" :key="goal.id">
                    {{goal.Type}} > {{goal.Motion}}: {{goal.Sets}} sets x {{goal.Reps}} reps  |  Achieved? {{goal.Achieved}}    
                    <button class="btn btn-primary btn-block" @click.prevent="metGoal">Goal Achieved</button>
                </li>

            </ul>
        </div>
    </div>

      <div class="card-body">
        <h4 class="card-title">Add A New Goal</h4>
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
                <button type="submit" class="btn btn-success">Add Goal</button>
            </form>
      </div>
</div>

</template>

<script>

import {Globals} from "@/models/api";
import {GetGoals, AddGoal, MetGoal} from "@/models/users.js";

export default {
    data(){
        return {
            Globals: Globals,
            goals: []
        }
    },
    async mounted(){
        this.goals = await GetGoals();
    },
    methods: {
        async submit(){
          try{
            const m = await AddGoal(this.data);
            toastr.success("Goal Successfully Added! Get to work!");
          }
          catch (error) {
            Globals.errors.push(error);
            toastr.error(error.message);
          }
        },
        async metGoal(){
            try{
                const m = await MetGoal(this.data.id);
                toastr.success("Great Job on Reaching Your Goal!");
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
