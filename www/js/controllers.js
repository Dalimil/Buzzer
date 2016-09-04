

angular.module('starter.controllers', ["ngCordova"])

.controller('DashCtrl', function($scope) {
  var ctx = document.getElementById("myChart").getContext("2d");
  var myLineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ["1st Sep", "2nd Sep", "3rd Sep", "4th Sep", "5th Sep"],
        datasets: [
            {
                label: "Spending",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 3,
                pointHitRadius: 10,
                data: [25, 15, 25, 8, 28, 40],
                spanGaps: false,
            },

            {
                label: "Limit",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(254,101,101,0.4)",
                borderColor: "rgba(254,101,101,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(254,101,101,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(254,101,101,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 3,
                pointHitRadius: 10,
                data: [35, 25, 20, 25, 30, 20],
                spanGaps: false,
            }
        ]
    },
    options: {}
  });
})

.controller('DrinkCtrl', function($scope, $rootScope, Main, $cordovaLocalNotification, $cordovaToast) {

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
    duration: 1000,
    text: {
      autoStyleContainer: false
    },
    from: { color: '#9bfe8c', width: 10 },
    to: { color: '#fe6565', width: 15 },
    // Set default step function for all animate calls
    step: function(state, circle) {
      circle.path.setAttribute('stroke', state.color);
      circle.path.setAttribute('stroke-width', state.width);

      var value = circle.value();
      
      if(value >= 1) {
        value = Math.random()*0.007;
      } else {
        value -= $scope.main.percent;
      }
      // console.log(value, $scope.main.percent);
      $scope.main.percent += value;
      $scope.main.count = $scope.main.percent * $scope.main.limit;
      countField.innerHTML = $scope.main.count.toFixed();
      percentField.innerHTML = ($scope.main.percent * 100).toFixed();

      circle.setText('<img id="emoji-level" src="/img/emo/1.png" style="width: 7em">');
      var emoji = document.getElementById("emoji-level");
      var ind = Math.round(circle.value() * 6 + 1);
      emoji.src = "img/emo/" + ind + ".png";
      if($scope.main.percent >= 0.5 && ! $scope.main.pastFifty) {
        $scope.main.pastFifty = true;
        $cordovaLocalNotification.schedule({
            at: Date.now(),
            title: "Slow Down",
            text: "You've spent half of your budget!",
            led: "FFFFFF"
        });
      } else if($scope.main.percent >= 1.0 && ! $scope.main.pastOne) {
          $scope.main.pastOne = true;
          $cordovaLocalNotification.schedule({
            at: Date.now(),
            title: "You've reached tonight's limit",
            text: "You've spent over 100% of your budget!",
            led: "FFFFFF"
        });
      }
    }
  });
  bar.text.style.fontFamily = '"Lato", sans-serif';
  $rootScope.bar = bar;

  document.getElementById("simulate-button").onclick = function() {
    bar.animate(Math.min(1.0, bar.value() + Math.random()*0.2));
  };

})

.controller('DealsCtrl', function($scope, Deals, $cordovaToast) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.deals = Deals.all();

  var map = null;

  $scope.$on('$ionicView.enter', function(e) {
    console.log(typeof google != "undefined");
    if(typeof google != "undefined") {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 50.924, lng: 5.29},
        zoom: 10
      });
    }
  });
  $scope.buy = function(id) {
    var button = document.getElementById("buy-btn-"+id);
    console.log(button);
    button.disabled = true;
    button.innerHTML = "Bought";
    $cordovaToast.show("Success", '2000', 'bottom');
  };

})

.controller('BuzzCtrl', function($scope, $rootScope) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  document.getElementById("gg").onclick = function() {
      window.location.href = "#/tab/account";
      console.log(window.location.href);
  };

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
      percent: 0,
      pastFifty: false,
      pastOne: false
    };
    var emoji = document.getElementById("emoji-level");
    if(emoji != null) {
      emoji.src = "img/emo/1.png";
    }
    window.location.href="#/tab/drink";
  };
})

.controller('AccountCtrl', function($scope, $http) {
  
  var form = document.getElementById("bank-form");
  var button = document.getElementById("submit-button");
  button.disabled = true;

  $http.get('https://startupbus-buzz.herokuapp.com/api/fastlinkvalues')
  .then(function(response) {
    console.log(response);
    var res = response.data;
    console.log(res);
    button.disabled = false;
    document.getElementById("field-session").value = res.user_token;
    document.getElementById("field-token").value = res.application_token;
  });

});
