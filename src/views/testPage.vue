<template lang="html">
  <div id="graph-container">


  </div>
</template>

<script>
import { log } from 'util';
import cube from '../timeCheck'
import calcDiffOfDates from '../calcDiffOfDates'

export default {
  data(){
    return {
      sDate:null,
      eDate:null,
      diffDate:null
    }
  },
  created(){
    this.sDate = cube()
    console.log(this.sDate);
    
    // console.log(`sDate : ${this.sDate.hour}:${this.sDate.min}:${this.sDate.second}`)    
  },

  destroyed(){
    console.log('destroy');
    this.eDate = cube()
    // console.log(`eDate : ${this.eDate.hour}:${this.eDate.min}:${this.eDate.second}`)
    // console.log(this.eDate);
    

    this.diffDate = calcDiffOfDates(this.sDate, this.eDate)
    console.log(this.diffDate);
    
    // console.log(this.diffDate);
    
  }

}
</script>

<style lang="css" scoped>
</style>
