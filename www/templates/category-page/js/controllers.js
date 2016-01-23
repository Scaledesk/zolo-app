// Controller of menu toggle.
// Learn more about Sidenav directive of angular material
// https://material.angularjs.org/latest/#/demo/material.components.sidenav
appControllers.controller('categoryPageCtrl', function ($scope, $timeout, $mdUtil, $mdSidenav, $log, $ionicHistory, $state,AssignmentService,$stateParams) {

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
    $scope.navigateTo = function (stateName) {
        $timeout(function () {
            $mdSidenav('left').close();
            if ($ionicHistory.currentStateName() != stateName) {
                $ionicHistory.nextViewOptions({
                    disableAnimate: true,
                    disableBack: true
                });
                $state.go(stateName);
            }
        }, ($scope.isAndroid == false ? 300 : 0));
    };// End navigateTo.

    //Get all Categories

    AssignmentService.getCategoryPackages($stateParams.id).then(function(data){
        $scope.category={};
        $scope.category.data = data.data.data;
        console.log($scope.category.data.Packages);
    });
}); // End of menu toggle controller.