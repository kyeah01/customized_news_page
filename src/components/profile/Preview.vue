<template>
  <div>
    <div v-if="drawer">
      <v-navigation-drawer
            app
            temporary
            v-model="drawer"
            right
            style="width:83vw"
      > 
      <v-btn
      flat
      @click="test2">
        X
      </v-btn>
        <section class="container630 centered">
          <h1>
            <div class="kicker">Preview</div>
            <div class="heading">Example</div>
          </h1>

         
        
        <v-btn class="green white--text" @click="test1">Save changes</v-btn>
        </section>
      </v-navigation-drawer>
    </div>
    
    <div v-else>
          <v-navigation-drawer
            app
            stateless
            v-model="drawer"
            right
          >
          </v-navigation-drawer>
    </div>
  </div>
</template>

<script>
export default {
  props : ['drawer'],
  watch: {
    drawer: function() {
      if (!this.drawer) {
        console.log(this.val)
        if (this.val) {
          this.$emit('right_drawer', 'close')
        } else {
          this.$emit('right_drawer', 'save')
        }
      }
    }
  },
  methods :{
      test1() {
        this.val = false
        this.drawer = !this.drawer
      },
      test2(){
        this.val = true
        this.drawer = !this.drawer
      },
  },
  data(){
    return{
      val: true,
      data2 : true,
      item :[
        {title : 'title1', 
          subtitle : 'subtitle1',
          checkbox : [
            {
              index : 1,
              content : "test1",
              value : true
            },
            {
              index : 2,
              content : "test2",
              value : false
            },
            {
              index : 3,
              content : "test3",
              value : false
            }
          ]
        },
          {title : 'title2', 
          subtitle : 'subtitle2',
          checkbox : [
            {
              index : 4,
              content : "test4",
              value : true
            },
            {
              index : 5,
              content : "test5",
              value : false
            }
          ]
        },
        {title : 'title3', 
          subtitle : 'subtitle4',
          checkbox : [
            {
              index : 4,
              content : "test6",
              value : false
            },
            {
              index : 5,
              content : "test7",
              value : true
            }
          ]
        }
      ]
    }
  },
    
}
</script>