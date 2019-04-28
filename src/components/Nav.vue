<template>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <router-link class="navbar-brand" to="/">
            <img alt="Fitron logo" height='50px' src="../assets/logo.png">
        </router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link class="nav-link" to="/" active-class="active" exact>Home<span class="sr-only">(current)</span></router-link>
                </li>
                <!--
                <li class="nav-item">
                    <router-link class="nav-link" to="/About" active-class="active" exact>About</router-link>
                </li>
                -->
                <li class="nav-item">
                    <router-link class="nav-link" to="/MyUpdates" active-class="active" exact>Updates</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/MyActivities" active-class="active" exact>Activities</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/MyGoals" active-class="active" exact>Goals</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/MyFriends" active-class="active" exact>Friends</router-link>
                </li>
            </ul>
        <form class="form-inline mt-2 mt-md-0" v-if="!Globals.user">
            <router-link to="/Login" class="nav-link">LOGIN</router-link>
            <router-link to="/Register" class="nav-link">SIGN UP</router-link>
        </form>
        <span class="navbar-text" v-if="Globals.user">
            <img width="30" :src="`https://graph.facebook.com/${Globals.oAuthId}/picture`" onerror="../assets/logo.png"/>
            Welcome {{Globals.user.FirstName}} {{Globals.user.LastName}}</span>
        </div>
    </nav>
</template>

<script>
import { Globals } from "@/models/api";

export default {
    data:()=>({
        Globals: Globals
    }),
    methods: {
        }
    }
</script>
<style></style>
