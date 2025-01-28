(function () {
'use strict';

angular.module('MenuApp')
.component('categoriesList', {
  templateUrl: 'src/menulist/templates/categories.template.html',
  bindings: {
    items: '<'
  }
});

})();
