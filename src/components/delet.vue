<template>
    <div>
        <h2>Enter the id Number of row to delete</h2>
        <form @submit.prevent="submitid">
            <input typ="text" placeholder="id NUmber" v-model="pk"/>
            <button type="submit">delete</button>
        </form>
        <form @submit.prevent="searchh">
            <input typ="text" placeholder="search" v-model="searchitem"/>
            <button type="submit">search</button>
        </form>
        <button v-on:click="deletall">Delete all</button>
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
            this.axios.delete('http://127.0.0.1:8000/delete/'+this.pk).then((res)=>{
               console.warn(res) 
            })
        },
        searchh(){
        Vue.axios.get('http://127.0.0.1:8000/search/?search='+this.searchitem)
            .then(resp=>{
             this.list=resp.data
             
            console.warn(resp.data)
        })
    },
    deletall(){
      this.axios.delete('http://127.0.0.1:8000').then((res)=>{
               console.warn(res) 
            })  
    }
}
}
</script>