// Define the `greatIdeasApp` module
var greatIdeasApp = angular.module('greatIdeasApp', ['ngResource']);

// Define the `IdeasListController` controller on the `greatIdeasApp` module
greatIdeasApp.controller('IdeasListController', function IdeasListController($scope, ideasResource) {

    var ideasResponse = ideasResource.get();

    ideasResponse.$promise.then(function (data) {
        $scope.ideas = data.ideas;
    });
});

greatIdeasApp.factory('ideasResource', function ($resource) {
    var ideasResource = $resource('https://api.myjson.com/bins/1gxu7j');
    return ideasResource;
});
