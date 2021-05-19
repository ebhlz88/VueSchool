<template>
    <div class="allig">
        
        <h1 v-bind:class="{display:this.show}" >this should be below table</h1>
        <h1 v-bind:style="{color:'blue'}" >this should be below table</h1>
        <p>{{h}}</p>
        <button v-on:click="updateh">click</button>
        <belbel />
        
    </div>
</template>
<script>
import belbel from './belbel.vue'
export default {
    name: 'belowtable',
    components: {
        belbel
    },props:{
        
        h: String
          
    },
    methods:{
        updateh()
        {
            this.h="emad"
        }
    },
    data(){
    return{
        show:true,
        }
    }

};
</script>
<style  scoped>
 .display
    {
        background-color : red
    }
.allig{
    float : left;
    background-color: rgb(95, 114, 62,0.3);
    }

</style>