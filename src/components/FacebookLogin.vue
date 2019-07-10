<template>
    <div>
        <v-btn round color="blue" dark v-on:click="FacebookLogin">Facebook Login</v-btn>
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
        FacebookLogin: function() {
            var provider = new firebase.auth.FacebookAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
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
