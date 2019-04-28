<template>
<div class="card">
    <div class="card-header">
            <h4 v-if="Globals.user">{{Globals.user.name}}'s Goals</h4>
            <ul>
                <!--:key="goal.id"-->
                <li v-for="goal in goals">
                    {{goal.Category}} > {{goal.Motion}}: {{goal.Sets}} sets x {{goal.Reps}} reps  |  Achieved? {{goal.Achieved}}  <button class="btn btn-primary btn-block" @click.prevent="metGoal">Goal Achieved</button>
                </li>
            </ul>
    </div>
      <div class="card-body">
        <h4 class="card-title">Add A New Goal</h4>
        <p class="card-text">
            <form @submit.prevent="submit" id="NewGoal">
                  <div class="form-group">
                    <label for="Category">Category<br></label>
                    <select class="form-control" name="Category" form="NewGoal" v-model="data.Category">
                        <option value="Cardio">Cardio</option>
                        <option value="Lifting">Weightlifting</option>
                        <option value="Yoga">Yoga</option>
                        <option value="Diet">Diet</option>
                    </select>
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
import toastr from 'toastr';

export default {
    data: ()=> ({
        data: {},
        Globals: Globals,
        goals: []
    }),
    async mounted(){
        this.goals = await GetGoals();
    },
    methods: {
        async submit(){
          try{
            this.data.UserId = Globals.user.UserId;
            this.data.Achieved = false;
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
              console.log("ERROR HERE");
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
