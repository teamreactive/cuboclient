angular.module("solicitudescotizacion", ["crud"])
.controller("SolicitudesCotizacionController", ["$scope", "$http", "service", function($scope, $http, service) {

}])
.directive("solicitudescotizacion", function() {
	return {
		templateUrl: "solicitudescotizacion/solicitudescotizacion.html"
	};
});