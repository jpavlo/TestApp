angular.module('starter.controllers', ["ionic", "ngCordova"])

.controller("LoginController", function($scope, $cordovaOauth, $cordovaSQLite) {
 
    $scope.FacebookLogin = function() {
        $cordovaOauth.facebook("397501760439627", ["email", "read_stream", "user_website", "user_location", "user_relationships"]).then(function(result) {
            //$localStorage.accessToken = result.access_token;
            //$location.path("/profile");
        }, function(error) {
            alert("There was a problem signing in!  See the console for logs");
            console.log(error);
        });
    };


    $scope.GoogleLogin = function() {
        $cordovaOauth.facebook("397501760439627", ["email", "read_stream", "user_website", "user_location", "user_relationships"]).then(function(result) {
            //$localStorage.accessToken = result.access_token;
            //$location.path("/profile");
        }, function(error) {
            alert("There was a problem signing in!  See the console for logs");
            console.log(error);
        });
    };


      var db = $cordovaSQLite.openDB({ name: "my.db" });

      // for opening a background db:
      var db = $cordovaSQLite.openDB({ name: "my.db", bgType: 1 });

      $scope.execute = function() {
        var query = "INSERT INTO test_table (data, data_num) VALUES (?,?)";
        $cordovaSQLite.execute(db, query, ["test", 100]).then(function(res) {
          console.log("insertId: " + res.insertId);
        }, function (err) {
          console.error(err);
        });
      };


 
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
