angular.module("solicitudescompra", ["crud","ngCookies"])
.controller("SolicitudesCompraController", ["$scope", "$http", "service", "$cookies", function($scope, $http, service, $cookies) {
	$scope.solicitudes =[];
	$scope.usuario = $cookies.usuario;
	$scope.tipo = $cookies.tipo;
	$scope.ans = {};

	$scope.getSolicitudes = function(){
		if ($scope.tipo == "3")
			service.readParam("/api/v1/solicitud/","solicitante",get_id($scope.usuario),function(status,data){
				if (status){
					$scope.solicitudes = data;
				} else {
					$scope.ans.errorsolicitudes = true;
				}
			});
		else if ($scope.tipo == "4")
			service.readParam("/api/v1/solicitud/","consolidador",get_id($scope.usuario),function(status,data){
				if (status){
					$scope.solcitudes = data;
				} else {
					$scope.ans.errorsolicitudes = true;
				}
			});
	};

	$scope.init = function(){
		$scope.getSolicitudes();
	};
	$scope.init();
}])
.directive("solicitudescompra", function() {
	return {
		templateUrl: "solicitudescompra/solicitudescompra.html"
	};
});

function get_id(uri) {
	if (!uri) return ""
	var i = uri.length-2;
	var c = uri[i];
	var id = "";
	while(c!="/"){
		id = c + id;
		c = uri[--i];
	}
	return id;
};
