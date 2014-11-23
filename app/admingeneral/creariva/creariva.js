angular.module("creariva", ["crud"])
.controller("CrearIVAController", ["$scope", "$http", "service", function($scope, $http, service) {

}])
.directive("creariva", function() {
	return {
		templateUrl: "creariva/creariva.html"
	};
});