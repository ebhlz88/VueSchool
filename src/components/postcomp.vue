<template>
    <div>
        <h2>Add a new Student</h2>
        <b-form @submit.prevent="submitData" method="POST" class="container">
            <b-form-group id="sname" 
            label="Student Name" label-for="sname" 
            class="formgroup" label-align="left" ></b-form-group>
                <b-form-input id="sntxtbox" v-model="posts.s_name" placeholder="Enter Student name" 
                required></b-form-input>
            <b-form-group id="sfname" label="Father's Name" label-for="sfname" label-align="left" class="formgroup"></b-form-group>
                <b-form-input id="fntxtbox" v-model="posts.s_fname" placeholder="Enter Student's Father name" 
                required></b-form-input>
                <b-form-group id="sex" label="Sex" label-for="sex" label-align="left" class="formgroup"></b-form-group>
              <b-form-radio-group
                    class="floatr"
                    v-model="posts.sex"
                    :options="sexoptions"
                    name="plain-stacked"
                    plain
                ></b-form-radio-group><br>

            <b-form-group id="dob" label="Date of Birth" label-for="dob" label-align="left" class="formgroup"></b-form-group>
               <b-input-group class="mb-3">
       
      <b-form-input
        id="example-input"
        v-model="posts.dob"
        type="text"
        placeholder="YYYY-MM-DD"
        autocomplete="off"
      ></b-form-input>
      <b-input-group-append>
        <b-form-datepicker
          v-model="posts.dob"
          locale="en-US"
          aria-controls="example-input"
          button-only
          right
          :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }"
        ></b-form-datepicker>
      </b-input-group-append>
    </b-input-group>
            
            <b-form-group id="mobile" label="Student Contact Number" label-align="left" label-for="mobile" class="formgroup"></b-form-group>
                <b-form-input id="mtxtbox" v-model="posts.m_number" placeholder="Enter Student's Contact Number" 
                ></b-form-input>
            

            <b-form-group id="fmobile" label="Father or guardian Mobile Number" label-align="left" label-for="fmobile" class="formgroup"></b-form-group>
                <b-form-input id="fmobiletxtbox" v-model="posts.fm_number" placeholder="Enter Father or Guardian mobile Number" 
                ></b-form-input>
            <b-form-group id="email" label="Student Email address" label-align="left" label-for="email" class="formgroup"></b-form-group>
                <b-form-input id="emailtxtbox" v-model="posts.s_email" placeholder="Enter Student's email address" 
                ></b-form-input>
            <b-form-group id="address" label="Student's address" label-align="left" label-for="address" class="formgroup"></b-form-group>
                <b-form-input id="addresstxtbox" v-model="posts.address" placeholder="Enter Student's address" 
                ></b-form-input>
                
                <b-form-group id="doj" label="Date of Joining" label-align="left" 
                label-for="doj" class="formgroup"
                ></b-form-group>
                <b-input-group class="mb-3">
                <b-form-input type="text" id="dojtxt" placeholder="DD-MM-YY" v-model="posts.date_join" 
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
                    <p>{{posts.sex}}</p>
                   
                
    </div>
</template>
<script>
//import Vue from 'vue';
//import VueAxios from 'vue-axios'
import  axios from 'axios'

//Vue.use(VueAxios,axios)
export default {
    name:'postcomp',
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
            ]
            
        }
    },
methods:{
    submitData(){
        //this.posts=qs.stringify(this.posts)
        axios.post('http://127.0.0.1:8000', this.posts).then((response)=>{
            console.warn(response)
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
</style>