(function(){
'use strict'

angular.module('ShoppingListCheckOff',[])

.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var buylist = this;

  buylist.bought = 0;
  buylist.items = ShoppingListCheckOffService.getItemsBuy();

  buylist.buyItem = function(itemIndex){
    ShoppingListCheckOffService.buyItem(itemIndex);
    if(buylist.items.length ==0 ){
      buylist.bought = 1;
    }
  }
};



AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtlist = this;
  boughtlist.items = ShoppingListCheckOffService.getItemsBought();
}


function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var items_buy = [{
    name: "Milk",
    quantity: "2"
  },
  {
    name: "Donuts",
    quantity: "200"
  },
  {
    name: "Cookies",
    quantity: "300"
  },
  {
    name: "Sugar",
    quantity: "3"
  },
  {
    name: "Chocolate",
    quantity: "5"
  }];


  var items_bought = [];

  service.getItemsBuy = function () {
    return items_buy;
  };

  service.getItemsBought = function () {
    return items_bought;
  };


  service.buyItem= function (itemIndex){
    items_bought.push(items_buy[itemIndex]);
    items_buy.splice(itemIndex, 1);
  };

}


})()
