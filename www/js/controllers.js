var facebookApp = angular.module('starter.controllers', ["ionic", "ngCordova", "ngStorage"]);

facebookApp.controller("LoginController", function($scope, $cordovaOauth, $localStorage, $location) {

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

facebookApp.controller('ChatsCtrl', function($scope, Chats) {
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

facebookApp.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});


facebookApp.controller("FeedController", function($scope, $http, $localStorage, $location) {

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


facebookApp.controller("ProfileController", function($scope, $http, $localStorage, $location) {

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

