(function() {
  'use strict';

  angular
    .module('app.shoppage')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'shop',
        config: {
          url: '/products',
          templateUrl: 'app/shop/shop.html',
          controller: 'ShoppageController',
          controllerAs: 'vm',
          title: 'Products',
          settings: {
            nav: 2,
            content: '<i class="fa fa-lock"></i> Admin'
          }
        }
      }
    ];
  }
})();
