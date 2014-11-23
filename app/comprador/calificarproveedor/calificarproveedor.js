angular.module("calificarproveedor", ["crud"])
.controller("CalificarProveedorController", ["$scope", "$http", "service", function($scope, $http, service) {

}])
.directive("calificarproveedor", function() {
	return {
		templateUrl: "calificarproveedor/calificarproveedor.html"
	};
});