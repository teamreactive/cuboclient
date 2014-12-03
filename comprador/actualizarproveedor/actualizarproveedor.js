angular.module("actualizarproveedor", ["crud"])
.controller("ActualizarProveedorController", ["$scope", "$http", "service", function($scope, $http, service) {

}])
.directive("actualizarproveedor", function() {
	return {
		templateUrl: "actualizarproveedor/actualizarproveedor.html"
	};
});