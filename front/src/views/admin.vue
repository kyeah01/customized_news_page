<template>
  <v-container>
    <h1>Admin Page</h1>
    <h2>신규 가입자 수</h2>
    <NewUserGraph/>
    <h2>전체 사용자 방문 수</h2>
    <TotalUserGraph/>
    <h2>전체 방문자 수</h2>
    <TotalVisitorGraph/>
    <h2>전체 사용자 :{{ users.length }}명</h2>
    <p v-for="user in users">{{ user.email }}  ------- <v-btn @click="Deleteuser(user.uid)">회원탈퇴</v-btn></p> 
 
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

