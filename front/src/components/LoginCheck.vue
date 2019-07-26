<template>
    <div>
        <v-btn v-on:click="LoginCheck">확인</v-btn>
    </div>
</template>


<script>
import firebase from 'firebase'
import FirebaseService from '@/services/FirebaseService'

export default {
    methods: {
        LoginCheck: function() {
            var user = firebase.auth().currentUser
            console.log(user)
        },
    }
}
</script>
