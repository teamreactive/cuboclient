angular.module("ordenescompra", ["crud"])
.controller("OrdenesCompraController", ["$scope", "$http", "service", function($scope, $http, service) {

}])
.directive("ordenescompra", function() {
	return {
		templateUrl: "ordenescompra/ordenescompra.html"
	};
});