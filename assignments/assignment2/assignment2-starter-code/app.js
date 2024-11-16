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
    if(ShoppingListCheckOffService.getBuyCount()==buylist.items.length){
      buylist.bought = 1;
    }
    ShoppingListCheckOffService.buyItem(itemIndex);
  }
};


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtlist = this;
  boughtlist.items = ShoppingListCheckOffService.getItemsBought();
}


function ShoppingListCheckOffService() {
  var service = this;
  var buyCount = 0;

  // List of shopping items
  var items_buy = [{
    name: "Milk",
    quantity: "2",
    buy:"0"
  },
  {
    name: "Donuts",
    quantity: "200",
    buy:"0"
  },
  {
    name: "Cookies",
    quantity: "300",
    buy:"0"
  },
  {
    name: "Sugar",
    quantity: "3",
    buy:"0"
  },
  {
    name: "Chocolate",
    quantity: "5",
    buy:"0"
  }];


  var items_bought = [];

  service.getItemsBuy = function () {
    return items_buy;
  };

  service.getItemsBought = function () {
    return items_bought;
  };


  service.buyItem= function (itemIndex){
    if(items_buy[itemIndex].buy == "0"){
      items_buy[itemIndex].buy = "1";
      items_bought.push(items_buy[itemIndex]);
      buyCount++;
    }
  };

  service.getBuyCount = function(){
    return buyCount;
  }

}


})()
