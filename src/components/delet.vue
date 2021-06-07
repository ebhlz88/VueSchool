<template>
    <div>
        
        <h2>Enter the id Number of row to delete</h2>
        <div>
        <b-form @submit.prevent="submitid" method="POST" class="container">
        <b-form-group id="rollnumber" 
            label="Delete Student info" label-for="rollnumber" 
            class="formgroup" label-align="left" >
                <b-form-input id="droll" v-model="pk" placeholder="Enter Student roll Numebr" 
                required></b-form-input>
                <b-input-group-append>
                <b-button class="formgroup" type="submit" variant="primary">Delete</b-button>
                </b-input-group-append>
                </b-form-group>
                </b-form>

                </div>
        <!-- <form @submit.prevent="submitid">
            <input typ="text" placeholder="id NUmber" v-model="pk"/>
            <button type="submit">delete</button>
        </form> -->
        <div class="position">
         <b-form @submit.prevent="searchh" method="POST" class="container">
        <b-form-group id="search" 
            label="Search Student info" label-for="search" 
             label-align="left" >
                <b-form-input id="searchh" v-model="searchitem" placeholder="Search Student here" 
                required></b-form-input>
                <b-input-group-append>
                <b-button class="formgroup" type="submit" variant="primary">Search</b-button>
                </b-input-group-append>
                </b-form-group>
                </b-form>
                </div>
        <!-- <form @submit.prevent="searchh">
            <input typ="text" placeholder="search" v-model="searchitem"/>
            <button type="submit">search</button>
        </form> -->
        <h5 class="floatr">this will delete all registered students</h5>
        <b-input-group-append>
        <b-button variant="danger" v-on:click="deletall">Delete all</b-button>
        </b-input-group-append>

        <table class="table table-bordered">
        <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Fathers Name</td>
            <td>DoB</td>
            <td>Mobile Number</td>
            <td>Email</td>
            <td>D of Joining</td>
            <td>current position</td>
            
        </tr>
        <tr v-for="item in list" v-bind:key="item.id">
            <td>{{item.id}}</td>
            <td>{{item.s_name}}</td>
            <td>{{item.s_fname}}</td>
            <td>{{item.dob}}</td>
            <td>{{item.m_number}}</td>
            <td>{{item.s_email}}</td>
            <td>{{item.date_join}}</td>
            <td>{{item.c_position}}</td>
            
        </tr>
    </table>

    </div>
</template>
<script>
import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'

import {mapGetters} from 'vuex'
Vue.use(VueAxios,axios)
export default {
    
    name:'delet',
    data(){
    
        return{
            pk:null,
            searchitem:null,
            list : undefined,
        }
    },
    methods:{
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
  computed:{
    ...mapGetters(['token']),
  }
}
}
</script>
<style scoped>
.floatr{
    padding-left: 8rem;
    padding-right: 3rem;
    float:left
}


</style>