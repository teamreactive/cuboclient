angular.module("crearproveedor", ["crud"])
.controller("CrearProveedorController", ["$scope", "$http", "service", function($scope, $http, service) {

}])
.directive("crearproveedor", function() {
	return {
		templateUrl: "crearproveedor/crearproveedor.html"
	};
});