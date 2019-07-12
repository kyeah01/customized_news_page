<template>
    <div>
        <v-btn round color="#df4a31" dark v-on:click="GoogleLogin">Google Login</v-btn>
    </div>
</template>


<script>
import firebase from 'firebase'
import FirebaseService from '@/services/FirebaseService'

export default {
    data () {
        return {
        }
    },
    methods: {
        GoogleLogin: function() {
            let provider = new firebase.auth.GoogleAuthProvider()
            firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
            }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            });
        },
    }
}
</script>
