// Define the `greatIdeasApp` module
var greatIdeasApp = angular.module('greatIdeasApp', []);

// Define the `IdeasListController` controller on the `greatIdeasApp` module
greatIdeasApp.controller('IdeasListController', function IdeasListController($scope) {

    var ideas = [
        {'idea': 'Blogging platform that tracks eye movement', 'viable': true},
        {'idea': 'Microwave that plays youtube videos', 'viable': true},
        {'idea': 'Perrycoin', 'viable': false},
        {'idea': 'E-junkshop', 'viable': true},
    ];

    $scope.ideas = ideas;

});