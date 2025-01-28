(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menulist/templates/home.template.html'
  })

  // Premade list page
  .state('categories', {
    url: '/main-list',
    templateUrl: 'src/menulist/templates/main-categories.template.html',
    controller: 'CategoriesController as mainList',
    resolve: {
      items: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getcategories();
      }]
    }
  })

  // Item detail
  .state('categories.itemDetail', {
    url: '/item-detail/{itemId}',
    templateUrl: 'src/menulist/templates/items.template.html',
    controller: 'ItemDetailController as itemDetail',
    resolve: {
        item: ['$stateParams', 'MenuDataService',
               function ($stateParams, MenuDataService) {
                 return MenuDataService.getItems($stateParams.itemId);
               }]
     }

  });

}

})();
