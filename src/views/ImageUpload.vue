<template>
   <div>
       <img id="image" :src = "imageSrc" />
       <br>
       <input id="file" @change="upload" type="file"/>
   </div>
</template>

<script>
import firebase from 'firebase'

   export default{
       data(){
           return{
               files:"",
               file:"",
               image:"",
               imageSrc:"http://dy.gnch.or.kr/img/no-image.jpg"
           }
       },
       methods:{
        //    getuserinfo() {
        //        var userinfo = firebase.auth().currentUser
        //        console.log(userinfo)
        //        userinfo.photoURL = imageSrc
        //    },
           upload(){
               var file = document.getElementById("file");
               var image = document.getElementById("image");
               console.log("1");

                   var target = event.currentTarget;
                   console.log(target.files)
                   var xmlHttpRequest = new XMLHttpRequest();
                   xmlHttpRequest.open('POST', 'https://api.imgur.com/3/image/', true);
                   console.log(xmlHttpRequest)
                   xmlHttpRequest.setRequestHeader("Authorization", "Client-ID 3c8ae0de8239125");
                   xmlHttpRequest.send(target.files[0]);

                   xmlHttpRequest.onreadystatechange = () => {

                       if (xmlHttpRequest.readyState == 4) {
                           console.log("3");

                           if (xmlHttpRequest.status == 200) {
                               console.log("4");
                               var result = JSON.parse(xmlHttpRequest.responseText);
                               this.imageSrc = result.data.link;
                               console.log(this.imageSrc)
                               
                               var userinfo = firebase.auth().currentUser
                                console.log(userinfo)
                                userinfo.photoURL = imageSrc
                               
                           }
                           else {
                               alert("업로드 실패");
                               this.imageSrc = "http://dy.gnch.or.kr/img/no-image.jpg";
                           }
                       }
                   console.log(target.files[0])
               };

           }
       }
   }


</script>

<style>

</style>