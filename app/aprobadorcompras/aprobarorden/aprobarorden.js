angular.module("aprobarorden", ["crud"])
.controller("AprobarOrdenController", ["$scope", "$http", "service", function($scope, $http, service) {
	$scope.solicitudes = {};
	$scope.ans = {};
	var url = "api/v1/solicitud/";
	//!!FIX THIS
	this.getsolicitudes = function(){service.readParam(url,"aprobador","",function( status, data){
			if (status){
				$scope.solicitudes = data.objects;
			} else {
				$scope.ans.msg = "Hubo un error obteniendo los datos";
			}
		});
	};

}])
.directive("aprobarorden", function() {
	return {
		templateUrl: "aprobarorden/aprobarorden.html"
	};
});