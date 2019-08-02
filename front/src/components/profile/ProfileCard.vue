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
          <Markasread v-else-if="this.dir===2"
            :drawer = parentDrawer
            :markasreadarticles = markasreadarticles
            @right_drawer = "update"
            @deleteMark = "dmark"
          >
          </Markasread>
          <Intergrations v-else-if="this.dir===3"
            :drawer = parentDrawer
            @right_drawer = "update">
          </Intergrations>
          <!-- <Read v-else-if="this.dir===4"
            :drawer = parentDrawer
            @right_drawer = "update">
          </Read> -->
          <!-- <Appearance v-else-if="this.dir===5"
            :drawer = parentDrawer
            @right_drawer = "update">
          </Appearance> -->
          <UserSetting v-else
            :drawer = parentDrawer
            @right_drawer = "update">
          </UserSetting>

        </div>
        <!-- 스낵바 수정 -->
        <v-snackbar
          v-model="snackbar"
          :bottom="y === 'bottom'"
          :right="x === 'right'"
          :timeout="timeout"
        >
          {{ text }}
          <v-btn
            color="pink"
            flat
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </v-snackbar>
    </v-card>

</template>

<script>
import firebase from 'firebase'
import FirebaseService from '@/services/FirebaseService'
import 'firebase/firestore'

import General from '@/components/profile/General'
import Markasread from '@/components/profile/Markasread'
// import Intergrations from '@/components/profile/Intergrations'
// import Read from '@/components/profile/Read'
// import Appearance from '@/components/profile/Appearance'
import UserSetting from '@/components/profile/UserSetting'
import eventBus from '../../eventBus'

export default {
  props : ['title','icon','event'],
  components: {
      General,
      Markasread,
      // UserSetting,
      // Read,
      // Appearance,
      UserSetting
  },
  data(){
    return{
      parentDrawer:false,
      dir : this.event,
      // 스낵바 수정
      snackbar : false,
      y: 'bottom',
      x: 'right',
      timeout: 3000,
      text: 'Success Modify',
      navSign : false,

      markasreadarticles: null
    }
  },
  methods : {
    test(){
      this.parentDrawer = !this.parentDrawer
      eventBus.$emit("leftDrawer", !this.navSign)
      if (this.dir == 2) {
        firebase.auth().onAuthStateChanged((user) => {
        const db = firebase.firestore();
        db.collection('Userinfo').doc(user.uid).get()
          .then(doc => {
            this.markasreadarticles = doc.data().markasread
          })
          .catch((err) => {
            console.log('Error getting documents', err);
          });
        })
      }
    },
    update(info) {
      this.parentDrawer = !this.parentDrawer
      if (info === 'save') {
        this.snackbar=true
      }
    },
    dmark(){
      firebase.auth().onAuthStateChanged((user) => {
        const db = firebase.firestore();
        db.collection('Userinfo').doc(user.uid).get()
          .then(doc => {
            this.markasreadarticles = doc.data().markasread
          })
          .catch((err) => {
            console.log('Error getting documents', err);
          });
        })
    }
  }
}
</script>



