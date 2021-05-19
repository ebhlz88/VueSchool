<template>
    <div class="posit">
    <h1>Students Detail</h1>
    <table class="table table-bordered">
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
    </table>
    <!-- <button @submit="getData" method>Get Data</button> -->
   
    </div>
</template>

<script>
import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'



Vue.use(VueAxios,axios)

export default {
    name: 'studentslist',
    data(){
        return{
            list : undefined,
            
        }
    },
    mounted(){
         Vue.axios.get('http://127.0.0.1:8000/')
         .then(resp=>{
             this.list=resp.data
             
            console.warn(resp.data)
        })
    }
}
</script>
<style scoped>
/* .posit{
    position: relative;
    top: 110px;
} */

</style>