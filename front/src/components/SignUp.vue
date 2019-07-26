<template>
<div>
    <v-layout row justify-center>
        <v-btn
        color="primary"
        dark
        @click.stop="dialog = true"
        >
        Sign Up
        </v-btn>

        <v-dialog
        v-model="dialog"
        max-width="290"
        >
        <v-card>
            <v-card-title class="headline">Sign Up</v-card-title>

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
                v-on:click="SignUp"
            >
                Sign Up
            </v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
    </v-layout>
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
        SignUp: function() {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
                function (user) {
                    alert('created!!')
                },
                function (err) {
                    alert('Oops, ' + err.message)
                }
            );
        }

    }
}
</script>
