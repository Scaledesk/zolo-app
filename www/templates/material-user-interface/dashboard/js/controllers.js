// Controller of dashboard.
appControllers.controller('dashboardCtrl', function ($scope, $timeout, $state,$stateParams, $ionicHistory,$mdToast) {

    //$scope.isAnimated is the variable that use for receive object data from state params.
    //For enable/disable row animation.
    $scope.isAnimated =  $stateParams.isAnimated;
    // navigateTo is for navigate to other page
    // by using targetPage to be the destination state. 
    // Parameter :  
    // stateNames = target state to go.
    $scope.navigateTo = function (stateName) {
        $timeout(function () {
            if ($ionicHistory.currentStateName() != stateName) {
                $ionicHistory.nextViewOptions({
                    disableAnimate: false,
                    disableBack: true
                });
                $state.go(stateName);
            }
        }, ($scope.isAnimated  ? 300 : 0));
    }; // End of navigateTo.
    $scope.showToast = function (toastPosition,action) {
        $mdToast.show({
            controller: 'toastController',
            templateUrl: 'toast.html',
            hideDelay: 800,
            position: toastPosition,
            locals: {
                displayOption: {
                    title: action
                }
            }
        });
    }; // End of showToast.
    // goToSetting is for navigate to Dashboard Setting page
    $scope.goToSetting = function () {
        $state.go("app.dashboardSetting");
    };// End goToSetting.

}); // End of dashboard controller.

// Controller of Dashboard Setting.
appControllers.controller('dashboardSettingCtrl', function ($scope, $state,$ionicHistory,$ionicViewSwitcher,$location,$auth,$mdToast) {

    $scope.showToast = function (toastPosition,action) {
        $mdToast.show({
            controller: 'toastController',
            templateUrl: 'toast.html',
            hideDelay: 800,
            position: toastPosition,
            locals: {
                displayOption: {
                    title: action
                }
            }
        });
    }; // End of showToast.
    $scope.loggedin= $auth.isAuthenticated()?true:false;
    $scope.logout=function(){
        $auth.logout().then(function(){
            $scope.$emit('user_login_logout', { message: "user_logged_out" });
            $scope.showToast("top","You are logged out successfully");
            $scope.navigateTo('app.packages',true);
        });
    }

    $scope.goto=function(path){
        console.log("goto:"+path);
        //$location.path(path);
        $scope.navigateTo(path);
    };
    // navigateTo is for navigate to other page
    // by using targetPage to be the destination state.
    // Parameter :
    // stateNames = target state to go.
    // objectData = Object data will send to destination state.
    $scope.navigateTo = function (stateName,objectData) {
            if ($ionicHistory.currentStateName() != stateName) {
                $ionicHistory.nextViewOptions({
                    disableAnimate: false,
                    disableBack: true
                });

                //Next view animate will display in back direction
                $ionicViewSwitcher.nextDirection('back');

                $state.go(stateName, {
                    isAnimated: objectData,
                });
            }
    }; // End of navigateTo.
}); // End of Dashboard Setting controller.

// Controller of dashboard.
appControllers.controller('categoryCtrl', function ($scope, $timeout, $state,$stateParams, $ionicHistory) {

    //$scope.isAnimated is the variable that use for receive object data from state params.
    //For enable/disable row animation.
    $scope.isAnimated =  $stateParams.isAnimated;
    console.log("dashboar");
    console.log($scope.categories);
    // navigateTo is for navigate to other page
    // by using targetPage to be the destination state.
    // Parameter :
    // stateNames = target state to go.
    $scope.navigateTo = function (stateName) {
        $timeout(function () {
            if ($ionicHistory.currentStateName() != stateName) {
                $ionicHistory.nextViewOptions({
                    disableAnimate: false,
                    disableBack: true
                });
                $state.go(stateName);
            }
        }, ($scope.isAnimated  ? 300 : 0));
    }; // End of navigateTo.

    // goToSetting is for navigate to Dashboard Setting page
    $scope.goToSetting = function () {
        $state.go("app.dashboardSetting");
    };// End goToSetting.

}); // End of dashboard controller.