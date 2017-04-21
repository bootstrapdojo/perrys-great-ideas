// Define the `greatIdeasApp` module
var greatIdeasApp = angular.module('greatIdeasApp', ['ngResource']);

// Define the `IdeasListController` controller on the `greatIdeasApp` module
greatIdeasApp.controller('IdeasListController', function IdeasListController($scope, $resource) {

    var resource = $resource('https://api.myjson.com/bins/1gxu7j');
    var ideasResponse = resource.get();

    ideasResponse.$promise.then(function (data) {
        $scope.ideas = data.ideas;
    });
});

