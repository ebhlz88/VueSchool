<template>
    <div v-if="isloggedin">
    <div class="container margintop">
    <button v-on:click="generate" v-if="!list" type="button" class="btn btn-primary btn-lg btn-block">Generate Student List</button>
    <button v-on:click="back" type="button" v-if="list" class="btn btn-primary btn-lg btn-block">Back</button>
</div>

<b-button v-if="!list" type="button" class="btn btn-primary btn-lg btn-block container margintop" variant="danger" v-on:click="deletall">Delete all</b-button>

<div class="container margintop" v-if="!list">
        <b-form @submit.prevent="submitid" method="POST" class="form-inline mx-sm-3 mb-2">
                <label for="droll">Enter Roll No.</label>
                <b-form-input id="droll" v-model="pk" class=" mx-sm-3 mb-2" placeholder="Enter Student roll Numebr" 
                required></b-form-input>
                <b-input-group-append>
                <b-button class="formgroup mb-2" type="submit" variant="primary">Delete</b-button>
                </b-input-group-append>
                </b-form>
                </div>


<div class="container margintop" v-if="!list">
         <b-form @submit.prevent="searchh" method="POST" class="form-inline">
                <label for="searchh">Search Student</label>
                <b-form-input id="searchh" class=" mx-sm-3 mb-2" v-model="searchitem" placeholder="Search Student here" 
                required></b-form-input>
                <b-input-group-append>
                <b-button class="formgroup mb-2" type="submit" variant="primary">Search</b-button>
                </b-input-group-append>
                
                </b-form>
                </div>



<div v-if="list">
<div class="tabletop">
  <h2 class="textalign">Student list</h2>
  </div>
  <div class="tablebottom " v-if="list">
    <table class="container textcolor">
        <tr class="height ">
            <td><b class="textcolor">ID</b></td>
            <td>Name</td>
            <td>Fathers Name</td>
            <td>Sex</td>
            <td>Mobile Number</td>
            <td class="textcolor">Father's Number</td>
            <td>DoB</td>
            <td>Email</td>
            <td>Address</td>
            <td>D of Joining</td>
            <td>current position</td>
            
        </tr>
        <tr v-for="item in list" v-bind:key="item.id" class="height">
            <td>{{item.id}}</td>
            <td>{{item.s_name}}</td>
            <td>{{item.s_fname}}</td>
            <td v-if="item.sex">Male</td>
            <td v-else>Female</td>
            <td>{{item.m_number}}</td>
            <td>{{item.fm_number}}</td>
            <td>{{item.dob}}</td>
            <td>{{item.s_email}}</td>
            <td>{{item.address}}</td>
            <td>{{item.date_join}}</td>
            <td>{{item.c_position}}</td>
            
        </tr>
    </table> 
    </div> 
</div>
    <!-- <table class="table table-bordered">
        <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Fathers Name</td>
            <td>Sex</td>
            <td>Mobile Number</td>
            <td>Father's Number</td>
            <td>DoB</td>
            <td>Email</td>
            <td>Address</td>
            <td>D of Joining</td>
            <td>current position</td>
            
        </tr>
        <tr v-for="item in list" v-bind:key="item.id">
            <td>{{item.id}}</td>
            <td>{{item.s_name}}</td>
            <td>{{item.s_fname}}</td>
            <td v-if="item.sex">Male</td>
            <td v-else>Female</td>
            <td>{{item.m_number}}</td>
            <td>{{item.fm_number}}</td>
            <td>{{item.dob}}</td>
            <td>{{item.s_email}}</td>
            <td>{{item.address}}</td>
            <td>{{item.date_join}}</td>
            <td>{{item.c_position}}</td>
            
        </tr>
    </table> -->
    <!-- <button @submit="getData" method>Get Data</button> -->
   
    </div>
</template>

<script>
import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'

import {mapGetters} from 'vuex'

Vue.use(VueAxios,axios)

export default {
    name: 'studentslist',
    data(){
        return{
            list : undefined,
            pk:null,
            searchitem:null,
            
        }
    },
    methods:{
    generate(){
         Vue.axios.get('http://127.0.0.1:8000/')
         .then(resp=>{
             this.list=resp.data
             
            console.log(resp.data)
        })
    },
    submitid(){
            var axiosConfig = {
        headers: {
            'Authorization': 'Token ' + this.token
            }
        };
            this.axios.delete('http://127.0.0.1:8000/delete/'+this.pk,axiosConfig).then((res)=>{
               console.log(res) 
            })
        },
        searchh(){
        Vue.axios.get('http://127.0.0.1:8000/search/?search='+this.searchitem)
            .then(resp=>{
             this.list=resp.data
             
            console.log(resp.data)
        })
    },
    deletall(){
        var axiosConfig = {
        headers: {
            'Authorization': 'Token ' + this.token
            }
        };
      this.axios.delete('http://127.0.0.1:8000',axiosConfig).then((res)=>{
               console.log(res) 
            })  
    },
back(){
    this.list = NaN
}
    },
computed:{
    ...mapGetters(['isloggedin'])
  },
}
</script>
<style scoped>

.tablebottom{
    background-color: rgb(0, 0, 0,0.4);
    border-bottom-right-radius: 1rem;
    border-bottom-left-radius: 1rem ;
    position: relative;
    top: 1rem;
    width: 75rem;
    height: aucto;
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
    color: rgb(250, 250, 250)
}
.height{
    height: 4rem;
}
.outline{
    border-color: bisque;
}
.margintop{
    margin-top: 2rem;
}


</style>