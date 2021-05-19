<template>
  <div id="app">
  <div>
  <!-- Image and text -->
  <b-navbar variant="dark" type="dark">
    <b-navbar-brand href="#" class="fixed">
      <img src="./assets/dd.jpg" class="d-inline-block align-top imgsize" alt="school management"><br>
      School Management
    </b-navbar-brand>
    
  
  
  <b-nav  pills align="center">
  <!-- <b-nav class="di" pills> -->
    <b-collapse is-nav >
    <b-nav-item to="/studentslist"  exact exact-active-class="active">Students List</b-nav-item>
    <b-nav-item to="/post" exact exact-active-class="active">Add a Student</b-nav-item>
    <b-nav-item to="/delet" exact exact-active-class="active">Delete</b-nav-item>
    <b-nav-item to="/fees" exact exact-active-class="active">Fee detail</b-nav-item>
    </b-collapse>
  </b-nav>
  </b-navbar>
</div>
<router-view></router-view>
  
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
    //HelloWorld,
    //home
    // studentslist
  }
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
 
.link{
  color: aliceblue;
 }
.di{
  position: relative;
  top: 10vh;
  
}
.imgsize{
  height: 90px;
}


</style>
