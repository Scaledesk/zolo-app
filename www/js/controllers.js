var appControllers = angular.module('starter.controllers', [])
    //Start Package Controller
    .controller('packageController',function($scope,$http,serverConfig,$state,$ionicViewSwitcher,$ionicHistory,$mdBottomSheet,$mdToast,$auth) {
        var _this=this;
        if($auth.isAuthenticated()){
        user_id=window.localStorage['user_id'];
        }
        _this.getPackages=function(user_id){
            console.log('user_id: '+user_id);
            url={};
            if(user_id===undefined){
                url=serverConfig.address + 'api/packages';
            }else{
                url=serverConfig.address + 'api/packages'+'?user_id='+user_id;
            }
            $http.get(url).success(function (response) {
                $scope.packages={}
                $scope.packages.data = response.data;
                packages_length=$scope.packages.data.length;
                break_length=packages_length/2;
                delete packages_length;
                $scope.first_packages_row={};
                $scope.second_packages_row={};
                $scope.first_packages_row.data = $scope.packages.data.slice(0, break_length);
                $scope.second_packages_row.data = $scope.packages.data.slice(break_length + 1);
                console.log($scope.second_packages_row.data[0]);
                delete $scope.packages;
                delete break_length;
            }).error(function (data) {
                console.log("Some error occurred");
                console.log(data);
            });
            delete url;
        };
        if($auth.isAuthenticated()){
            _this.getPackages(user_id);
            delete user_id;
        }else{
            _this.getPackages();
        }
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
        $scope.sharedProduct1 = function ($event) {
            console.log("inside share product");
            $mdBottomSheet.show({
                templateUrl: 'bottom-sheet-shared.html',
                controller: 'sharedSocialBottomSheetCtrl',
                targetEvent: $event,
            });
        };// End sharedProduct.
        $scope.addToWishlist=function(package_id){
             user_id1=window.localStorage['user_id'];
            data={'user_id' : user_id1,'package_id' : package_id};
            console.log(data);
            $http.post(serverConfig.address+'api/wishPackage',data).then(function successCallback(response) {
                // this callback will be called asynchronously
                _this.showToast("top","package add to wishlist successfully");
                if($auth.isAuthenticated()){
                    _this.getPackages(window.localStorage['user_id']);
                }else{
                    _this.getPackages();
                }
                console.log(response);
                delete user_id;
                delete data;
                // when the response is available
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                _this.showToast("top","Some error occurred try again");
                console.log(response);
                delete user_id;
                delete data;
            });
        };
        $scope.removefromWishlist=function(package_id){
            $http.put(serverConfig.address+'api/removeWishPackage',{'user_id' : window.localStorage['user_id'],'package_id' : package_id}).then(function successCallback(response) {
                // this callback will be called asynchronously
                _this.showToast("top","package removed from wishlist successfully");
                if($auth.isAuthenticated()){
                    _this.getPackages(window.localStorage['user_id']);
                }else{
                    _this.getPackages();
                }
                // when the response is available
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                _this.showToast("top","Some error occurred try again");
            });
        };
        _this.showToast = function (toastPosition,action) {
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
        //open dialog box from below
        $scope.showListBottomSheet = function ($event) {
            $mdBottomSheet.show({
                templateUrl: 'ui-list-bottom-sheet-template',
                targetEvent: $event,
                scope: $scope.$new(false),
            });
        };
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
    .controller('mainWalkthrough',function($scope,$location,$ionicViewSwitcher,$ionicHistory,$state){
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
        $scope.getStarted=function(){
            $scope.navigateTo('app.packages',true);
        };
    })
    ; // Use for all controller of application.
var appServices = angular.module('starter.services', []);// Use for all service of application.
