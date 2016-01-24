// Controller of menu toggle.
// Learn more about Sidenav directive of angular material
// https://material.angularjs.org/latest/#/demo/material.components.sidenav
appControllers.controller('categoryPageCtrl', function ($scope, $timeout, $mdUtil, $mdSidenav, $log, $ionicHistory, $state,AssignmentService,$stateParams,$ionicViewSwitcher) {

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
    $scope.goto=function(path){
        $scope.navigateTo(path);
    };
    // goToSetting is for navigate to Dashboard Setting page
    $scope.goToSetting = function () {
        $state.go("app.dashboardSetting");
    };// End goToSetting.
    // navigateTo is for navigate to other page
    // by using targetPage to be the destination state.
    // Parameter :
    // stateNames = target state to go
    $scope.navigateTo = function (stateName,obj,category_id) {
        if ($ionicHistory.currentStateName() != stateName) {
            $ionicHistory.nextViewOptions({
                disableAnimate: false,
                disableBack: true
            });

            //Next view animate will display in back direction
            $ionicViewSwitcher.nextDirection('back');
            if(stateName==='app.packageDisplay'){
                console.log("app.packageDisplay");
                console.log(stateName);
                $state.go(stateName, {
                    isAnimated: true,
                    id:obj,
                    from:"category",
                    category_id:category_id
                });
            }else{
                console.log(stateName);
                $state.go(stateName, {
                    isAnimated: true,
                    id:obj,
                });
            }
            /*$state.go(stateName, {
                isAnimated: true,
                id:obj,
                from:from,
                category_id:category_id
            });*/
        }
    }; // End of navigateTo.

    //Get all Categories

    AssignmentService.getCategoryPackages($stateParams.id).then(function(data){
        $scope.category={};
        $scope.category.data = data.data.data;
        console.log($scope.category.data.Packages);
        packages_length=$scope.category.data.Packages.data.length;
        $scope.packages=$scope.category.data.Packages.data;
        delete $scope.category.data.Packages;
        break_length=packages_length!=1? packages_length/2 : packages_length;
        delete packages_length;
        $scope.first_packages_row = $scope.packages.slice(0, break_length);
        $scope.second_packages_row = $scope.packages.slice(break_length + 1);
        delete $scope.packages;
        delete break_length;

    });
}); // End of menu toggle controller.