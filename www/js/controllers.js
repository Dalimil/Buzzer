angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('DrinkCtrl', function($scope, $rootScope, Drinks) {

  var emoji = document.getElementById("emoji-level");
  var range = document.getElementById("range-input");
  $scope.drinks = Drinks.all();
  $rootScope.limit = range.value;

  $scope.incr = function(drink) {
    Drinks.incr(drink);
    $rootScope.count = ($rootScope.count || 0) + 1;
    var ratio = Math.floor(Math.min(7, 1 + 6 * $rootScope.count / $rootScope.limit));
    console.log($rootScope.limit +" " + ratio);
    emoji.src = "img/emo/" + ratio + ".png";
  };
})

.controller('FriendsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.highlight = function(chat) {
    Chats.switchActive(chat);
    console.log($scope.chats);
  };
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('BuzzCtrl', function($scope, $rootScope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  var range = document.getElementById("range-input");
  $scope.chats = Chats.all();
  $scope.highlight = function(chat) {
    Chats.switchActive(chat);
    console.log($scope.chats);
  };
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };

  $scope.saveRange = function() {
    $rootScope.limit = range.value;
    $rootScope.count = 0;
    var emoji = document.getElementById("emoji-level");
    if(emoji != null) {
      emoji.src = "img/emo/1.png";
    }
    window.location.href="#/tab/drink";
  };
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
