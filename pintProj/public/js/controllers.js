(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$scope', '$http'];

    function MainCtrl($scope, $http) {
      $scope.item = {};
      $scope.scrapePostForm = true;
      $scope.showScrapeDetails = false;
      $scope.loading = false;
      $scope.gotScrapeResults = false;
      $scope.alertContainer = false;

     // Watch for changes to URL, Scrape & Display the image
    $scope.$watch("item.link", function(newVal, oldVal) {
      // console.log('newVal: ', newVal, ' oldVal: ', oldVal);
      if (newVal.length > 5) {
        $scope.loading = true;
        $http.post('/api/scrape', {
          url: $scope.item.link
        })
          .then(function(data) {
            console.log(data);
            $scope.showScrapeDetails = true;
            $scope.gotScrapeResults = true;
            $scope.item.imgThumb = data.data.img;
            $scope.item.description = data.data.desc;
          }, function(error) {
            console.log('failed to return from scrape');
            $scope.loading = false;
            $scope.item.link = '';
            $scope.gotScrapeResults = false;
          })
          .finally(function() {
            $scope.loading = false;
          });
      }
    });


    }
})();