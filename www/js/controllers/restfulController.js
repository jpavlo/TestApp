App.controller('RestfulController', function($scope, $state, $http, $q, $ionicModal, $timeout, $localStorage) { 

    

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

   
   $scope.id = $localStorage.id;



  
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