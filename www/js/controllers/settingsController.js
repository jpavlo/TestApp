App.controller("SettingsController", function($scope, ManageSQlite, Auth, $location) {


$scope.authData = {};

		  $scope.loginFace = function() {
		    Auth.$authWithOAuthRedirect("facebook").then(function(authData) {
		      // User successfully logged in
		      $scope.authData = authData;
		    }, {scope: "email,user_likes"}).catch(function(error) {
		      if (error.code === "TRANSPORT_UNAVAILABLE") {
		        Auth.$authWithOAuthPopup("facebook").then(function(authData) {
		          // User successfully logged in. We can log to the console
		          // since we’re using a popup here
		          //console.log(authData);
		          $scope.authData = authData;
		          //$location.path("/tab/settings");
		        });
		      } else {
		        // Another error occurred
		        console.log(error);
		      }
		    });
		};




		$scope.loginOutFace = function() {
	        ref.unauth();
	        $scope.authData = {};
	    };



		var isNewUser = true;

		var ref = new Firebase("https://testsapp.firebaseIO.com");
		ref.onAuth(function(authData) {
		  if (authData && isNewUser) {
		    // save the user's profile into Firebase so we can list users,
		    // use them in Security and Firebase Rules, and show profiles
		    ref.child("users").child(authData.uid).set({
		      provider: authData.provider,
		      name: getName(authData)
		    });
		  }
		  $scope.authData = authData;
		  console.log(authData);
		});

		// find a suitable name based on the meta info given by each provider
		function getName(authData) {
		  switch(authData.provider) {
		     case 'password':
		       return authData.password.email.replace(/@.*/, '');
		     case 'twitter':
		       return authData.twitter.displayName;
		     case 'facebook':
		       return authData.facebook.displayName;
		  }
		}






});