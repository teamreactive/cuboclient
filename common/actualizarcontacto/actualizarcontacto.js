angular.module("actualizarcontacto", ["crud", "ngCookies"])
.controller("ActualizarContactoController", ["$scope", "$cookies", "$http", "service", function($scope, $cookies, $http, service) {
	$scope.contanto = {};

	$scope.ans = {};

	var clientecookie = $cookies.cliente.substring(0, $cookies.cliente.length-1);
	var cliente = clientecookie.substring(clientecookie.lastIndexOf("/")+1, clientecookie.length);

	$scope.contactos = {};
	var urlcontacto = "/api/v1/contacto/";
	service.readParam(urlcontacto, "cliente", cliente, function(status, data) {
		if (status || data.length == 0) {
			$scope.contactos = addShow(data);
			console.log(urlcontacto + " " + data.length);
		} else {
			console.log("Error cargando " + urlcontacto);
		}
	});

	function addShow(data) {
		var ans = [];
		for (var i = 0; i < data.length; i++) {
			var actual = data[i];
			actual.show = actual.nombre + " " + actual.apellido + " - " + actual.email;
			ans.push(actual);
		}
		return ans;
	}

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

	$scope.copy = {};
	$scope.setCopy = function() {
		$scope.copy = jQuery.extend(true, {}, $scope.contacto);
		return true;
	}

	$scope.descartar = function() {
		var index = $scope.contactos.indexOf($scope.contacto);
		if (index != -1) {
			$scope.contactos.splice(index, 1);
		}
		$scope.contacto = $scope.copy;
		$scope.contactos.push($scope.contacto);
		return true;
	}

	$scope.actualizarcontacto = function() {
		console.log($scope.contacto);

		$scope.ans.css = "alert alert-info";
		$scope.ans.msg = "Espere un momento...";

		var url = "/api/v1/contacto/";
		service.update(url, $scope.contacto.id, $scope.contacto, function(status, data) {
			if (status) {
				$scope.ans.css = "alert alert-success";
				$scope.ans.msg = "Contacto actualizado con exito";
				return true;
			} else {
				$scope.ans.css = "alert alert-danger";
				$scope.ans.msg = "Error al actualizar contacto";
				return true;
			} 
		});
	}

}])
.directive("actualizarcontacto", function() {
	return {
		templateUrl: "../common/actualizarcontacto/actualizarcontacto.html"
	};
});