(function() {
  'use strict';
  angular.module('app')
    .component('display', {
      templateUrl: './assets/js/dashboard/dashboard.template.html',
      controller: DashboardController
    });
    function DashboardController($http) {
      let vm = this;

      vm.$onInit = () => {
        $http.get('/users')
        .then((res, err) => {
          if (err) {
            console.error(err);
          }
          vm.users = res.data;
        })
      };
    }
}());
