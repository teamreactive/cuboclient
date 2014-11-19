angular.module("solicitudesentrega", ["crud"])
.controller("SolicitudesEntregaController", ["$scope", "$http", "service", function($scope, $http, service) {

}])
.directive("solicitudesentrega", function() {
	return {
		templateUrl: "solicitudesentrega/solicitudesentrega.html"
	};
});