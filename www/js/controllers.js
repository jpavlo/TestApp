var App = angular.module('starter.controllers', ["ionic", "ngCordova", "ngStorage", "firebase", "ngCordovaOauth"]);


App.controller("LoginController", function($scope, $cordovaOauth, $localStorage, $location) {

    $scope.login = function() {
        $cordovaOauth.facebook("397501760439627", ["email", "read_stream", "user_website", "user_location", "user_relationships"]).then(function(result) {
            $localStorage.accessToken = result.access_token;
            $location.path("/tab/profile");
        }, function(error) {
            alert("There was a problem signing in!  See the console for logs");
            console.log(error);
        });
    };

});

App.controller('ChatsCtrl', function($scope, Chats) {
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
});

App.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});


App.controller("FeedController", function($scope, $http, $localStorage, $location) {

    $scope.init = function() {
        if($localStorage.hasOwnProperty("accessToken") === true) {
            $http.get("https://graph.facebook.com/v2.2/me/feed", { params: { access_token: $localStorage.accessToken, format: "json" }}).then(function(result) {
                $scope.feedData = result.data.data;
                $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: $localStorage.accessToken, fields: "picture", format: "json" }}).then(function(result) {
                    $scope.feedData.myPicture = result.data.picture.data.url;
                });
            }, function(error) {
                alert("There was a problem getting your profile.  Check the logs for details.");
                console.log(error);
            });
        } else {
            alert("Not signed in");
            $location.path("/tab/login");
        }
    };

});


App.controller("ProfileController", function($scope, $http, $localStorage, $location) {

    $scope.init = function() {
        if($localStorage.hasOwnProperty("accessToken") === true) {
            $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: $localStorage.accessToken, fields: "id,name,gender,location,website,picture,relationship_status", format: "json" }}).then(function(result) {
                $scope.profileData = result.data;
            }, function(error) {
                alert("There was a problem getting your profile.  Check the logs for details.");
                console.log(error);
            });
        } else {
            alert("Not signed in");
            $location.path("/tab/login");
        }
    };

});


App.controller('FirebaseController', function($scope, $state, $http, $q) { 
  
  $scope.init = function(){
    $scope.getImages()
    .then(function(res){
      //success
      console.log('Images: ', res)
      $scope.imageList = res.shots;
    }, function(status){
      //status
      //console.log('Error: ', err)
      $scope.pageError = status;
    })
  }

  $scope.getImages = function(){
    var defer = $q.defer();

      $http.jsonp('http://api.dribbble.com/shots/popular?callback=JSON_CALLBACK')
      .success(function(res){
        defer.resolve(res)
      })
      .error(function(status, err){
        defer.reject(status)
      })    

    return defer.promise;
  }

  $scope.init();

});


App.controller("GoogleController", function($scope, $cordovaOauth) {

    $scope.googleLogin = function() {
        $cordovaOauth.google("AIzaSyAgVVzf2e4pDU1OkL_TIcqqR4PkyA4ejqY", ["https://www.googleapis.com/auth/urlshortener", "https://www.googleapis.com/auth/userinfo.email"]).then(function(result) {
            console.log(JSON.stringify(result));
        }, function(error) {
            console.log(error);
        });
    }

});






App.controller("StreamController", function($scope, $cordovaOauth) {
 

 
    $scope.login = function() {
        
        var ref = new Firebase("https://testsapp.firebaseIO.com");
        ref.authWithOAuthPopup("facebook", function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
          } else {
            console.log("Authenticated successfully with payload:", authData);
          }
        });

    }
 
});







