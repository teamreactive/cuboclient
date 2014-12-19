angular.module("crearsolicitud", ["crud", "ngCookies"])
.controller("CrearSolicitudController", ["$scope", "$http", "service", "$cookies", function($scope, $http, service,$cookies) {

	$scope.solicitud = {};

	$scope.ans = {};

	$scope.pedidos = [];

	$scope.ec = 1;
	$scope.equipocentro = [
		{
			"k": 1,
			"v": "Centro de costo"
		},
		{
			"k": 2,
			"v": "Equipo"
		}
	];

	var clientecookie = $cookies.cliente.substring(0, $cookies.cliente.length-1);
	var cliente = clientecookie.substring(clientecookie.lastIndexOf("/")+1, clientecookie.length);

	$scope.lugares = [];
	var urllugares = "/api/v1/lugar/";
	service.readParam(urllugares, "cliente", cliente, function(status, data) {
		if(status || data.length == 0) {
			$scope.lugares = data;
			console.log(urllugares + " " + data.length);
		} else {
			console.log("Error cargando " + urllugares);
		}
	});

	$scope.solicitantes = [];
	var urlsolicitantes = "/api/v1/consolidadorsolicitante/";
	var user = $cookies.usuario.substring(0, $cookies.usuario.length - 1);
	var init = user.lastIndexOf("/") + 1;
	var end = user.length;
	var consolidador = user.substring(init, end);
	service.readParam(urlsolicitantes, "consolidador", consolidador, function(status, data) {
		if (status || data.length == 0){
			$scope.solicitantes = data;
			console.log(urlsolicitantes + " " + data.length);
		} else {
			console.log("Error cargando " + urlsolicitantes);
		}
	});

	$scope.centros = [];
	var urlcentros = "/api/v1/centro/";
	service.readParam(urlcentros, "cliente", cliente, function(status, data) {
		if (status || data.length == 0){
			$scope.centros = data;
			console.log(urlcentros + " " + data.length);
		} else {
			console.log("Error cargando " + urlcentros);
		}
	});

	$scope.equipos = [];
	var urlequipos = "/api/v1/equipo/";
	service.readParam(urlequipos, "cliente", cliente, function(status, data) {
		if (status || data.length == 0) {
			$scope.equipos = data;
			console.log(urlequipos + " " + data.length);
		} else {
			console.log("Error cargando " + urlequipos);
		}
	});

	$scope.productos = [];
	var urlproductos = "/api/v1/producto/";
	service.readParam(urlproductos, "cliente", cliente, function(status, data) {
		if (status || data.length == 0){
			$scope.productos = data;
			console.log(urlproductos + " " + data.length);
		} else {
			console.log("Error cargando " + urlproductos);
		}
	});

	$scope.crearsolicitud = function() {
		$scope.ans.css = "alert alert-info";
		$scope.ans.msg = "Espere un momento...";
		if ($scope.solicitante) {
			$scope.solicitud.consolidador = $cookies.usuario;
		} else {
			$scope.solicitud.solicitante = $cookies.usuario;
		}
		obtenerpedido();
		$scope.solicitud.estado = "0010";
		console.log($scope.solicitud);
		var url = "/api/v1/solicitud/"
		service.create(url, $scope.solicitud, function(status, data) {
			if(status){
				$scope.ans.css = "alert alert-success";
				$scope.ans.msg = "Solicitud creada con exito";
				location.reload();
				return true;
			} else {
				$scope.ans.css = "alert alert-danger";
				$scope.ans.msg = "Ocurrio un error";
				return false;
			}
		});
	};

	function obtenerpedido() {
		$scope.solicitud.productos = [];
		for (var i = 0; i < $scope.pedidos.length; i++) {
			var actual = $scope.pedidos[i];
			var nuevo = {
				"linea": i + 1,
				"producto": actual.resource_uri,
				"unidad": actual.unidad.unidad,
				"cantidad": actual.cantidad
			};
			$scope.solicitud.productos.push(nuevo);
		}
		return true;
	}
}])
.directive("crearsolicitud", function() {
	return {
		templateUrl: "../common/crearsolicitud/crearsolicitud.html"
	};
});