(function() {
  'use strict';
  angular.module('app')
    .component('app', {
      templateUrl: './assets/js/app/app.template.html',
      controller: AppController
    });
    AppController.$inject = ['$http'];
    function AppController($http) {
      let vm = this;
    }
}());
