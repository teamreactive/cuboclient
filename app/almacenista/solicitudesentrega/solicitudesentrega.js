angular.module("solicitudesentrega", ["crud"])
.controller("SolicitudesEntregaController", ["$scope", "$http", "service", function($scope, $http, service) {
	var urlcompra = "/api/v1/compra";
	$scope.getcompras = function(){
		service.getParam(urlcompra,["cliente"])
	};
}])
.directive("solicitudesentrega", function() {
	return {
		templateUrl: "solicitudesentrega/solicitudesentrega.html"
	};
});