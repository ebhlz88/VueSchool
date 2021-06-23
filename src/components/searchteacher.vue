<template>
  <div >
    <button v-on:click="back" type="button" v-if="list" class="btn btn-primary btn-lg btn-block container margintop">Back</button>
    <!-- <b-button v-on:click="showfees" primary>Fee list</b-button> -->
    <!-- <div v-if="!list">
      <b-form method="GET" @submit.prevent="postnam" inline>
        Name (by id needed):
        <b-form-input
          id="name"
          placeholder="Enter Teacher's name"
          v-model="roll"
        ></b-form-input>
        <b-select
          split
          split-variant="outline-primary"
          variant="primary"
          text="Select the year"
          class="m-2"
          v-model="tyear"
          >Select Year
          <b-select-option
            v-for="items in year"
            v-bind:key="items.year"
            v-bind:value="items.year"
            >{{ items.year }}</b-select-option
          >
        </b-select>
        <b-button variant="primary" type="submit">Search</b-button>
      </b-form>
    </div> -->
   
    <div v-if="list">
      <div class="tabletop textalign"><h3>Teacher Payment Detail</h3> </div>
      <div class="tablebottom">
      <table class="table table-bordered">
        <tr class="textcolor">
          <td>Year</td>
          <td>january</td>
          <td>february</td>
          <td>march</td>
          <td>april</td>
          <td>may</td>
          <td>june</td>
          <td>july</td>
          <td>august</td>
          <td>september</td>
          <td>october</td>
          <td>november</td>
          <td>december</td>
        </tr>
        <tr v-for="item in list" v-bind:key="item.id" class="height textcolor">
          <td>{{ item.years }}</td>
          <td>{{ item.january }}</td>
          <td>{{ item.february }}</td>
          <td>{{ item.march }}</td>
          <td>{{ item.april }}</td>
          <td>{{ item.may }}</td>
          <td>{{ item.june }}</td>
          <td>{{ item.july }}</td>
          <td>{{ item.august }}</td>
          <td>{{ item.september }}</td>
          <td>{{ item.october }}</td>
          <td>{{ item.november }}</td>
          <td>{{ item.december }}</td>
        </tr>
      </table>
      </div>
    </div>
     <div class="container">
      <b-form @submit.prevent="updatefees" inline>
        <b-select
          split
          split-variant="outline-primary"
          variant="primary"
          text="Select the year"
          class="m-2"
          v-model="updateyear"
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
          text="Select month"
          class="m-2"
          v-model="selectedmonth"
        >
          <option
            v-for="(items, key) in months"
            :key="key"
            :value="items.monthh"
          >
            {{ items.monthh }}
          </option>
        </b-select>

        <label  for="amount"
          >Amount submitted</label
        >
        <b-form-input
          id="amount"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="Enter amount"
          v-model="updateamount"
        ></b-form-input>
        <b-button variant="primary" type="submit">submit</b-button>
      </b-form>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import VueAxios from "vue-axios";
import axios from "axios";

import {mapGetters} from 'vuex'
Vue.use(VueAxios, axios);
export default {
  name: "fees",
  computed:{
    ...mapGetters(['token']),
    ...mapGetters(['isloggedin'])
  },
  props:{
    roll:{
      type:String,
      default:NaN
    }
  },

  data() {
    return {
      list: undefined,
      year: undefined,
      tyear: null,
      updateyear: null,
      selectedmonth: null,
      updateamount: null,
      months: [
        { monthh: "january" },
        { monthh: "february" },
        { monthh: "march" },
        { monthh: "april" },
        { monthh: "may" },
        { monthh: "june" },
        { monthh: "july" },
        { monthh: "august" },
        { monthh: "september" },
        { monthh: "october" },
        { monthh: "november" },
        { monthh: "december" },
      ],
    };
  },
  mounted() {
    Vue.axios.get("http://127.0.0.1:8000/year").then((resp) => {
      this.year = resp.data;

      console.log(resp.data);
    });
    this.getpayments();
  
  },
  methods: {
  getpayments(){
     Vue.axios
        .get("http://127.0.0.1:8000/tpayment/" + this.roll)
        .then((resp) => {
          this.list = resp.data;

          console.log(resp.data);
        });
  },
    back(){
    this.$router.push('/teacherlist')
},
    updatefees() {
      var axiosConfig = {
        headers: {
            'Authorization': 'Token ' + this.token
            }
        };
      axios
        .post(
          "http://127.0.0.1:8000/tupdate/" +
            this.updateyear +
            "/" +
            this.roll,
          "{" +
            '"' +
            this.selectedmonth +
            '"' +
            ":" +
            ' "' +
            this.updateamount +
            '"' +
            "}",axiosConfig
        )
        .then((response) => {
          console.log(response);
          this.getpayments();
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
  },
};
</script>
<style scoped>
.pad {
  margin-top: 10vh;
}
.tablebottom{
    background-color: rgba(0, 0, 0, 0.76);
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
