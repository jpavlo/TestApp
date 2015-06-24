App.factory("Items", function($firebaseArray, $ionicLoading) {
  var itemsRef = new Firebase("https://testsapp.firebaseIO.com/cards");
  return $firebaseArray(itemsRef);
});


App.factory("Comments", function($firebaseArray) {
  var itemsRef = new Firebase("https://testsapp.firebaseIO.com/comments");
  return $firebaseArray(itemsRef);
});

App.factory("Auth", function($firebaseAuth) {
  var usersRef = new Firebase("https://testsapp.firebaseIO.com/users");
  return $firebaseAuth(usersRef);
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




App.factory('ConnectFacebook', [function($cordovaOauth, $localStorage) {

	$cordovaOauth.facebook("397501760439627", ["email", "read_stream", "user_website", "user_location", "user_relationships"]).then(function(result) {
	$localStorage.accessToken = result.access_token;
	});

	return $localStorage.accessToken;
}]);





App.factory("ManageSQlite", function($cordovaSQLite){

      var SQliteService = {};

      SQliteService.profile = {};


      SQliteService.insert = function(name, email, website) {
        var query = "INSERT INTO profile (name, email, website) VALUES (?,?,?)";

        $cordovaSQLite.execute(db, query, [name, email, website]).then(function(res) {
          console.log("INSERT ID -> " + res.insertId);
        }, function (err) {
          console.log(err);
        });
      };




      SQliteService.getAll = function(id) {
        var query = "SELECT name, email FROM profile WHERE id = ?";

        $cordovaSQLite.execute(db, query, [id]).then(function(res) {
          if(res.rows.length > 0){
            //console.log("SELECTED -> " + res.rows.item(0).name + " " + res.rows.item(0).email) + "sql query: " + query;
            SQliteService.profile = res.rows.item(0)
            //console.log("TAG: Result " + SQliteService.profile);
            console.log("TAG OK -> " + res.rows.item(0));
            //return JSON.stringify(SQliteService.profile);
          }else{
            console.log("NO ROWS EXIST");
            SQliteService.profile = {};
          }
        }, function (err) {
          console.log(err);
           SQliteService.profile = {};
        });

        return SQliteService.profile;
      };


      SQliteService.delete = function(id) {
        var query = "DELETE FROM profile WHERE id = ?";

        $cordovaSQLite.execute(db, query, [id]).then(function(res) {
            console.log("DELETED FROM -> " + res + "sql query: " + query);
            console.log("TAG: Result " + JSON.stringify(res));
            //SQliteService.profile = {};
        }, function (err) { 
          console.log(err);
        });
      };



      SQliteService.update = function(field, value, keyid) {
        var query = "UPDATE profile SET "+field+" = ? WHERE ID = ?";

        $cordovaSQLite.execute(db, query, [value,keyid]).then(function(res) {
            console.log("UPDATE -> " + res + "sql query: " + query);
            console.log("TAG: Result " + JSON.stringify(res));
        }, function (err) { 
          console.log(err);
        });
      };




  return SQliteService;
});






