<template>
<div>
     <h1 class="col">name name name name</h1>
    <h2 v-if="show">{{data}}{{msg}}</h2>
    <table>
        <tr>
            <td>id</td>
            <td>name</td>
            
        </tr>
         <tr v-for="user in users" :key="user.id">
            <td>{{user.id}}</td>
            <td>{{user.name}}</td>
            
        </tr>
    </table>
    <h4>{{hh}}</h4>
    <belowtable h="this is my data in h variable" />
    <button v-bind:disabled="disable" v-on:click="display">this is button</button>
</div>
</template>

<script>
import belowtable from './belowtable.vue'
export default {
    name: 'home',
    components:{
        belowtable
    },
    props:{
        data: String,
        msg: String
        
    }, methods:{
        hello(data){
            alert(data)
        },
        display(){
            this.show=!this.show
        }
    },data(){
            return {show:true,
                users:[
                    {id:1,name:'emad'},
                    {id:2,name:'baloch'},
                    {id:3,name:'barkat'},
                ],
                hh:"this is data in hh",
                disable:false
            }
    }
}
</script>
<style scoped>
.col{
    color:blue
}
</style>