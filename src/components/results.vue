<template>
    <div>
        <div>
      <b-form @submit.prevent="postresult" inline>
        Student Roll No. :
        <b-form-input
          id="rollno"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="Enter Student Roll No."
          v-model="selectedroll"
        ></b-form-input>
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

        Amount submitted :
        <b-form-input
          id="inline-form-input-name"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="Enter marks"
          v-model="marks"
        ></b-form-input>
        <b-button variant="primary" type="submit">submit</b-button>
      </b-form>
    </div>
    <!-- student result form -->
    <div>
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
    </div>
    <!-- table for result showing -->
    <div>
      <table class="container textcolor">
        <tr class="height ">
            <td>Year</td>
            <td>Standard</td>
            <td>Subject</td>
            <td>Marks</td>
            
        </tr>
        <tr v-for="item in result" v-bind:key="item.id">
            <td>{{item.years}}</td>
            <td>{{item.standard.standardname}}</td>
            <td>{{item.subjectname.subjectname}}</td>
            <td>{{item.subjectmarks}}</td>
        </tr>
    </table>

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
    name:"results",
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
            searchroll: undefined,
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
  }, 
  methods:{
    postresult(){
      var axiosConfig = {
        headers: {
            'Authorization': 'Token ' + this.token
            }
        };
      axios.post("http://127.0.0.1:8000/postresult/"+ this.selectedroll +
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
    searchresult(){
      Vue.axios.get("http://127.0.0.1:8000/result/" + this.searchroll ).then((resp) => {
          this.result = resp.data;

          console.warn(resp.data);
        });
    }
  }
}
</script>
<style scoped>
.pad {
  margin-top: 8vh;
}

</style>
