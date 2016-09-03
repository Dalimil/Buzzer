angular.module('starter.services', [])

.factory("Drinks", function() {
  var drinks = [{
    img: 'img/drinks/beer.png'
  }, {
    img: 'img/drinks/wine.png'
  }, {
    img: 'img/drinks/shot.png'
  }, {
    img: 'img/drinks/cocktail.png'
  }].map(function(drink) {
    var x = drink;
    x.count = 0;
    return x;
  });
  return {
    all: function() {
      return drinks;
    },
    incr: function(drink) {
      var drink = drinks[drinks.indexOf(drink)];
      drink.count += 1;
    }
  }
})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }].map(function(chat) { 
    var x = chat;
    x.active = false;
    return x; 
  });

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    switchActive: function(chat) {
      var chat = chats[chats.indexOf(chat)]; 
      chat.active = !chat.active;
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
