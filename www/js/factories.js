App.factory("Items", function($firebaseArray) {
  var itemsRef = new Firebase("https://testsapp.firebaseIO.com/cards");
  return $firebaseArray(itemsRef);
});


App.factory("Comments", function($firebaseArray) {
  var itemsRef = new Firebase("https://testsapp.firebaseIO.com/comments");
  return $firebaseArray(itemsRef);
});


App.factory("GetProfile", function($cordovaOauth, $http, $localStorage, $location) {

		var profileData = {};

        if($localStorage.hasOwnProperty("accessToken") === true) {
            $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: $localStorage.accessToken, fields: "id,name,gender,location,website,picture,email", format: "json" }}).then(function(result) {
                profileData = result.data;
                $localStorage.email = $scope.profileData.email;
                $localStorage.name = $scope.profileData.name;
                $localStorage.picture = $scope.profileData.picture.data.url;
            }, function(error) {
                alert("There was a problem getting your profile." + error);
            });
        } else {
        	alert("Not signed.");
        }
        return profileData;
});




App.factory('ConnectFacebook', [function ($cordovaOauth, $localStorage) {

	$cordovaOauth.facebook("397501760439627", ["email", "read_stream", "user_website", "user_location", "user_relationships"]).then(function(result) {
	$localStorage.accessToken = result.access_token;
	});
	


	

	return $localStorage.accessToken;
}])