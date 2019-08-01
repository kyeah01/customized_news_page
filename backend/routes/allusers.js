var express = require('express');
var router = express.Router();

var admin = require("firebase-admin");

var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://test1-e4911.firebaseio.com"
});

router.get('/', function (req, res, next) {
    function listAllUsers(nextPageToken) {
        // List batch of users, 1000 at a time.
        admin.auth().listUsers(1000, nextPageToken)
          .then(function(listUsersResult) {
            listUsersResult.users.forEach(function(userRecord) {
              // console.log('user', userRecord.toJSON());
            });
            // if (listUsersResult.pageToken) {
            //   // List next batch of users.
            //   listAllUsers(listUsersResult.pageToken);
            // }
            res.send(listUsersResult.users)
          })
          .catch(function(error) {
            console.log('Error listing users:', error);
          });
      }
      // Start listing users from the beginning, 1000 at a time.
      listAllUsers();
  
});

router.get('/delete/:uid', function (req, res, next) {
  var uid = req.params.uid
  admin.auth().deleteUser(uid)
  .then(function() {
    console.log('Successfully deleted user');
  })
  .catch(function(error) {
    console.log('Error deleting user:', error);
  });
})

module.exports = router;