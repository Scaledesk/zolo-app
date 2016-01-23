var appControllers = angular.module('starter.controllers', []).controller('packageController',function($scope,$http,serverConfig,$state) {
    $http.get(serverConfig.address + 'api/packages').success(function (response) {
        $scope.packages = response.data;
        console.log(response.data);
    }).error(function (data) {
        console.log("Some error occurred");
        console.log(data);
    });
    $scope.goToSetting = function () {
        $state.go("app.dashboardSetting");
    };// End goToSetting.
}); // Use for all controller of application.
var appServices = angular.module('starter.services', []);// Use for all service of application.
