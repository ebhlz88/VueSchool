<template>
    <div class="container">
       <b-button v-on:click="backhome" class="container margintop" block variant="primary">Back to Home</b-button>
      <div v-if="result"> 
      <div class="tabletop textcolor textalign"><p>Student Name  : {{result[0].student.s_name}}</p>
      <p>Fathers Name  : {{result[0].student.s_fname}}</p>
      <p>Roll No.  {{result[0].student.rollnbr}}</p></div>
      <div class="tablebottom">
      <table class="container textcolor">
        <tr class="height ">
            <td>Year</td>
            <td>Standard</td>
            <td>Subject</td>
            <td>Marks</td>
            
        </tr>
        <tr v-for="item in result" v-bind:key="item.id" class="height">
            <td>{{item.years}}</td>
            <td>{{item.standard.standardname}}</td>
            <td>{{item.subjectname.subjectname}}</td>
            <td>{{item.subjectmarks}}</td>
        </tr>
    </table>
</div>  
    </div>


      <div class="container">
      <b-form @submit.prevent="postresult" inline>
        <!-- <label for="rollno">Student Roll No. :</label>
        
        <b-form-input
          id="rollno"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="Enter Student Roll No."
          v-model="searchroll"
        ></b-form-input> -->
        <b-select
          split
          split-variant="outline-primary"
          variant="primary"
          text="Select the year"
          class="m-2"
          v-model="selectedyear"
        >
          <b-select-option disabled>Select year</b-select-option>
          <b-select-option
            v-for="items in year"
            v-bind:key="items.year"
            v-bind:value="items.year"
            >{{ items.year }}</b-select-option
          >
        </b-select>
        <b-select
          split
          split-variant="outline-primary"
          variant="primary"
          text="Select standard"
          class="m-2"
          v-model="selectedstandard"
        >
          <b-select-option disabled>Select standard</b-select-option>
          <b-select-option
            v-for="(items, key) in standards"
            :key="key"
            :value="items.standardname"
          >
            {{ items.standardname }}
          </b-select-option>
        </b-select>



        <b-select
          split
          split-variant="outline-primary"
          variant="primary"
          text="Select subject"
          class="m-2"
          v-model="selectedsubject"
        >
          <b-select-option disabled>Select subject</b-select-option>
          <b-select-option
            v-for="(items, key) in subjects"
            :key="key"
            :value="items.subjectname"
          >
            {{ items.subjectname }}
          </b-select-option>
        </b-select>
       
      <label for="amount">Amount submitted :</label>
        
        <b-form-input
          id="amount"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="Enter marks"
          v-model="marks"
        ></b-form-input>
        <b-button variant="primary" type="submit">submit</b-button>
      </b-form>
    </div>
    <!-- student result form -->
    <!-- <div v-if="!result">
      <h2>Search Result here</h2>
      <b-form @submit.prevent="searchresult" inline>
        Student Roll No. :
        <b-form-input
          id="rollno"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="Enter Student Roll No."
          v-model="searchroll"
        ></b-form-input>
        <b-button variant="primary" type="submit">Search</b-button>
      </b-form>
    </div> -->
    <!-- table for result showing -->
    
    </div>
</template>
<script>
import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'

import {mapGetters} from 'vuex'

Vue.use(VueAxios,axios)
export default {
    name:"results",
  props:{
     searchroll:{
            type:String,
            default: NaN,
        }
  },
  computed:{
    ...mapGetters(['token']),
    ...mapGetters(['isloggedin'])
  },
    data(){
        return {
            year:undefined,
            subjects:undefined,
            standards : undefined,
            selectedstandard : null,
            selectedsubject : null,
            selectedyear : null,
            marks : null,
            selectedroll :null,
            result : undefined,

        }
    },
   mounted() {
    Vue.axios.get("http://127.0.0.1:8000/year").then((resp) => {
      this.year = resp.data;

      console.log(resp.data);
    });
    Vue.axios.get("http://127.0.0.1:8000/subjects").then((resp) => {
      this.subjects = resp.data;

      console.log(resp.data);
    });
    Vue.axios.get("http://127.0.0.1:8000/standards").then((resp) => {
      this.standards = resp.data;

      console.log(resp.data);
    });
    this.getresult();
  }, 
  methods:{
    backhome(){
            this.$router.push('/')
        },
    getresult(){
       Vue.axios.get("http://127.0.0.1:8000/result/" + this.searchroll ).then((resp) => {
          this.result = resp.data;

          console.warn(resp.data);
        });
    },
    postresult(){
      var axiosConfig = {
        headers: {
            'Authorization': 'Token ' + this.token
            }
        };
      axios.post("http://127.0.0.1:8000/postresult/"+ this.searchroll +
            "/" +
            this.selectedyear +
            "/" +
            this.selectedsubject +
            "/" +
            this.selectedstandard,
             "{" +
            '"subjectmarks"' +
            ":" +
            ' "' +
            this.marks +
            '"' +
            "}",axiosConfig
            ).then((response) => {
          console.warn(response);
          this.getresult();
          // this.smessage="Succesfully added"
          this.$bvToast.toast("Fees Submitted", {
            title: "Succesful",
            variant: "success",
            solid: true,
            toaster: "b-toaster-top-center",
          });
        })
        .catch((error) =>
          console.log(
            error.response.request._response,
            this.$bvToast.toast(
              "Students does not exist and Make sure all fields are filled correctly",
              {
                title: " Failed to Add",
                variant: "danger",
                solid: true,
                toaster: "b-toaster-top-center",
              }
            )
          )
        );
    },
  }
}
</script>
<style scoped>
.pad {
  margin-top: 8vh;
}
.tablebottom{
    background-color: rgb(0, 0, 0,0.4);
    border-bottom-right-radius: 1rem;
    border-bottom-left-radius: 1rem ;
    position: relative;
    
    width: 75rem;
    height: aucto;
    margin: auto;
}
.textalign{
    text-align: left  ;
    padding-left: 2rem;
}
.tabletop{
    background-color: #385743;
    border-top-right-radius: 2rem;
    border-top-left-radius: 2rem ;
    position: relative;
    top: 1rem;
    width: 75rem;
    height: auto;
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
