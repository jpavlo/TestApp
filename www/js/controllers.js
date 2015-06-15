var App = angular.module('starter.controllers', ["ionic", "ngCordova", "ngStorage", "firebase"]);


// App.controller("LoginController", function($scope, $rootScope, $firebase, $firebaseSimpleLogin) {
//     // Get a reference to the Firebase
//     // TODO: Replace "ionic-demo" below with the name of your own Firebase
//     var firebaseRef = new Firebase("https://logtest.firebaseIO.com/");

//     // Create a Firebase Simple Login object
//     $scope.auth = $firebaseSimpleLogin(firebaseRef);

//     // Initially set no user to be logged in
//     $scope.user = null;

//     // Logs a user in with inputted provider
//     $scope.login = function(provider) {
//       $scope.auth.$login(provider);
//     };

//     // Logs a user out
//     $scope.logout = function() {
//       $scope.auth.$logout();
//     };

//     // Upon successful login, set the user object
//     $rootScope.$on("$firebaseSimpleLogin:login", function(event, user) {
//       $scope.user = user;
//     });

//     // Upon successful logout, reset the user object
//     $rootScope.$on("$firebaseSimpleLogin:logout", function(event) {
//       $scope.user = null;
//     });

//     // Log any login-related errors to the console
//     $rootScope.$on("$firebaseSimpleLogin:error", function(event, error) {
//       console.log("Error logging user in: ", error);
//     });
// });


App.controller('LoginController', function($scope, $cordovaOauth, $localStorage, $location) {

    $scope.facebookLogin = function() {
        $cordovaOauth.facebook("397501760439627", ["email", "read_stream", "user_website", "user_location", "user_relationships"]).then(function(result) {
            $localStorage.accessToken = result.access_token;
            $location.path("/tab/login");
        }, function(error) {
            alert("There was a problem signing in!  See the console for logs");
            console.log(error);
        });
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


App.controller('RestfulController', function($scope, $state, $http, $q) { 
  
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

App.factory("Items", function($firebaseArray) {
  var itemsRef = new Firebase("https://testsapp.firebaseIO.com/items");
  return $firebaseArray(itemsRef);
});




App.controller("StreamController", function($scope, Items) {

  $scope.items = Items;

  $scope.addItem = function() {
    $scope.formInfo = {};
    alert($scope.formInfo.nameInput);
    console.log($scope.formInfo.nameInput);
    if (name) {
      $scope.items.$add({
        "name": name
      });
    }
  };
});








