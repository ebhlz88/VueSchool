<template>
  <div class="screenimage" id="app">
  <div>
  <!-- Image and text -->
  <b-navbar class="navcolor">
    <b-navbar-brand href="/login" class="fixed">
      <img src="./assets/qqq.png" class="d-inline-block align-top imgsize" alt="school management"><br>
      <b>School Management</b>
    </b-navbar-brand>
    <a href="/#/login" class="marginleft textcolor" v-if="!isloggedin">Log in</a>
    <button v-on:click="logout" v-if="isloggedin" class="astext marginleft">Log out</button>
      
  </b-navbar>
    </div>
  
  
  <div class="di">
  <b-nav >
    
    <b-nav-item v-if="isloggedin" to="/studentslist" exact-active-class="active">Students List</b-nav-item>
    <b-nav-item v-if="isloggedin" to="/post" exact exact-active-class="active">Add a Student</b-nav-item>
    <b-nav-item v-if="isloggedin"  to="/delet" exact exact-active-class="active">Delete</b-nav-item>
    <b-nav-item v-if="isloggedin" to="/fees" exact exact-active-class="active">Fee detail</b-nav-item>
    <b-nav-item v-if="isloggedin" to="/teacher" exact exact-active-class="active">Add teacher</b-nav-item>
    <b-nav-item  to="/tsearch" exact exact-active-class="active">Teacher payment detail</b-nav-item>
    <b-nav-item to="/calc" exact exact-active-class="active">per year analysis</b-nav-item>
    <b-nav-item to="/result" exact exact-active-class="active">Students Result</b-nav-item>
   
  </b-nav>
 </div>

 
<div class="back">
  
<router-view class="routposition"></router-view>
</div>
<br/>
<br/>
<br/>
</div>

</template>

<script>
import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'


Vue.use(VueAxios,axios)


import {mapGetters} from 'vuex'
export default {
  name: 'App',
  data(){
    return{
    }
  },
  methods:{
    logout(){
      this.$store.dispatch('isloggedin',false)
      this.$router.push('/')
      var axiosConfig = {
        headers: {
            'Authorization': 'Token ' + this.token
            }
        };
      axios.post('http://127.0.0.1:8000/logout',null,axiosConfig).then(()=>{
            this.$store.dispatch('token',null)
            this.$store.dispatch('isloggedin',false)
            
            // this.smessage="Succesfully added"
            this.$bvToast.toast('Succesfully added',{title:'Succesful',
             variant: 'success',solid:true,toaster:'b-toaster-top-center',
            })

        });
    },
  },
  computed:{
    ...mapGetters(['token']),
    ...mapGetters(['isloggedin'])
  },
  
  
  
  
}
  
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}
 
.di{
  position: relative;
  top: 5vh;
  background-color: rgba(0, 0, 0, 0.6);
  
}
.imgsize{
  height: 50px;
  align-self: initial;
}
.screenimage{
  background-position-y: 8vh;
  background-image: url("./assets/screenimage.jpg");
  background-repeat: repeat-y;
  background-size: 230vh;
  
}

.navcolor{
  background-color: #9D8CCC;
  border-radius: 0.6rem;
}
.routposition{
   position: relative;
   top: 5vh;
}
.back{
        min-height: 65vh;
    }
.floatr{
  float: right;
}
.astext {
    background:none;
    border:none;
    margin:0;
    padding:0;
    cursor: pointer;
}
.textcolor{
  color: black;
}
.marginleft{
  margin-left: auto;
}

</style>
