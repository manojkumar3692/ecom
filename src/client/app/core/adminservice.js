(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('adminservice', adminservice);

  adminservice.$inject = ['$http', '$q', 'exception', 'logger'];
  /* @ngInject */
  function adminservice($http, $q, exception, logger) {
    var service = {
         allproduct: allproduct,
    };
    service.productData = productData;
      service.postData = postData;
      service.listProducts = listProducts;
      service.updateProduct = updateProduct;
      service.deleteProduct = deleteProduct;
    
      var allData = [];
     
      return service;
    
      
      function deleteProduct(data) {
          return $http({
              method:'post',
              url: 'http://localhost:8002/api/admin/deleteproduct',
              data : {
                  id :  data._id
              }
          })
      }
      
      function updateProduct(data) {
          return $http({
              method:'post',
              url: 'http://localhost:8002/api/admin/updateproduct',
              data : {
                  id : data._id,
                  title : data.title
              }
          })
      }
      
      function postData(allData) {
          return $http({
              method :'post',
              url : 'http://localhost:8002/api/admin/addproduct',
              data : {
                title : allData.title,
                description : allData.description,
                price : allData.price,
                stock : allData.stock,
                imageUrl : allData.imageUrl  
              }
          }).then(success).catch(fail);
      }
      
      function allproduct() {
          return $http.get('/admin')
          .then(success)
          .catch(fail);
      }
      
      function listProducts() {
          return $http({
              method:'get',
              url:'http://localhost:8002/api/products'
          }).then(success).catch(fail);
      } 
      
      function productData () {
          return allData;
      }
      
        function success(response) {
        return response.data;
      }

      function fail(e) {
       console.log(e);
      }
      
  }
})();

