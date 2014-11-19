angular.module("aprobarsolicitud", ["crud"])
.controller("AprobarSolicitudController", ["$scope", "$http", "service", function($scope, $http, service) {

}])
.directive("aprobarsolicitud", function() {
	return {
		templateUrl: "aprobarsolicitud/aprobarsolicitud.html"
	};
});