angular.module("aprobarorden", ["crud"])
.controller("AprobarOrdenController", ["$scope", "$http", "service", function($scope, $http, service) {

}])
.directive("aprobarorden", function() {
	return {
		templateUrl: "aprobarorden/aprobarorden.html"
	};
});