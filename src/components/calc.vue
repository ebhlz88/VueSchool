<template>
<div >
<div>
    <b-form @submit.prevent="search" class="form-inline">
    <b-form-select
          split
          split-variant="outline-primary"
          variant="primary"
          text="Select the year"
          class="m-2"
          v-model="selectedyear"
        >
          <b-form-select-option disabled>Please select an Year</b-form-select-option>
          <b-form-select-option
            v-for="items in year"
            :key="items.year"
            :value="items.year"
            >{{ items.year }}</b-form-select-option
          >
        </b-form-select>
        <b-button variant="primary" type="submit">search</b-button>
    </b-form>
    </div>
 <div id="chart" class="chartdiv">
        <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
      </div>
      
      
<!-- <div class="tabletop">
  <h2 class="textalign">Student Info</h2>
  </div>
<div class="tablebottom divmargin container" >
<img src="./photo.jpg" class="d-inline-block align-top imgsize" alt="schoagement">
<h5 class="bphototext">Emad baloch</h5>
<p class="infodiv">this i s text</p>
  </div> -->

</div>
</template>
<script>
import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'

import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)

Vue.use(VueAxios,axios)
export default {
    name: 'studentslist',
    components:{
        apexchart: VueApexCharts,
    },
    data(){
        return{
            year: null,
            monthssum : undefined,
            selectedyear : 0,
            teacherpayment : null,
            series: [
            {
              name: "collected",
              data: [0, 0, 0, 0, 0, 0,0,0,0,0,0,0]
            },
            {
              name: "payed",
              data: [0, 0, 0, 0, 0, 0,0,0,0,0,0,0]
            }
          ],
          chartOptions: {
            chart: {
              height: 350,
              type: 'line',
              dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2
              },
              toolbar: {
                show: true
              }
            },
            colors: ['#77B6EA', '#545454'],
            dataLabels: {
              enabled: true,
            },
            stroke: {
              curve: 'straight'
            },
            title: {
              text: 'Money Collected & Payed for School',
              align: 'left'
            },
            grid: {
              borderColor: '#e7e7e7',
              row: {
                colors: ['#000000', '#9c9c9c'], // takes an array which will be repeated on columns
                opacity: 0.5
              },
            },
            markers: {
              size: 1
            },
            xaxis: {
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','aug','sep','oct','nov','dec',],
              title: {
                text: 'Month'
              }
            },
            yaxis: {
              title: {
                text: 'Amount'
              },
              min: this.min,
              max: this.max
            },
            legend: {
              position: 'top',
              horizontalAlign: 'right',
              floating: true,
              offsetY: -25,
              offsetX: -5
            }
          },
        }
    },
    
    methods:{
        search(){
         Vue.axios.get('http://127.0.0.1:8000/calc/'+this.selectedyear)
         .then(resp=>{
             this.monthssum = resp.data
           
             
            console.log(resp.data)
        })
        Vue.axios
        .get("http://127.0.0.1:8000/calcteacher/" + this.selectedyear)
        .then((resp) => {
          console.log(resp.data)
          this.teacherpayment = resp.data;
          //this.maxvalueee = ((Math.max(this.jansum,this.monthssum.febsum,this.monthssum.marsum,this.monthssum.aprsum,this.monthssum.maysum,this.monthssum.junsum,this.monthssum.julsum,this.monthssum.sepsum,this.monthssum.octsum,this.monthssum.novsum,this.monthssum.decsum,this.monthssum.augsum)) * 1.5  )
          this.updatechart()
        });
        
        },
    updatechart(){
                
        const newData = this.series[0].data.map(() => {
            return (this.monthssum.jansum)
            //Math.floor(Math.random() * (max - min + 1)) + min
        })
        const seconddata = this.series[0].data.map(() => {
            return (this.monthssum.febsum)
        })
        const marchdata = this.series[0].data.map(() => {
            return (this.monthssum.marsum)
        })
        const aprildata = this.series[0].data.map(() => {
            return (this.monthssum.aprsum)
        })
        const maydata = this.series[0].data.map(() => {
            return (this.monthssum.maysum)
        })
        const junedata = this.series[0].data.map(() => {
            return (this.monthssum.junsum)
        })
        const julydata = this.series[0].data.map(() => {
            return (this.monthssum.julsum)
        })
        const septemberdata = this.series[0].data.map(() => {
            return (this.monthssum.sepsum)
        })
        const octoberdata = this.series[0].data.map(() => {
            return (this.monthssum.octsum)
        })
        const novemberdata = this.series[0].data.map(() => {
            return (this.monthssum.novsum)
        })
        const decemberdata = this.series[0].data.map(() => {
            return (this.monthssum.decsum)
        })
        const augustdata = this.series[0].data.map(() => {
            return (this.monthssum.augsum)
        })
                
        const tnewData = this.series[0].data.map(() => {
            return this.teacherpayment.jansum
            //Math.floor(Math.random() * (max - min + 1)) + min
        })
        const tseconddata = this.series[0].data.map(() => {
            return this.teacherpayment.febsum
        })
        const tmarchdata = this.series[0].data.map(() => {
            return this.teacherpayment.marsum
        })
        const taprildata = this.series[0].data.map(() => {
            return this.teacherpayment.aprsum
        })
        const tmaydata = this.series[0].data.map(() => {
            return  this.teacherpayment.maysum
        })
        const tjunedata = this.series[0].data.map(() => {
            return this.teacherpayment.junsum
        })
        const tjulydata = this.series[0].data.map(() => {
            return this.teacherpayment.julsum
        })
        const tseptemberdata = this.series[0].data.map(() => {
            return this.teacherpayment.sepsum
        })
        const toctoberdata = this.series[0].data.map(() => {
            return this.teacherpayment.octsum
        })
        const tnovemberdata = this.series[0].data.map(() => {
            return this.teacherpayment.novsum
        })
        const tdecemberdata = this.series[0].data.map(() => {
            return this.teacherpayment.decsum
        })
        const taugustdata = this.series[0].data.map(() => {
            return this.teacherpayment.augsum
        })

        console.log(newData)


        this.series = [{
            data: [String(newData),seconddata,marchdata,aprildata,maydata,junedata,julydata,augustdata,septemberdata,octoberdata,novemberdata,decemberdata]
            //data: [String(newData),seconddata,marchdata,aprildata,maydata,junedata,julydata,augustdata,septemberdata,octoberdata,novemberdata,decemberdata]
            },{
            data: [String(tnewData),tseconddata,tmarchdata,taprildata,tmaydata,tjunedata,tjulydata,taugustdata,tseptemberdata,toctoberdata,tnovemberdata,tdecemberdata]
        }]
    }
},
    mounted(){
        Vue.axios.get("http://127.0.0.1:8000/year").then((resp) => {
      this.year = resp.data;

      console.log(resp.data);
    });
    }

}
</script>
<style scoped>
.pad {
  margin-top: 10vh;
}
.btn{
    background-color: rgb(49, 36, 53);
    border-radius: 4rem;
    background-clip: border-box;
}
.tabletop{
    background-color: #385743;
    border-top-right-radius: 2rem;
    border-top-left-radius: 2rem ;
    position: relative;
    top: 13vh;
    width: 60rem;
    height: 5rem;
    align-self: center;
    margin: auto;
}
.tablebottom{
    background-color: rgb(0, 0, 0,0.4);
    border-bottom-right-radius: 2rem;
    border-bottom-left-radius: 2rem ;
    position: relative;
    top: 5rem;
    width: 60rem;
    height: 50rem;
    margin: auto;
}
.textalign{
    text-align: center  ;
    color: white;
    position: relative;
    top: 1.5rem;
}
img{
    margin-left: 20px;
    margin-top: 20px;
width: 12rem;
height: auto;
}
.divmargin{
    padding : 20px;
}
.bphototext{
    color: white;
    margin-top: 8px;
    margin-left: 50px;
}
.infodiv{
    position: absolute;
    left: 15rem;

}
.chartdiv{
padding: 2rem;
background-color: rgba(255, 255, 255, 0.877);
color: black;
}

</style>