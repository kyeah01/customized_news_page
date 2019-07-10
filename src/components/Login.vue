<template>
<div>
    <v-layout row justify-center>
        <v-btn
        color="primary"
        dark
        @click.stop="dialog = true"
        >
        Login
        </v-btn>

        <v-dialog
        v-model="dialog"
        max-width="290"
        >
        <v-card>
            <v-card-title class="headline">Login</v-card-title>

            <v-card-text>
                <input type="text" v-model="email" placeholder="Email"><br>
                <input type="password" v-model="password" placeholder="Password"><br>
            </v-card-text>

            <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
                color="green darken-1"
                flat="flat"
                @click="dialog = false"
                v-on:click="Login"
            >
                Login
            </v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
    </v-layout>
    <v-btn v-on:click="Logout">Logout</v-btn>
</div>
</template>


<script>
import firebase from 'firebase'
import FirebaseService from '@/services/FirebaseService'

export default {
    data () {
        return {
            email: '',
            password: '',
            dialog: false,
        }
    },
    methods: {
        Login: function() {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {
            alert('Well done ! You are now connected')
            })
        },
        Logout: function() {
            FirebaseService.logout()
        }
    }
}
</script>
