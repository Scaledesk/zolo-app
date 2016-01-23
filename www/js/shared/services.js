angular.module('starter').factory('CategoryService', function($http,serverConfig){
    return {
        getAll : function() {
            return $http({
                method: 'GET',
                url: serverConfig.address+'api/category'
            });
        }
    }
});


angular.module('starter').factory('AssignmentService', function($http,serverConfig){
    return {
        getCategoryPackages:function(id){
            return $http({
                method:"get",
                url:serverConfig.address+"api/category/"+id+"?include=Packages"
            });
        }
    }
});