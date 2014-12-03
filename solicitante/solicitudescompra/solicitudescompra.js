angular.module("solicitudescompra", ["crud"])
.controller("SolicitudesCompraController", ["$scope", "$http", "service", function($scope, $http, service) {

}])
.directive("solicitudescompra", function() {
	return {
		templateUrl: "solicitudescompra/solicitudescompra.html"
	};
});