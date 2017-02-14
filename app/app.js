angular
    .module('app', ['ngRoute'])
    .config(['$routeProvider','$locationProvider',
        function($routeProvider,$locationProvider){

            $routeProvider.when('/',{
                templateUrl: 'views/main.html',
                controller: 'homeController',
                controllerAs: 'vm'
            })

            .when('/new',{
                templateUrl: 'views/newItem.html',
                controller: 'newItemController',
                controllerAs: 'vm'
            });
        }
    ]);
