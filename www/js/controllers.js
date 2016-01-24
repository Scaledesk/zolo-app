var appControllers = angular.module('starter.controllers', [])
    //Start Package Controller
    .controller('packageController',function($scope,$http,serverConfig,$state,$ionicViewSwitcher,$ionicHistory) {
    $http.get(serverConfig.address + 'api/packages').success(function (response) {
        $scope.packages = response.data;
        packages_length=$scope.packages.length;
         break_length=packages_length/2;
        delete packages_length;
        $scope.first_packages_row = $scope.packages.slice(0, break_length);
        $scope.second_packages_row = $scope.packages.slice(break_length + 1);
        delete $scope.packages;
        delete break_length;
    }).error(function (data) {
        console.log("Some error occurred");
        console.log(data);
    });
        $scope.goToSetting = function () {
            $state.go("app.dashboardSetting");
        };// End goToSetting.
        $scope.navigateTo = function (stateName,objectData,obj) {
            if ($ionicHistory.currentStateName() != stateName) {
                $ionicHistory.nextViewOptions({
                    disableAnimate: false,
                    disableBack: true
                });

                //Next view animate will display in back direction
                $ionicViewSwitcher.nextDirection('back');

              /*  $state.go(stateName, {
                    isAnimated: true,
                    id:obj,
                    from:from
                });*/
                if(stateName==='app.packageDisplay'){
                    console.log("app.packageDisplay");
                    console.log(stateName);
                    $state.go(stateName, {
                        isAnimated: objectData,
                        id:obj,
                        from:"packages"
                    });
                }else{
                    console.log(stateName);
                    $state.go(stateName, {
                        isAnimated: objectData,
                        id:obj,
                    });
                }
            }
        }; // End of navigateTo.
})//End Package Controller
    .controller('registrationController',function($scope,$http,serverConfig,$mdToast,$ionicViewSwitcher,$ionicHistory,$state){
        /**
         * function to register user in zolo
         * @param registration
         */
        $scope.registration=function(registration){
            registration.password_confirmation=registration.password;
            $http({
                method: 'POST',
                url: serverConfig.address+'api/signup',
                data:registration
            })//on success
                .success(function(data){
                  $scope.showToast("top",data.message);
                    $scope.navigateTo("app.packages",true);
                })
              //  on some error
                .error(function(data){
                    if(data.status_code===422)
                    $scope.showToast("top",data.message[0]);
                })
        };
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
    })//end Registration Controller
    //packageDisplayController
    .controller('packageDisplayController',function($scope,$stateParams,$ionicViewSwitcher,$ionicHistory,$http,serverConfig,$mdToast,$state){
        $scope.navigateTo = function (stateName,objectData,category_id) {
            if ($ionicHistory.currentStateName() != stateName) {
                $ionicHistory.nextViewOptions({
                    disableAnimate: false,
                    disableBack: true
                });

                //Next view animate will display in back direction
                $ionicViewSwitcher.nextDirection('back');

                $state.go(stateName, {
                    isAnimated: objectData,
                    id:category_id
                });
            }
        }; // End of navigateTo.
        id=$stateParams.id
        $http({
            method: 'GET',
            url: serverConfig.address+'api/package/'+id
        })//on success
            .success(function(zolo_package){
            $scope.package=zolo_package.data;
            })
            //  on some error
            .error(function(data){
                $scope.showToast("top","Some error occurred, try Again");
                $scope.package=undefined;
                console.log(data);
            });
        delete id;
        $scope.from=$stateParams.from;
        $scope.category_id=$stateParams.category_id;
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
    })//end PackageDisplayController
    ; // Use for all controller of application.
var appServices = angular.module('starter.services', []);// Use for all service of application.
