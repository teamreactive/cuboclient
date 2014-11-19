angular.module("aprobarproducto", ["crud"])
.controller("AprobarProductoController", ["$scope", "$http", "service", function($scope, $http, service) {

}])
.directive("aprobarproducto", function() {
	return {
		templateUrl: "aprobarproducto/aprobarproducto.html"
	};
});