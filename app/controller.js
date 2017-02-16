angular
    .module('app')
    .controller('homeController', homeController)
    .controller('newItemController', newItemController);


function homeController(){
    var vm = this;

    vm.events = getList();

}


function newItemController($route,$location,$scope){
    var vm = this;

    vm.newEvent = {
        'priority':'low',
        'check': 'n',
    };
    vm.newItem = newItem;


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


    function newItem(){

        if (vm.lat && vm.lng && vm.address) {
            var locationDatail = {
                'lat': vm.lat,
                'lng': vm.lng,
                'address': vm.address,
            }

            vm.newEvent.location = locationDatail;
        }

        vm.newEvent.id = generateUUID();
        var allList = getList();
        allList.push(vm.newEvent);
        setList(allList);
        alert("New Event Created")
        $location.path('/');
    }
}

//load and update JSON in localStorage
function getList() {
        if(!localStorage.events){
            localStorage.events = JSON.stringify([]);
        }

        return JSON.parse(localStorage.events);
    }

function setList(item) {
    localStorage.events = JSON.stringify(item);
}
