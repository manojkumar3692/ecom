(function() {
  'use strict';

  angular
    .module('app.homepage')
    .controller('HomePageController', HomePageController);

  HomePageController.$inject = ['$q', 'homepageService', 'logger'];
  /* @ngInject */
  function HomePageController($q, homepageService, logger) {
    
        var defaultBounds = new google.maps.LatLngBounds();

var input = document.getElementById('searchTextField');
var options = {
  bounds: defaultBounds,
  types: ['establishment']
};

var autocomplete = new google.maps.places.Autocomplete(input, options);
      
     }
})();
