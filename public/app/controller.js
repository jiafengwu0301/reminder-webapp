angular
    .module('app')
    .controller('homeController', homeController)
    .controller('newItemController', newItemController)
    .controller('itemController',itemController);


function homeController(){
    var vm = this;

    // Get the JSON which contains all items
    vm.events = getList();
};

function newItemController($route,$location,$scope){
    var vm = this;

    vm.newEvent = {
        'priority':'low',
        'check': 'n',
    };
    vm.newItem = newItem;

    // Generate the UUID for item
    function generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
    };

    vm.lat = undefined;
    vm.lng = undefined;
    vm.address = undefined;

    $scope.$on('gmPlacesAutocomplete::placeChanged', function(){
        var location = $scope.autocomplete.getPlace();
        vm.lat = location.geometry.location.lat();
        vm.lng = location.geometry.location.lng();
        vm.address = location.formatted_address;
    });

    // Create a new item
    function newItem(){
        if (vm.lat && vm.lng && vm.address) {
            var locationDatail = {
                'lat': vm.lat,
                'lng': vm.lng,
                'address': vm.address,
            };

            vm.newEvent.location = locationDatail;
        };

        vm.newEvent.id = generateUUID();
        var allList = getList();
        allList.push(vm.newEvent);
        setList(allList);
        alert("New Event Created")
        $location.path('/');
    };
};

function itemController($routeParams,$scope){
    var vm = this;

    vm.id = $routeParams.id;
    vm.events = getList();
    vm.currentItem = null;
    vm.editCheck = false;
    vm.editItem = editItem;
    vm.cancelEdit = cancelEdit;

    // Find the item by ID
    for (var i = 0; i < Object.keys(vm.events).length; i++){
        // alert(vm.events[i].id);
        if (vm.id === vm.events[i].id){
            vm.currentItem = vm.events[i];
            break;
        };
    };

    vm.lat = undefined;
    vm.lng = undefined;
    vm.address = undefined;

    $scope.$on('gmPlacesAutocomplete::placeChanged', function(){
        var location = $scope.autocomplete.getPlace();
        vm.lat = location.geometry.location.lat();
        vm.lng = location.geometry.location.lng();
        vm.address = location.formatted_address;
    });

    // vm.editEvent = {
    //     'location': vm.currentItem.location,
    //     'id': vm.currentItem.id,
    //     'check': vm.currentItem.check,
    // }

    vm.editEvent = undefined;

    // Edit an item
    function editItem(){
        vm.editCheck=true;
        vm.stringDate = new Date(vm.currentItem.date);


        var res = angular.equals(vm.currentItem,vm.editEvent);
        alert(res)
        if (!res){
            //TODO:Update the item
        };
    };

    // Cancel edit
    function cancelEdit(){
        vm.editCheck=false;
    };
};

//load and update JSON in localStorage
function getList() {
        if(!localStorage.events){
            localStorage.events = JSON.stringify([]);
        };

        return JSON.parse(localStorage.events);
};

function setList(item) {
    localStorage.events = JSON.stringify(item);
};
