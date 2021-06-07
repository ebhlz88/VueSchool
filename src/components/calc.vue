<template>
<div>

<h1>this is data{{monthssum.jansum}}</h1>
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



Vue.use(VueAxios,axios)
export default {
    name: 'studentslist',
    data(){
        return{
            year: null,
            monthssum : undefined,
        }
    },
    mounted(){
         Vue.axios.get('http://127.0.0.1:8000/calc/2021')
         .then(resp=>{
             this.monthssum = resp.data
             
             
            console.log(resp.data)
        })
    },

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

</style>