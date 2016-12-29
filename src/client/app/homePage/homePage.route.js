(function() {
  'use strict';

  angular
    .module('app.homepage')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'homepage',
        config: {
          url: '/',
          templateUrl: 'app/homePage/homePage.html',
          controller: 'HomePageController',
          controllerAs: 'vm',
          title: 'JustPark',
          settings: {
            nav: 1,
            content: '<i class="fa fa-dashboard"></i> Dashboard'
          }
        }
      }
    ];
  }
})();
