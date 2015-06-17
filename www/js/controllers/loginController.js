App.controller('LoginController', function($scope, $cordovaOauth, $http, $localStorage, $location) {

    $scope.facebookLogout = function() {
        $scope.modal.hide();
    };

    $scope.facebookLogin = function() {
        $scope.modal.hide();
        $cordovaOauth.facebook("397501760439627", ["email", "read_stream", "user_website", "user_location", "user_relationships"]).then(function(result) {
            $localStorage.accessToken = result.access_token;
            //console.log("TAG: Result " + JSON.stringify(result));
            $location.path("/tab/settings");
        }, function(error) {
            alert("There was a problem signing in!  See the console for logs" + error);
            //console.log(error);
        });
      };



});