angular.module("crearfamilia", ["crud"])
.controller("CrearFamiliaController", ["$scope", "$http", "service", function($scope, $http, service) {

}])
.directive("crearfamilia", function() {
	return {
		templateUrl: "crearfamilia/crearfamilia.html"
	};
});