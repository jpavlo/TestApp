var App = angular.module('starter.controllers', ["ionic", "ngCordova", "ngStorage", "firebase"]);



App.controller('LoginController', function($scope, $cordovaOauth, $http, $localStorage, $location) {




    $scope.facebookLogout = function() {
        $localStorage.remove("accessToken");
        $scope.modal.hide();
    };

      $scope.facebookLogin = function() {

            if($localStorage.hasOwnProperty("accessToken") === true) {
                $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: $localStorage.accessToken, fields: "id,name,gender,location,website,picture,email", format: "json" }}).then(function(result) {
                    $scope.profileData = result.data;
                    console.log("TAG success login " + JSON.stringify($scope.profileData));
                    //$location.path("/templates/tab-login");
                    $scope.modal.hide();
                }, function(error) {
                    alert("There was a problem getting your profile.  Check the logs for details.");
                    console.log(error);
                });
            } else {
                $cordovaOauth.facebook("397501760439627", ["email", "read_stream", "user_website", "user_location", "user_relationships"]).then(function(result) {
                    $localStorage.accessToken = result.access_token;
                    //console.log("TAG: Result " + JSON.stringify(result));
                    //$location.path("/tab/profile");
                }, function(error) {
                    alert("There was a problem signing in!  See the console for logs");
                    console.log(error);
                });
            }
      };


});



App.controller("ProfileController", function($scope, $http, $localStorage, $location) {

    $scope.init = function() {
        if($localStorage.hasOwnProperty("accessToken") === true) {
            $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: $localStorage.accessToken, fields: "id,name,gender,location,website,picture,email", format: "json" }}).then(function(result) {
                $scope.profileData = result.data;
                console.log(JSON.stringify($scope.profileData));
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


App.controller('RestfulController', function($scope, $state, $http, $q, $ionicModal, $timeout) { 



  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/tab-login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };





  
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
  };

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
  };


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
  var itemsRef = new Firebase("https://testsapp.firebaseIO.com/cards");
  return $firebaseArray(itemsRef);
});


App.factory("Comments", function($firebaseArray) {
  var itemsRef = new Firebase("https://testsapp.firebaseIO.com/comments");
  return $firebaseArray(itemsRef);
});


App.controller("StreamController", function($scope, $timeout, Items, Comments) {
  $scope.nameInput = "";
  $scope.idCard = "";
  $scope.cards = Items;
  $scope.comments = Comments;

  $scope.addItem = function (nameInput){
    $scope.cards.$add(
        {
          name: nameInput,
          created_at: new Date().getTime()
        }
      );
  };


  $scope.addComment = function (idCard, commentInput){
    $scope.comments.$add(
        {
          id: idCard,
          comment: commentInput,
          created_at: new Date().getTime()
        }
      );
    $scope.commentInput = '';
  };



});








