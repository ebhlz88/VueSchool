<template>
    <div v-if="isloggedin">
<div>
  <b-button v-on:click="backhome" class="container margintop" block variant="primary">Back to Home</b-button>
</div>
<div v-if="list">
<div class="tabletop">
  <h2 class="textalign">Student list</h2>
  </div>
  <div class="tablebottom " v-if="list">
    <table class="container textcolor">
        <tr class="height ">
            <td><b class="textcolor">Roll No.</b></td>
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
            <td>{{item.rollnbr}}</td>
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
        }
    },
    props:{
        searchitem:{
            type:String,
            default: ''
        }
    },
    mounted(){
        Vue.axios.get('http://127.0.0.1:8000/search/?search='+this.searchitem)
            .then(resp=>{
             this.list=resp.data
             
            console.log(resp.data)
        })
     Vue.axios.get('http://127.0.0.1:8000/')
         .then(resp=>{
             this.list=resp.data
             
            console.log(resp.data)
        })
     },
    methods:{
        backhome(){
            this.$router.push('/')
        },
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