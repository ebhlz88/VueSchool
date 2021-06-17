<template>
<div>
    <div class="divsize textcolor">
        <b-form @submit.prevent="logininfo" method="POST" class="container">
            <b-form-group id="user" 
            label="Student Name" label-for="user" 
            class="formgroup" label-align="left" ></b-form-group>
                <b-form-input id="usertxtbox" v-model="userinfo.username" placeholder="Enter Student name" class="mb-2 mr-sm-2 mb-sm-0"
                required></b-form-input>
            <b-form-group id="pass" 
                label="Password" label-for="pass" 
                 label-align="left" class="margintop"></b-form-group>
                <b-form-input id="passtxtbox" v-model="userinfo.password" placeholder="Enter Password here" type="password" class="mb-2 mr-sm-2 mb-sm-0"
                required></b-form-input>
                <b-button variant="primary" type="submit"  class="float">Login</b-button>
                </b-form>
               
    </div>
  

    </div>
</template>

<script>
import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'


Vue.use(VueAxios,axios)
export default {
    name:"login",
    data(){
        return{
            userinfo :{
                username : null,
                password : null
            },
            loggedin : false
            
        }
    },  
methods:{
    logininfo(){
            
            axios.post('http://127.0.0.1:8000/login', this.userinfo).then((response)=>{
            console.log(response)
            this.loggedin = true
            this.$store.dispatch('token',response.data.token)
            this.$store.dispatch('isloggedin',this.loggedin)
            this.$router.push('/')
            // this.smessage="Succesfully added"
            this.$bvToast.toast('Succesfully added',{title:'Succesful',
             variant: 'success',solid:true,toaster:'b-toaster-top-center',
            })

        })
        .catch((error) => console.log( error.response.request._response,
        this.loggedin = false,
        this.$store.dispatch('isloggedin',this.loggedin),
        this.$bvToast.toast('Make sure all fields are filled or pass Null value',{title:' Failed to Add',
             variant: 'danger',solid:true,toaster:'b-toaster-top-center',
             
            }) ) );
        
        }
    },
}
</script>
<style >
   
    .float{
        margin-top: 3vh;
        float: right;
    }
    .divsize{
        max-width: 25rem;
        margin: auto;
        background-color: silver;
        margin-top: 5vh;
        padding: 4vh;
        border-radius: 3rem;
        min-height: 50vh;
    }
.margintop{
    margin-top: 1rem;
}
.textcolor{
    color: black;
}
</style>