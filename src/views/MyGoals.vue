<template>
<div class="card">
    <div class="card-header">
            <h4 class="card-title" v-if="Globals.user">{{Globals.user.name}}'s Goals</h4>
            <ul>
                <li v-for="goal in goals" :key="goal.id">
                    {{goal.Category}}:  {{goal.Motion}}  -  {{goal.Sets}},  {{goal.Reps}}&nbsp;&nbsp;&nbsp;&nbsp;
                        <button type ="submit" width="150px" class="btn btn-danger" @click.prevent="removeGoal(goal)">Remove</button>&nbsp;&nbsp;&nbsp;&nbsp;
                        <button type ="submit" width="150px" class="btn btn-success" @click.prevent="metGoal(goal)">Achieve</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;Achieved?&nbsp;&nbsp;&nbsp;&nbsp;
                    <img v-if="goal.Achieved==1" src="../assets/check.png" height="20px">
                    <br><br>
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
                    <label for="Motion">Action</label>
                    <input type="text" v-model="data.Motion"
                      class="form-control" name="Motion" id="Motion" aria-describedby= "HelpMotion" placeholder="i.e. Run 1km, Curl 30 lbs, Smoothie for breakfast, etc.">
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
                  <button type="submit" class="btn btn-success">Add Goal</button>
        </form>
      </div>
</div>

</template>

<script>

import {Globals} from "@/models/api";
import {GetGoals, AddGoal, MetGoal, RemoveGoal} from "@/models/users.js";
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
        async metGoal(input){
            try{
              this.data.id = input.id;
              const m = await MetGoal(this.data);
              toastr.success("Great Job on Reaching Your Goal!");
            }
            catch (error) {
                Globals.errors.push(error);
                toastr.error(error.message);
            }
        },
        async removeGoal(input){
            try{
              this.data.id = input.id;
              const m = await RemoveGoal(this.data);
              toastr.success("Do or Do Not. There is no Try.");
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
