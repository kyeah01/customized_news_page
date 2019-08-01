<template>
  <div>
    <h1>Admin Page</h1>
    <h2>신규 가입자 수</h2>
    <graph/>
    <h2 v-for="user in users">
      <p>{{ user.email }}  ------- <v-btn @click="Deleteuser(user.uid)">회원탈퇴</v-btn></p> 
    </h2>

  </div>
</template>

<script>
import firebase from 'firebase'
import graph from '../components/admin/NewUserGraph'

export default {
  data() {
    return {
      users: [],
    }
  },
  components: {
    graph
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
    },
  }
}
</script>

