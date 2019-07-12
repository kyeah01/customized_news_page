<template>
  <v-container fluid :grid-list-md="!$vuetify.breakpoint.xs">
    <v-layout wrap row>
      <!-- 상위 대쉬보드 4개 -->
      <v-flex xs12 sm6 md3 v-for="i in 4" class="pb-2">
        <v-card>
        <v-container>
          <v-layout wrap now>
            <v-flex xs7>
              <v-card-title primary-title>
                <div>
                  <div class="grey--text">전체 사용자</div>
                  <h3 class="headline">334</h3>
                </div>
              </v-card-title>
            </v-flex>
            <v-flex xs5>
              <v-avatar>
                <v-icon medium>person</v-icon>
              </v-avatar>
            </v-flex>
          </v-layout>
          <v-divider/>
          <v-card-actions>
            <v-icon small color="">update</v-icon>
            <span class="grey--text">&nbsp;5분전</span>
          </v-card-actions>
        </v-container>
        </v-card>
      </v-flex>

      <!-- 중간 대쉬보드 -->
      <v-flex xs12 sm4 v-for="i in 3" class="pb-2">
        <v-card>
          <v-card-title class="grey--text">example</v-card-title>
          <v-card-text>
          <trend
            :data="[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]"
            :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
            auto-draw
            smooth
          >
          </trend>
          </v-card-text>
        </v-card>
      </v-flex>

      <!-- 3-1 대쉬보드 -->
      <v-flex xs12 sm6 class="pb-2">
        <UserLogCard></UserLogCard>
      </v-flex>

      <!-- 3-2 대쉬보드 -->
      <v-flex xs12 sm6 class="pb-2">
        <v-card height="350px">
            <v-container fluid grid-list-md>
    <v-data-iterator
      :items="items"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      content-tag="v-layout"
      hide-actions
      row
      wrap
    >
      <template v-slot:header>
        <v-toolbar
          class="mb-2"
          color="indigo darken-5"
          dark
          flat
        >
          <v-toolbar-title>This is a header</v-toolbar-title>
        </v-toolbar>
      </template>
      <template v-slot:item="props">
        <v-flex
          xs12
          sm6
          md4
          lg3
        >
          <v-card>
            <v-card-title class="subheading font-weight-bold">{{ props.item.name }}</v-card-title>

            <v-divider></v-divider>

            <v-list dense>
              <v-list-tile>
                <v-list-tile-content>Calories:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.calories }}</v-list-tile-content>
              </v-list-tile>

              <v-list-tile>
                <v-list-tile-content>Fat:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.fat }}</v-list-tile-content>
              </v-list-tile>

              <v-list-tile>
                <v-list-tile-content>Carbs:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.carbs }}</v-list-tile-content>
              </v-list-tile>

              <v-list-tile>
                <v-list-tile-content>Protein:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.protein }}</v-list-tile-content>
              </v-list-tile>

              <v-list-tile>
                <v-list-tile-content>Sodium:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.sodium }}</v-list-tile-content>
              </v-list-tile>

              <v-list-tile>
                <v-list-tile-content>Calcium:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.calcium }}</v-list-tile-content>
              </v-list-tile>

              <v-list-tile>
                <v-list-tile-content>Iron:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.iron }}</v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </template>
    </v-data-iterator>
  </v-container>

        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import UserLogCard from '@/components/admin/UserLogCard'

//user log
import timeCheck from '../timeCheck'
import userLog from '../userLog'

export default {
  components : {
    UserLogCard
  },
  data: () => ({
    headers: [
      {
        sortable: false,
        text: '아이디',
        value: 'id'
      },
      {
        sortable: false,
        text: '작업내용',
        value: 'work'
      },
      {
        sortable: false,
        text: '작업시간',
        value: 'city'
      }
    ],

    userId : '',

    infos: [
      {
        id : 'hojin',
        content : 'login page',
        date : '2019-07-09'
      },
            {
        id : 'hojin2',
        content : 'login22 page',
        date : '2019-07-10'
      }
    ],

    sDate : null,
    eDate : null,
    path : '/article'
      
  }),
  methods : {

    search(){
      this.$firebase.collection('user').add({

      })
        
    }
  },
  created (){
    //user log
    this.sDate= timeCheck()
   },
  destroyed(){
    //user log
    this.eDate= timeCheck()
    var user=firebase.auth().currentUser
    userLog(user, this.path, this.sDate, this.eDate)

  }
}
</script>

