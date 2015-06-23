App.controller("SettingsController", function($scope, $localStorage, $timeout, $http, $location, $ionicModal, $timeout, $cordovaSQLite, ManageSQlite) {
  	
	  $scope.status = $localStorage.status;

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

        if($localStorage.hasOwnProperty("accessToken") === true) {
            $http.get("https://graph.facebook.com/v2.3/me", { params: { access_token: $localStorage.accessToken, fields: "id,name,gender,location,website,picture,email", format: "json" }}).then(function(result) {
                $scope.profileData = result.data;
                $localStorage.email = $scope.profileData.email;
                $localStorage.name = $scope.profileData.name;
                $localStorage.picture = $scope.profileData.picture.data.url;
                $localStorage.id = $scope.profileData.id;
                $localStorage.status = true;
                console.log("TAG success login " + JSON.stringify($scope.profileData));
            }, function(error) {
                alert("There was a problem getting your profile." + error);
                //console.log(error);
            });
        } else {
              //$scope.login();
        }
	  };


		$scope.facebookLogout = function() {
	        delete $localStorage.accessToken;
	        delete $localStorage.name;
	        delete $localStorage.picture;
	        delete $localStorage.email;
	        delete $localStorage.id;
	        delete $localStorage.status;
	        //alert('logout');
	    };

    $scope.profile = {};

		  $scope.select = function(id){

		      $scope.profile = ManageSQlite.getAll(id);
		      $scope.modelo = '';

		  };



		  // $scope.insert = function(name, email, website) {
		  //   var query = "INSERT INTO profile (name, email, website) VALUES (?,?,?)";

		  //   $cordovaSQLite.execute(db, query, [name, email, website]).then(function(res) {
		  //     console.log("INSERT ID -> " + res.insertId);
		  //   }, function (err) {
		  //     console.log(err);
		  //   });
		  // }




		  // $scope.select = function(id) {
		  //   var query = "SELECT name, email FROM profile WHERE id = ?";

		  //   $cordovaSQLite.execute(db, query, [id]).then(function(res) {
		  //     if(res.rows.length > 0){
		  //     	console.log("SELECTED -> " + res.rows.item(0).name + " " + res.rows.item(0).email) + "sql query: " + query;
		  //     	$scope.profile = res.rows.item(0);
		  //     	console.log("TAG: Result " + JSON.stringify(res));
		  //     }else{
		  //     	console.log("NO ROWS EXIST");
		  //     }
		  //   }, function (err) {
		  //     console.log(err);
		  //   });
		  // }


		  // $scope.delete = function(id) {
		  //   var query = "DELETE FROM profile WHERE id = ?";

		  //   $cordovaSQLite.execute(db, query, [id]).then(function(res) {
		  //     	console.log("DELETED FROM -> " + res + "sql query: " + query);
		  //     	console.log("TAG: Result " + JSON.stringify(res));
		  //     	$scope.profile = {};
		  //   }, function (err) { 
		  //     console.log(err);
		  //   });
		  // }



		  // $scope.update = function(field, value, keyid) {
		  //   var query = "UPDATE profile SET "+field+" = ? WHERE ID = ?";

		  //   $cordovaSQLite.execute(db, query, [value,keyid]).then(function(res) {
		  //     	//console.log("UPDATE -> " + res + "sql query: " + query);
		  //     	console.log("TAG: Result " + JSON.stringify(res));
		  //   }, function (err) { 
		  //     console.log(err);
		  //   });
		  // }


});