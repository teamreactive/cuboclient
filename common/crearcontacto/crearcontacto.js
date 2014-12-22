angular.module("crearcontacto", ["crud", "ngCookies"])
.controller("CrearContactoController", ["$scope", "$cookies", "$http", "service", function($scope, $cookies, $http, service) {
	$scope.contanto = {};

	$scope.ans = {};

	var clientecookie = $cookies.cliente.substring(0, $cookies.cliente.length-1);
	var cliente = clientecookie.substring(clientecookie.lastIndexOf("/")+1, clientecookie.length);

	$scope.proveedores = {};
	var urlproveedor = "/api/v1/proveedor/";
	service.readParam(urlproveedor, "cliente", cliente, function(status, data) {
		if (status || data.length == 0) {
			$scope.proveedores = data;
			console.log(urlproveedor + " " + data.length);
		} else {
			console.log("Error cargando " + urlproveedor);
		} 
	});

	$scope.familias = {};
	var urlfamilia = "/api/v1/familia/";
	service.readParam(urlfamilia, "cliente", cliente, function(status, data) {
		if (status || data.length == 0) {
			$scope.familias = data;
			console.log(urlfamilia + " " + data.length);
		} else {
			console.log("Error cargando " + urlfamilia);
		}
	});

	$scope.crearcontacto = function() {
		console.log($scope.contacto);

		$scope.ans.css = "alert alert-info";
		$scope.ans.msg = "Espere un momento...";

		$scope.contacto.cliente = $cookies.cliente;
		var url = "/api/v1/contacto/";
		service.create(url, $scope.contacto, function(status, data) {
			if (status) {
				$scope.ans.css = "alert alert-success";
				$scope.ans.msg = "Contacto creado con exito";
				return true;
			} else {
				$scope.ans.css = "alert alert-danger";
				$scope.ans.msg = "Error al crear contacto";
				return true;
			} 
		});
	}

}])
.directive("crearcontacto", function() {
	return {
		templateUrl: "../common/crearcontacto/crearcontacto.html"
	};
});