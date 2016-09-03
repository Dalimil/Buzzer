angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('DrinkCtrl', function($scope, $rootScope, Drinks) {

  var emoji = document.getElementById("emoji-level");
  var range = document.getElementById("range-input");
  $scope.drinks = Drinks.all();
  $rootScope.limit = 7;//range.value;

  $scope.incr = function(drink) {
    Drinks.incr(drink);
    $rootScope.count = ($rootScope.count || 0) + 1;
    var ratio = Math.floor(Math.min(7, 1 + 6 * $rootScope.count / $rootScope.limit));
    console.log($rootScope.limit +" " + ratio);
    emoji.src = "img/emo/" + ratio + ".png";
  };

    console.log("ok");
    var bar = new ProgressBar.Circle(document.getElementById("container"), {
      color: '#aaa',
      // This has to be the same size as the maximum width to
      // prevent clipping
      strokeWidth: 20,
      trailWidth: 1,
      easing: 'easeInOut',
      duration: 9400,
      text: {
        autoStyleContainer: false
      },
      from: { color: '#333', width: 10 },
      to: { color: '#333', width: 20 },
      // Set default step function for all animate calls
      step: function(state, circle) {
        circle.path.setAttribute('stroke', state.color);
        circle.path.setAttribute('stroke-width', state.width);

        var value = Math.round(circle.value() * 100);
        if (value === 0) {
          circle.setText('');
        } else {
          circle.setText(value + 1000 + " / " + 50000);
        }

      }
    });
    bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    bar.text.style.fontSize = '1rem';

    bar.animate(1.0);  // Number from 0.0 to 1.0
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
