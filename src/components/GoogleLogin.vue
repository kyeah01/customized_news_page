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
            firebase.auth().signInWithRedirect(provider);
            firebase.auth().getRedirectResult().then(function(result) {
            if (result.credential) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                // var token = result.credential.accessToken;
                // ...
            }
            // The signed-in user info.
            // var user = result.user;
            }).catch(function(error) {
                console.error('[Google Login Error]', error)
            });
        },
    }
}
</script>