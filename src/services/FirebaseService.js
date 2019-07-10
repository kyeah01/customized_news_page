import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyBtTyQwI0xLNukBEnzvF-BRbGHhd6LPXIE",
    authDomain: "test1-e4911.firebaseapp.com",
    databaseURL: "https://test1-e4911.firebaseio.com",
    projectId: "test1-e4911",
    storageBucket: "test1-e4911.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SEND_ID"
};
  
firebase.initializeApp(config)

export default {
    logout() {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            alert('logout')
            this.$router.push('/login')
            
        }).catch(function(error) {
            // An error happened.
        });
    }   
}