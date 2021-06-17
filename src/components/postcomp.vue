<template>
    <div v-if="isloggedin" class="width solid">
        <h2>Add a new Student</h2>
        <b-form @submit.prevent="submitData" method="POST" class="container">
            <b-form-group id="sname" 
            label="Student Name" label-for="sname" 
            class="formgroup" label-align="left" ></b-form-group>
                <b-form-input id="sntxtbox" v-model="posts.s_name" placeholder="Enter Student name" class="input"
                required></b-form-input>
            <b-form-group id="sfname" label="Father's Name" label-for="sfname" label-align="left" class="formgroup"></b-form-group>
                <b-form-input id="fntxtbox" v-model="posts.s_fname" placeholder="Enter Student's Father name"  class="input"
                required></b-form-input>
                <div>
                <b-form-group id="sex" label="Sex" label-for="sex" label-align="left" class="formgroup"></b-form-group>
              <b-form-radio-group
                    class="floatr input"
                    v-model="posts.sex"
                    :options="sexoptions"
                ></b-form-radio-group></div><br>
            <div>
            <!-- <b-form-group id="dob" label="Date of Birth" label-for="dob" label-align="left" class="formgroup"></b-form-group> -->
        <label for="dob" class="marginright">Date of Birth</label>
        <b-input-group class="mb-3">
      <b-form-input
        id="dob"
        v-model="posts.dob"
        type="text"
         class="input"
        placeholder="YYYY-MM-DD"
        autocomplete="off"
      ></b-form-input>
      <b-input-group-append>
        <b-form-datepicker
          v-model="posts.dob"
          locale="en-US"
           class="input"
          aria-controls="example-input"
          button-only
          right
          :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }"
        ></b-form-datepicker>
      </b-input-group-append>
    </b-input-group>
    </div>
            
            <b-form-group id="mobile" label="Student Contact Number" label-align="left" label-for="mobile" class="formgroup"></b-form-group>
                <b-form-input id="mtxtbox" v-model="posts.m_number" placeholder="Enter Student's Contact Number"  class="input"
                ></b-form-input>
            

            <b-form-group id="fmobile" label="Father or guardian Mobile Number" label-align="left" label-for="fmobile" class="formgroup"></b-form-group>
                <b-form-input id="fmobiletxtbox"  class="input" v-model="posts.fm_number" placeholder="Enter Father or Guardian mobile Number" 
                ></b-form-input>
            <b-form-group id="email" label="Student Email address" label-align="left" label-for="email" class="formgroup"></b-form-group>
                <b-form-input id="emailtxtbox"  class="input" v-model="posts.s_email" placeholder="Enter Student's email address" 
                ></b-form-input>
            <b-form-group id="address" label="Student's address" label-align="left" label-for="address" class="formgroup"></b-form-group>
                <b-form-input id="addresstxtbox"  class="input" v-model="posts.address" placeholder="Enter Student's address" 
                ></b-form-input>
                
                <b-form-group id="doj" label="Date of Joining" label-align="left" 
                label-for="doj" class="formgroup"
                ></b-form-group>
                <b-input-group class="mb-3">
                <b-form-input type="text" id="dojtxt"  class="input" placeholder="DD-MM-YY" v-model="posts.date_join" 
                autocomplete="off">
                </b-form-input>
            <b-input-group-append>
                <b-form-datepicker v-model="posts.date_join" placeholder="Enter Students joining date" 
                aria-controls="dojtxt" button-only right today-button reset-button 
                close-button locale="en-US"
                ></b-form-datepicker>
                </b-input-group-append>
                </b-input-group>
             <b-form-group id="c_position" label="Is currently enrolled" label-align="left" label-for="c_position" class="formgroup"></b-form-group>
                <b-form-checkbox v-model="posts.c_position" name="enrolled"  switch>
                    Is enrolled
                </b-form-checkbox>
                <b-button class="formgroup" type="submit" variant="success">Add Student</b-button>
                    </b-form>
                <!-- <button v-on:click="hh">button</button>

                    {{this.token}} -->
               
                
    </div>
</template>
<script>
//import Vue from 'vue';
//import VueAxios from 'vue-axios'
import  axios from 'axios'
import {mapGetters} from 'vuex'

//Vue.use(VueAxios,axios)
export default {
    name:'postcomp',
    props:{
        name:{
            type:String,
            default:'emad'
        }
    },
  computed:{
    ...mapGetters(['token']),
    ...mapGetters(['isloggedin'])
  },
    data(){
        return{
            posts:{
                s_name:null,
                s_fname:null,
                dob:null,
                m_number:null,
                s_email:null,
                date_join:null,
                c_position:true,
                address:null,
                fm_number:null,
                sex:null
            },
            sexoptions:[
                {text:'Male', value:'True'},
                {text:'Female', value:'False'}
            ],
            
            
        }
    },
methods:{
    
    submitData(){
        
        //this.posts=qs.stringify(this.posts)
        var axiosConfig = {
        headers: {
            'Authorization': 'Token ' + this.token
            }
        };
        axios.post('http://127.0.0.1:8000', this.posts,axiosConfig).then((response)=>{
            console.log(response)
            console.log(axiosConfig)
            
            // this.smessage="Succesfully added"
            this.$bvToast.toast('Succesfully added',{title:'Succesful',
             variant: 'success',solid:true,toaster:'b-toaster-top-center',
            })

        })
        .catch((error) => console.log( error.response.request._response,
        this.$bvToast.toast('Make sure all fields are filled or pass Null value',{title:' Failed to Add',
             variant: 'danger',solid:true,toaster:'b-toaster-top-center',
            }) ) );
        //})
    
    },
    
    //  created() {
    //     let token =TokenService.getToken();
   
    //     } 
},

    
}
</script>
<style scoped>

.bt{
    border-radius: 8px;
    background-color: rgb(70, 70, 199);
}
.form{
    margin-left: 400px;
    margin-right: 400px;
}
.formgroup{
    margin-top: 18px;
}
.floatr{
    float:left
}
.input{
    border-radius: 6rem;
    height: 3rem;
}
.width{
    width: 45rem;
    margin: auto;
    
}
.solid {
    margin-top: 3vh;
border-style: solid;
border-radius: 3rem;
padding: 2rem;
background-color: rgba(39, 36, 36, 0.596);
color: rgb(255, 255, 255);}
.marginright{
    margin-right: 80%;
}
</style>