// Define the `greatIdeasApp` module
var greatIdeasApp = angular.module('greatIdeasApp', ['ngResource', 'ui.router']);

greatIdeasApp.config(function ($stateProvider) {
    $stateProvider
        .state('ideaList', {
            url: '',
            template: 'This is the parent list state <ui-view></ui-view>',
            controller: 'IdeasListController',
            abstract: true
        })
        .state('ideaList.all', {
            url: '',
            templateUrl: 'list.html'
        })
        .state('ideaList.viable', {
            url: '/viable',
            templateUrl: 'list.html',
            controller: 'ViableIdeaListController'
        })
        .state('ideaForm', {
            url: '/form',
            templateUrl: 'form.html',
            controller: 'IdeaFormController'
        });
});

// Define the `IdeasListController` controller on the `greatIdeasApp` module
greatIdeasApp.controller('IdeasListController', function IdeasListController($scope, ideasResource) {
    $scope.today = new Date();
    $scope.listTitle = 'My ideas';
    var ideasResponse = ideasResource.get();

    ideasResponse.$promise.then(function (data) {
        $scope.ideas = data.ideas;
    });
});

greatIdeasApp.factory('ideasResource', function ($resource) {
    var ideasResource = $resource('https://api.myjson.com/bins/1gxu7j', null,
        {
            'update': {
                method: 'PUT',
                isArray: true
            }
        }
    );
    return ideasResource;
});

greatIdeasApp.controller('ViableIdeaListController', function ViableIdeaListController($scope) {
    $scope.listTitle = 'My viable ideas';

    $scope.doFilter = function () {
        $scope.ideas = $scope.ideas.filter(function (idea) {
            console.debug('checking idea. idea=' + JSON.stringify(idea));
            return idea.viable;
        });
    };

});

greatIdeasApp.controller('IdeaFormController', function IdeaFormController($scope, ideasResource) {

    //Get the existing list of ideas
    var ideas;
    var ideasResponse = ideasResource.get();
    ideasResponse.$promise.then(function (data) {
        ideas = data.ideas;
        console.debug('Got ideas=' + JSON.stringify(ideas));
    });

    //Accept the new idea submitted by the user
    $scope.idea = {viable: false};
    $scope.submitForm = function (theform) {
        if (theform.$invalid) {
            alert('form is invalid!');
            return false;
        }

        ideas.push($scope.idea);
        ideasResource.update({}, ideas);
        $scope.idea = {};
    };

    $scope.clearForm = function () {
        $scope.idea = {};
    };

    $scope.questions = [
        {
            text: "Is this VAT inclusive?",
            answer: 0,
            yesText: "Yes, this is VAT inclusive",
            noText: "No, it's not",
            help: "How could you not know what VAT is?",
            link: "http://www.bir.com.ph"
        },
        {
            text: "Are there financial instruments?",
            answer: 0,
            yesText: "SIGNIFICANT ACCOUNTING POLICIES + OTHER THINGS",
            noText: "SIGNIFICANT ACCOUNTING POLICIES",
            help: "Financial instruments include cash"
        }
    ];

    $scope.financialStatement = {
        hasNoteNumber: true,
        totalAmountOfTax: 50000
    };

});