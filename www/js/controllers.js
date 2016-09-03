angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('DrinkCtrl', function($scope, $rootScope, Drinks) {

  
  var range = document.getElementById("range-input");
  $scope.drinks = Drinks.all();
  $scope.limit = $rootScope.limit || 'unset';
  $scope.count = $scope.count || 0;
  $scope.percent = $scope.percent || 0;

  $scope.incr = function(drink) {
    Drinks.incr(drink);
    $rootScope.count = ($rootScope.count || 0) + 1;
    var ratio = Math.floor(Math.min(7, 1 + 6 * $rootScope.count / $rootScope.limit));
    console.log($rootScope.limit +" " + ratio);

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
      from: { color: '#9bfe8c', width: 10 },
      to: { color: '#fe6565', width: 15 },
      // Set default step function for all animate calls
      step: function(state, circle) {
        circle.path.setAttribute('stroke', state.color);
        circle.path.setAttribute('stroke-width', state.width);

        var value = Math.round(circle.value() * 100);
        $scope.percent = value;
        $scope.count = (circle.value() * $scope.limit).toFixed();
        circle.setText('<img id="emoji-level" src="/img/emo/1.png" style="width: 50px">');
        var emoji = document.getElementById("emoji-level");
        var ind = Math.min(circle.value() * 7 + 1, 7);
        emoji.src = "img/emo/" + value + ".png";

      }
    });
    bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    bar.text.style.fontSize = '1rem';

    bar.animate(1.0);  // Number from 0.0 to 1.0
})

.controller('DealsCtrl', function($scope) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

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
