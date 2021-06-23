<template>
  <div class="screenimage" id="app">
  <div>
  <!-- Image and text -->
  <b-navbar class="navcolor">
    <b-navbar-brand href="/#/login" class="fixed">
      <img src="./assets/qqq.png" class="d-inline-block align-top imgsize" alt="school management"><br>
      <b>School Management</b>
    </b-navbar-brand>
    <a href="/#/login" class="marginleft textcolor" v-if="!isloggedin">Log in</a>
    <button v-on:click="logout" v-if="isloggedin" class="astext marginleft">Log out</button>
      
  </b-navbar>
    </div>
 
  
  <div class="di textcolor navbg" :style="{position : positiondata,top : topdata}">
   
  <b-nav tabs align="center">
    <b-nav-item class="textcolor" v-if="isloggedin" to="/" exact-active-class="active">Home</b-nav-item>
    <b-nav-item v-if="isloggedin" to="/post" exact exact-active-class="active">Add a Student</b-nav-item>
    <b-nav-item v-if="isloggedin" to="/teacher" exact exact-active-class="active">Add teacher</b-nav-item>
    <b-nav-item v-if="isloggedin" to="/teacherlist" exact exact-active-class="active">Teacher List</b-nav-item>
    <b-nav-item v-if="isloggedin" to="/calc" exact exact-active-class="active">per year analysis</b-nav-item>
   
  </b-nav>
 
 </div>
  
  <!-- <div class="di">
  <nav class="nav nav-tabs navbar-light">
    <mdb-nav-item  v-if="isloggedin" to="/" exact-active-class="active textcolor">Home</mdb-nav-item>
    <mdb-nav-item class="textcolor" v-if="isloggedin" to="/post" exact exact-active-class="active textcolor">Add a Student</mdb-nav-item>
    <mdb-nav-item v-if="isloggedin" to="/teacher" exact exact-active-class="active">Add teacher</mdb-nav-item>
    <mdb-nav-item  to="/tsearch" exact exact-active-class="active textcolor" >Teacher payment detail</mdb-nav-item>
    <mdb-nav-item to="/calc" exact exact-active-class="active textcolor">per year analysis</mdb-nav-item>

  </nav>
 </div> -->

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
    lastScrollPosition: 0,
    cc:null,
    positiondata : 'relative',
    topdata : '5vh'
    }
  },
  methods:{
    logout(){
      this.$store.dispatch('isloggedin',false)
      this.$router.push('/login')
      var axiosConfig = {
        headers: {
            'Authorization': 'Token ' + this.token
            }
        };
      axios.post('http://127.0.0.1:8000/logout',null,axiosConfig).then(()=>{
            this.$store.dispatch('token',null)
            this.$store.dispatch('isloggedin',false)
            
            // this.smessage="Succesfully added"

        });
    },
  onScroll () {
    // Get the current scroll position
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
    // Because of momentum scrolling on mobiles, we shouldn't continue if it is less than zero
    if (currentScrollPosition > 137) {
      this.cc='now it should be fixed'
      this.positiondata = 'fixed'
      this.topdata = 0
      return
    }
    else if(currentScrollPosition < 137){
      this.cc=''
      this.positiondata = 'relative'
      this.topdata = '5vh'
      return
    }
  }
  },
  computed:{
    ...mapGetters(['token']),
    ...mapGetters(['isloggedin'])
  },
  created(){
    this.logout()
  },
mounted(){
  window.addEventListener('scroll', this.onScroll)
},
beforeDestroy () {
  window.removeEventListener('scroll', this.onScroll)
}
}
  
</script>

<style>
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  
}
 
.di{
  width: 100%
  
}
.width{
  width: 100%
}
.imgsize{
  height: 50px;
  align-self: initial;
}
.screenimage{
  background-image: url("./assets/background.png");
  background-repeat: repeat-y;
  background-size: 100rem;
  background-attachment: fixed;
  
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
  color: rgb(255, 255, 255);
}
.marginleft{
  margin-left: auto;
}
.nav .active .navbar-light{
  color: black;
}
.navbg{
  background-color: rgb(77, 109, 216);
  z-index: 9999;
}


  

</style>
