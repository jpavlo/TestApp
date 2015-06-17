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
