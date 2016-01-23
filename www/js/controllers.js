var appControllers = angular.module('starter.controllers', []).controller('packageController',function($scope,$http,serverConfig,$state) {
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
}); // Use for all controller of application.
var appServices = angular.module('starter.services', []);// Use for all service of application.
