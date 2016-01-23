// Controller of menu toggle.
// Learn more about Sidenav directive of angular material
// https://material.angularjs.org/latest/#/demo/material.components.sidenav
appControllers.controller('menuCtrl', function ($scope, $timeout, $mdUtil, $mdSidenav, $log, $ionicHistory, $state,CategoryService,$auth,$rootScope,$http,serverConfig) {
    console.log("inside menu controller");
    if($auth.isAuthenticated()){
        $http({
            method: 'GET',
            url: serverConfig.address+'api/myProfile?access_token='+window.localStorage['access_token']
        }).then(function(data){
            $scope.user_profile=data.data.data;
            console.log("authenticated");
        },function(response){
            if(response.status == 500){
                window.localStorage['access_token']=undefined
                $auth.logout();
            }
        });
    }else{
        $scope.user_profile=undefined;
        window.localStorage['access_token']=undefined
        console.log("unauthenticated");
    }
    /*$http({
        method: 'GET',
        url: serverConfig.address+'api/myProfile?access_token='+window.localStorage['access_token']
    }).then(function(data){
        $scope.user_profile=data.data.data;
        console.log("authenticated");
    },function(response){
        $scope.user_profile=undefined;
        console.log("unauthenticated");
        window.localStorage['access_token']=undefined
            $auth.logout();
        });*/
    $scope.toggleLeft = buildToggler('right');

    // buildToggler is for create menu toggle.
    // Parameter :  
    // navID = id of navigation bar.
    function buildToggler(navID) {
        var debounceFn = $mdUtil.debounce(function () {
            $mdSidenav(navID).toggle();
        }, 0);
        return debounceFn;
    };// End buildToggler.

    // navigateTo is for navigate to other page
    // by using targetPage to be the destination state. 
    // Parameter :  
    // stateNames = target state to go
    $scope.navigateTo = function (stateName,obj) {
        console.log(stateName);
        console.log(obj);
        $timeout(function () {
            $mdSidenav('left').close();
            if ($ionicHistory.currentStateName() != stateName) {
                $ionicHistory.nextViewOptions({
                    disableAnimate: true,
                    disableBack: true,
                });
            }
            $state.go(stateName,{id:obj});
            $mdSidenav('right').toggle();
        }, ($scope.isAndroid == false ? 300 : 0));
    };// End navigateTo.
  /*  *
     * This is the function used to load different category packages
     * @param stateName
     * @param obj
*/    /*$scope.myNavigateTo=function(stateName,obj){
        /!*    console.log("in menuCtrl");
            console.log(stateName);
            console.log(obj);*!/
       /!* $mdSidenav('left').close();*!/
        if ($ionicHistory.currentStateName() != stateName) {
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
        }
        $state.go(stateName,{id:obj}) ;
    }*/

    //Get all Categories

    CategoryService.getAll().then(function(data){
        $scope.categories={};
        $scope.categories.data = data.data.data;
    });


}); // End of menu toggle controller.