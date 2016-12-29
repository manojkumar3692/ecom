(function() {
  'use strict';

  angular
    .module('app.shoppage')
    .controller('ShoppageController', ShoppageController);

 ShoppageController.$inject = ['logger','adminservice'];
  /* @ngInject */
  function ShoppageController(logger,adminservice) {
    var vm = this;
      vm.shop = [];
      
    activate();

    function activate() {
      logger.info('Activated Admin View');
        listProducts();
    }  
      
    
      function listProducts() {
          adminservice.listProducts()
          .then(function (res) {
              if(res === 'fail') {
                  consoel.log('error in fectching')
              }else {
                  vm.shop = res.results
              }
          })
      }
      
    
  }
})();
