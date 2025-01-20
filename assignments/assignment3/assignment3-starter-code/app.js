(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItems)
.constant('ApiBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com");


function FoundItems() {
  var ddo = {
    templateUrl: 'listItem.html',
    scope: {
      items: '<menuItems',
      onRemove: '&',
      title: '@title'
    },
    controller: MenuListDirectiveController,
    controllerAs: 'listDirective',
    bindToController: true
  };

  return ddo;
}

MenuListDirectiveController.$inject = ['MenuSearchService'];
function MenuListDirectiveController(MenuSearchService) {
  var listDirective = this;

  listDirective.searchTermResult = function(){
    if(MenuSearchService.getFoundLength() === 0 && MenuSearchService.getSearch() === true){
      return true;
    }else {
      return false;
    }
  };

  listDirective.foundLength = function(){
    if(MenuSearchService.getFoundLength() === 0 ){
      return true;
    }else {
      return false;
    }
  };

}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var list = this;

  list.narrowItDown = function(){
    var searchTerm = list.searchTerm;
    console.log("button is press ",searchTerm);
    list.items = MenuSearchService.getMatchedMenuItems(searchTerm);
  };

  list.title = function () {
     return MenuSearchService.getFoundLength();
  };


  list.removeItem = function (itemIndex) {
   console.log("'this' is: ", itemIndex);
   MenuSearchService.removeItem(itemIndex);
  };
}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  var found = [];
  var searched = false;

  service.getMatchedMenuItems = function(searchTerm){
    found = [];

    searched = true;

    if(searchTerm === ""){

    }else {
      var promise = service.getMenuCategories();

      promise.then(function (response) {

      for (var key in response.data) {
             if (response.data.hasOwnProperty(key)) {
                 var response_menu_items = response.data[key].menu_items;
                  for (var item in response_menu_items) {
                    if(response_menu_items[item].description.includes(searchTerm))
                    found.push(response_menu_items[item]);
                 }
             }
         }
       })

       .catch(function (error) {
        console.log("Something went terribly wrong.");
       });
    }


    return found;
  };

  service.getMenuCategories = function () {
     var response = $http({
       method: "GET",
       url: (ApiBasePath + "/menu_items.json")
     });

     return response;
   };

   service.getFoundLength = function(){
     return found.length;
   };

   service.removeItem = function(index){
     found.splice(index, 1);
   };

   service.getSearch = function(){
     return searched;
   };
}




})();
