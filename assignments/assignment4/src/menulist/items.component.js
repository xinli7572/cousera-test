(function () {
'use strict';

angular.module('MenuApp')
.component('categoriesList', {
  template: '{{ itemd.description }}',
  bindings: {
    itemd: '<'
  }
});

})();
