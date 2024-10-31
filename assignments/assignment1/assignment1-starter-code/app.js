(function(){
'use strict'

angular.module('LunchCheck',[])

.controller('LunchCheckController', DIController);

DIController.$inject = ['$scope'];
function DIController($scope){

  $scope.check=function(){

    $scope.count = 0;

    if($scope.lunch === undefined){
      console.log('this is empty');
    }else {

      const words = $scope.lunch.split(',');
      for(var i=0;i<words.length;i++){
        console.log(words[i]);
        if(words[i].trim() == ''){
          console.log('this is empty');
        }else{
          $scope.count++;
        }
      };
    }

    console.log('count is ' + $scope.count);

    if($scope.count == 0){
      $scope.output = 'Please enter data first';
    }else{
      if($scope.count > 0 && $scope.count <= 3){
        $scope.output = 'Enjoy! ';
      }else{
        $scope.output = 'Too much！';
      }
    }
  };
}

})();
