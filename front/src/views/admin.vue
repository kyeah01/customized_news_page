<template>
  <v-container> 
    <h1>Admin Page</h1>
    <v-layout wrap>
      <v-flex xs4 sm4 md4 lg4 xl4>
        <h2>신규 가입자 수</h2>
        <NewUserGraph/>
      </v-flex>
      <v-flex xs4 sm4 md4 lg4 xl4>
        <h2>전체 사용자 방문 수</h2>
        <TotalUserGraph/>
      </v-flex>
      <v-flex xs4 sm4 md4 lg4 xl4>
        <h2>전체 방문자 수</h2>
        <TotalVisitorGraph/>
      </v-flex>
    </v-layout>

    <h2>전체 사용자 :{{ users.length }}명</h2>


    <v-layout wrap>
      <v-flex v-for="user in users" xs3 sm3 md3 lg3 xl3>
          <v-card>
            <v-avatar size="150">
              <v-img :src="user.photoURL"></v-img>
            </v-avatar>
            <v-card-title>{{ user.email }}</v-card-title>
            <v-card-text><v-btn @click="Deleteuser(user.uid)">회원탈퇴</v-btn></v-card-text>
          </v-card> 
      </v-flex>
    </v-layout>


  </v-container>
</template>

<script>
import firebase from 'firebase'
import NewUserGraph from '../components/admin/NewUserGraph'
import TotalUserGraph from '../components/admin/TotalUserGraph'
import TotalVisitorGraph from '../components/admin/TotalVisitorGraph'

export default {
  data() {
    return {
      users: [],
    }
  },
  components: {
    NewUserGraph,
    TotalUserGraph,
    TotalVisitorGraph,

  },
  created() {
    this.$http.get('/api/allusers').then(res => {
      this.users = res.data
    })
  },
  methods: {
    Deleteuser(uid) {
      this.$http.get(`/api/allusers/delete/${uid}`)
      alert('회원탈퇴시켰습니다.')
      window.location.href = '/admin';
    },
  }
}
</script>

