<template>
    <v-card>
        <v-container>
          <v-divider color="primary"/>
          <v-layout wrap now>
            <v-flex xs4>
              <span class="grey--text">{{title}}</span>
              <v-avatar>
                <v-icon medium>{{icon}}</v-icon>
              </v-avatar>
            </v-flex>
          </v-layout>
          <v-card-actions>
             <v-btn 
              text color="green" 
              @click="test"
              >
              Detail More
            </v-btn>
          </v-card-actions>
        </v-container>
        {{event}}
        <div>
          <General v-if="this.dir===1"
            :drawer = parentDrawer
            @right_drawer = "update">
          </General>
          <Preview v-else-if="this.dir===2"
            :drawer = parentDrawer
            @right_drawer = "update">
          </Preview><!--
          <Intergrations v-else-if="this.dir===3"
            :drawer = parentDrawer
            @right_drawer = "update">
          </Intergrations>
          <Read v-else-if="this.dir===4"
            :drawer = parentDrawer
            @right_drawer = "update">
          </Read>
          <Appearance v-else-if="this.dir===5"
            :drawer = parentDrawer
            @right_drawer = "update">
          </Appearance> -->
          <UserSetting v-else
            :drawer = parentDrawer
            @right_drawer = "update">
          </UserSetting>

        </div>
    </v-card>

</template>

<script>
import General from '@/components/profile/General'
import Preview from '@/components/profile/Preview'
// import Intergrations from '@/components/profile/Intergrations'
// import Read from '@/components/profile/Read'
// import Appearance from '@/components/profile/Appearance'
import UserSetting from '@/components/profile/UserSetting'
export default {
  props : ['title','icon','event'],
  components: {
      General,
      Preview,
      // UserSetting,
      // Read,
      // Appearance,
      UserSetting
  },
  data(){
    return{
      parentDrawer:false,
      dir : this.event
    }
  },
  methods : {
    test(){
      this.update()
    },
    update(){
      this.parentDrawer = !this.parentDrawer
    }
  }
}
</script>



