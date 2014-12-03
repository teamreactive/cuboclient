angular.module("crearsolicitud", ["crud"])
.controller("CrearSolicitudController", ["$scope", "$http", "service", function($scope, $http, service) {

}])
.directive("crearsolicitud", function() {
	return {
		templateUrl: "crearsolicitud/crearsolicitud.html"
	};
});