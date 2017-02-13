angular
    .module('app', ['ngRoute'])
    .config(['$routeProvider','$locationProvider',
        function($routeProvider,$locationProvider){

            $routeProvider.when('/',{
                templateUrl: 'views/main.html'
            })

            .when('/new',{
                templateUrl: 'views/newItem.html'
            })

            $locationProvider.html5Mode(true);
        }
    ]);
