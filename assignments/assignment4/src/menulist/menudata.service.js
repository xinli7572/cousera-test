(function () {
'use strict';

angular.module('MenuApp')
.service('MenuDataService', MenuDataService);


MenuDataService.$inject = ['$http']
function MenuDataService($http) {
  var service = this;

  var categories = [];
  var items = [];

  service.getcategories = function () {
    categories = [];
    var promise = service.getAllCategories();

     promise.then(function (response) {

     for (var key in response.data) {
       categories.push(response.data[key]);
        }
      })

      .catch(function (error) {
       console.log("Something went terribly wrong.");
      });

   return categories;
  };


  service.getAllCategories = function () {
   var response = $http({
     method: "GET",
     url: ("https://coursera-jhu-default-rtdb.firebaseio.com/categories.json")
   });

   return response;
 };


  service.getItems = function (itemId)  {

    items = [];
    var promise = service.getItemsForCategory(itemId);

     promise.then(function (response) {

       for (var key in response.data) {
            if(key === 'menu_items'){
                var da = response.data[key];
                for (var keys in da) {
                  items.push(da[keys]);
                }
            }
         }
      })
      .catch(function (error) {
       console.log("Something went terribly wrong.");
      });

   return items;
  };


  service.getItemsForCategory = function (categoryShortName) {
   var response = $http({
     method: "GET",
     url: ("https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/"+categoryShortName+".json")
   });

   return response;
 };

}

})();
