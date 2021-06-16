<template>
    <div>
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



    </div>
</template>

<script>
import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'



Vue.use(VueAxios,axios)
export default {
    name:'selectstudentdetail',
    data(){
        return{
            list : null,
            result : undefined
        }
    },
    props:{
       
    },
    mounted(){

    Vue.axios.get("http://127.0.0.1:8000/result/" + this.searchroll ).then((resp) => {
          this.result = resp.data;

          console.warn(resp.data);
        });

    },
}
</script>

<style  >
.textalign{
    text-align: center  ;
    padding-top: 1rem;
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
.tablebottom{
    background-color: rgb(0, 0, 0,0.4);
    border-bottom-right-radius: 1rem;
    border-bottom-left-radius: 1rem ;
    position: relative;
    top:1rem;
    width: 75rem;
    height: auto;
    margin: auto;
}
.height{
    height: 4rem;
}
.textcolor{
    color: rgb(250, 250, 250)
}
</style>