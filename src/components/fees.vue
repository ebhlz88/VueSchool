<template>
  <div>
    <h1 >student fee detail</h1>
    <div>
      <b-form method="GET" @submit.prevent="postnam" inline>
        Name (by id needed):
        <b-form-input
          id="name"
          placeholder="Enter name"
          v-model="nam"
        ></b-form-input>
        <b-select
          split
          split-variant="outline-primary"
          variant="primary"
          text="Select the year"
          class="m-2"
          v-model="yerr"
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
    </div>
    <div>
      <b-form @submit.prevent="updatefees" inline>
        <label class="sr-only" for="inline-form-input-name"
          >Name of the student</label
        >
        Roll No :
        <b-form-input
          id="updatename"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="Enter Roll No."
          v-model="updateroll"
        ></b-form-input>
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

        <label class="sr-only" for="inline-form-input-name"
          >Amount submitted</label
        >
        Amount submitted :
        <b-form-input
          id="inline-form-input-name"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="Enter amount"
          v-model="updateamount"
        ></b-form-input>
        <b-button variant="primary" type="submit">submit</b-button>
      </b-form>
    </div>
    <div>
      <table v-if=showfees class="table table-bordered">
        <tr>
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
        <tr v-for="item in list" v-bind:key="item.id">
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
  
  },
  data() {
    return {
      list: undefined,
      year: undefined,
      nam: null,
      showfees: false,
      yerr: null,
      updateyear: null,
      updateroll: null,
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

      console.warn(resp.data);
    });
  },
  methods: {
    postnam() {
      this.showfees = !this.showfees
      Vue.axios
        .get("http://127.0.0.1:8000/months/" + this.nam )
        .then((resp) => {
          this.list = resp.data;

          console.warn(resp.data);
        });
    },
    updatefees() {
      var axiosConfig = {
        headers: {
            'Authorization': 'Token ' + this.token
            }
        };
      
      axios
        .post(
          "http://127.0.0.1:8000/paymonth/" +
            this.updateroll +
            "/" +
            this.updateyear,
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
  },
};
</script>
<style scoped>
.pad {
  margin-top: 10vh;
}

</style>
