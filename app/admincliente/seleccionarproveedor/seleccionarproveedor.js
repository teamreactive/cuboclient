angular.module("seleccionarproveedor", ["crud"])
.controller("SeleccionarProveedorController", ["$scope", "$http", "service", function($scope, $http, service) {

}])
.directive("seleccionarproveedor", function() {
	return {
		templateUrl: "seleccionarproveedor/seleccionarproveedor.html"
	};
});