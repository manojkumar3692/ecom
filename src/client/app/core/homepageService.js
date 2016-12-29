(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('homepageService', homepageService);

  homepageService.$inject = ['$http', '$q', 'exception', 'logger'];
  /* @ngInject */
  function homepageService($http, $q, exception, logger) {
    var service = {
      getPeople: getPeople,
      getMessageCount: getMessageCount
    };

    return service;

    function getMessageCount() { return $q.when(72); }

    function getPeople() {
      return $http.get('/api/people')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getPeople')(e);
      }
    }
  }
})();
