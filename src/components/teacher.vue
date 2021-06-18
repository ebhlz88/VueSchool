<template>
    <div>
        <!-- <button v-on:click="teacherlist">teacherlist</button> -->
<!-- <div class="margintop form-inline">
         <b-form @submit.prevent="searchh" method="POST" class="form-inline">
                <label for="searchh">Search Student</label>
                <b-form-input id="searchh" class=" mx-sm-3 mb-2" v-model="searchitem" placeholder="Search Student here" 
                required></b-form-input>
                <b-input-group-append>
                <b-button class="formgroup mb-2" type="submit" variant="primary">Search</b-button>
                </b-input-group-append>
                
                </b-form>
                <div class="formdiv"><b-button type="button" variant="danger" v-on:click="deletall">Delete all</b-button></div>
                </div>
     -->

                
<div >
<div class="tabletop">
  <h2 class="textalign">Student list</h2>
  </div>
  <div class="tablebottom ">
    <table class="container textcolor">
        <tr class="height">
            <td><b class="textcolor">Roll No.</b></td>
            <td>Name</td>
            <td>Fathers Name</td>
            <td>Mobile Number</td> 
        </tr>
        
        <tr v-for="item in list" v-bind:key="item.id" class="height">
            <td>{{item.id}}</td>
            <td>{{item.t_name}}</td>
            <td>{{item.t_fname}}</td>
            <td>{{item.m_number}}</td>
            <td><a :href="hrefdata+item.id">Paymnet Detail</a></td>
            
            
        </tr>
    </table> 
    </div> 
</div>
</div>
</template>


<script>
import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'


import {mapGetters} from 'vuex'
Vue.use(VueAxios,axios)
export default {
    name:'teacher',
    data(){
        return{
            list : undefined,
            hrefdata:"/#/tsearch/"
        
        }
    },
    mounted(){
           Vue.axios.get("http://127.0.0.1:8000/teacher").then((resp) => {
          this.list = resp.data;

          console.warn(resp.data);
        });
    },
    computed:{
    ...mapGetters(['isloggedin']),
    ...mapGetters(['token'])
  },
}
</script>



<style scoped>
.astext {
    background:none;
    border:none;
    margin:0;
    padding:0;
    cursor: pointer;
    color: aliceblue;
}
button:hover{
    text-decoration: underline;
    color: rgb(107, 104, 104);
}
.tablebottom{
    background-color: rgba(255, 255, 255, 0.774);
    border-bottom-right-radius: 1rem;
    border-bottom-left-radius: 1rem ;
    position: relative;
    top: 1rem;
    width: 75rem;
    height: auto;
    margin: auto;
}
.textalign{
    text-align: center  ;
    color: white;
    position: relative;
    top: 1.5rem;
}
.tabletop{
    background-color: #385743;
    border-top-right-radius: 2rem;
    border-top-left-radius: 2rem ;
    position: relative;
    top: 1rem;
    width: 75rem;
    height: 5rem;
    align-self: center;
    margin: auto;
}
.textcolor{
    color: rgb(0, 0, 0)
}
.height{
    height: 4rem;
}
.outline{
    border-color: bisque;
}
.margintop{
    margin-top: 2rem;
    margin-left: 7rem;
}
a{
    color:rgb(0, 0, 0)
}
a:hover{
    text-decoration: underline;
    color: rgb(107, 104, 104);
}
.formdiv{
   margin-left: 34rem;
}
.color{
    color: rgba(1, 41, 202, 0.993);
}

</style>