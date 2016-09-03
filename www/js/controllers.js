angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('DrinkCtrl', function($scope, $rootScope, Main) {

  $scope.main = $rootScope.main || Main.getMain();
  console.log($scope.main);
  var range = document.getElementById("range-input");
  var countField = document.getElementById("field-count");
  var percentField = document.getElementById("field-percent");

  $scope.$on('$ionicView.enter', function(e) {
    if($rootScope.main && $rootScope.main.update) {
      $rootScope.main.update = false;
      $scope.main = $rootScope.main;
      console.log($scope.main);
      bar.set(0);
    };
  });

  var bar = new ProgressBar.Circle(document.getElementById("container"), {
    color: '#aaa',
    strokeWidth: 15,
    trailWidth: 1,
    easing: 'easeOut',
    duration: 2000,
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
      $scope.main.percent = (value);
      $scope.main.count = ((circle.value() * $scope.main.limit).toFixed());
      countField.innerHTML = $scope.main.count;
      percentField.innerHTML = $scope.main.percent;

      circle.setText('<img id="emoji-level" src="/img/emo/1.png" style="width: 7em">');
      var emoji = document.getElementById("emoji-level");
      var ind = Math.round(circle.value() * 6 + 1);
      emoji.src = "img/emo/" + ind + ".png";

    }
  });
  bar.text.style.fontFamily = '"Lato", sans-serif';

  document.getElementById("gg").onclick = function(){ bar.animate(Math.min(1.0, bar.value() + 0.2)); };
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

.controller('BuzzCtrl', function($scope, $rootScope) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  var range = document.getElementById("range-input");
  /*
  $scope.chats = Chats.all();
  $scope.highlight = function(chat) {
    Chats.switchActive(chat);
    console.log($scope.chats);
  };
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
*/
  $scope.saveRange = function() {
    $rootScope.main = {
      update: true,
      limit: range.value,
      count: 0,
      percent: 0
    };
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
