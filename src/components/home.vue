<template>
    <div>
        <vue-confirm-dialog></vue-confirm-dialog>
<div class="margintop form-inline">
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
    

                
<div v-if="list">
<div class="tabletop">
  <h2 class="textalign">Student list</h2>
  </div>
  <div class="tablebottom " v-if="list">
    <table class="container textcolor">
        <tr class="height">
            <td><b class="textcolor">Roll No.</b></td>
            <td>Name</td>
            <td>Fathers Name</td>
            <td>Mobile Number</td> 
        </tr>
        
        <tr v-for="item in list" v-bind:key="item.id" class="height">
            <td>{{item.rollnbr}}</td>
            <td><a class="color" :href="hrefstudentdetail+item.s_name">{{item.s_name}}</a></td>
            <td>{{item.s_fname}}</td>
            <td>{{item.m_number}}</td>
            <td><a class="color" :href="hrefdata+item.rollnbr" >Fee Detail</a></td>
            <td><a class="color" :href="hrefdata2+item.rollnbr" >Result</a></td>
            <td><button class="astext textcolor color" v-on:click="delet(item.rollnbr)" >Delete</button></td>
            
            
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
    name:'home',
    data(){
        return{
            list : undefined,
            hrefdata : '/#/fee/',
            hrefdata2 : '/#/result/',
            hrefstudentdetail : '/#/studentdetail/',
            searchitem : null,
        
        }
    },
    mounted(){
       this.getstudentlist();
    
    },
    methods:{
        getstudentlist(){
             Vue.axios.get('http://127.0.0.1:8000/')
         .then(resp=>{
             this.list=resp.data
            
            console.log(resp.data)
        })
        },
        searchh(){
            Vue.axios.get('http://127.0.0.1:8000/search/?search='+this.searchitem)
            .then(resp=>{
             this.list=resp.data
             
            console.log(resp.data)
        })
        },
//     deletall(){
//         var axiosConfig = {
//         headers: {
//             'Authorization': 'Token ' + this.token
//             }
//         };
//    this.axios.delete('http://127.0.0.1:8000',axiosConfig).then((res)=>{
//                console.log(res) 
//             }) 

     
//     },

deletall(){
      this.$confirm(
        {
          title: 'Confirm',
          message: `Are you sure you want to delete?`,
          button: {
            no: 'No',
            yes: 'Yes'
          },
          /**
          * Callback Function
          * @param {Boolean} confirm 
          */
          callback: confirm => {
            if (confirm) {
                      var axiosConfig = {
        headers: {
            'Authorization': 'Token ' + this.token
            }
        };
   this.axios.delete('http://127.0.0.1:8000',axiosConfig).then((res)=>{
               console.log(res) 
               this.getstudentlist();
            }) 
            }
          }
        }
      )
    },


    delet(it){
        //  var axiosConfig = {
        // headers: {
        //     'Authorization': 'Token ' + this.token
        //     }
        // };
        //     this.axios.delete('http://127.0.0.1:8000/delete/'+it,axiosConfig).then((res)=>{
        //        console.log(res) 
        //     })

     this.$confirm(
        {
          title: 'Confirm',
          message: `Are you sure you want to delete?`,
          button: {
            no: 'No',
            yes: 'Yes'
          },
          /**
          * Callback Function
          * @param {Boolean} confirm 
          */
          callback: confirm => {
            if (confirm) {
             var axiosConfig = {
        headers: {
            'Authorization': 'Token ' + this.token
            }
        };
            this.axios.delete('http://127.0.0.1:8000/delete/'+it,axiosConfig).then((res)=>{
               console.log(res) 
               this.getstudentlist();
            })
            }
          }
        }
      )

    }
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