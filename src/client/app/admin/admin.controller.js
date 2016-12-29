(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('AdminController', AdminController);

  AdminController.$inject = ['logger','adminservice','toastr'];
  /* @ngInject */
  function AdminController(logger,adminservice,toastr) {
    var vm = this;
    vm.title = 'Admin';
    vm.product = {};
      vm.editProductList = {}
      vm.addProduct = addProduct;
        vm.editlist = [];
      vm.listEditProduct = listEditProduct;
      vm.editProduct = editProduct;
      vm.updateProduct = updateProduct;
      vm.deleteProduct = deleteProduct;
    activate();

    function activate() {
      logger.info('Activated Admin View');
    listEditProduct();
        
    }  
      
      function deleteProduct(data) {
          adminservice.deleteProduct(data)
          .then( function  (res) {
              if(res === 'fail') {
                  console.log('error in deleting product');
              }else {
                  console.log('product deleted succesfully');
              }
          })
      }
      
      function editProduct(shop) {
          vm.currentProduct = shop;
          
      }
      
      
      function addProduct(product1) {
          adminservice.postData(product1)
          .then(function (res) {
              if(res === 'fail'){
                  console.log('error in posting data')
              }else {
                 toastr.success('Product Added Succesfully');
              }
          })
           vm.product = {};
      }
   
        function listEditProduct() {
          adminservice.listProducts()
          .then(function (res) {
              if(res === 'fail') {
                  console.log('error in fectching')
              }else {
                  vm.editlist = res.results
              }
          })
      }
      
      function updateProduct(list){
          adminservice.updateProduct(list)
          .then(function (res) {
              if(res === 'fail') {
                  console.log('error in updating')
              }else {
                  console.log('Its Updated');
                  
              }
          })
      }
    
  }
})();
